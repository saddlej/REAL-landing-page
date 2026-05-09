const YT_API = 'https://www.googleapis.com/youtube/v3';

// Parse a YouTube handle, URL, or channel ID into an API lookup type + value
function parseHandle(input) {
  const s = input.trim();

  if (/youtube\.com/i.test(s)) {
    const atMatch    = s.match(/youtube\.com\/@([^/?&#\s]+)/i);
    if (atMatch)    return { type: 'forHandle',   value: '@' + atMatch[1] };

    const channelMatch = s.match(/youtube\.com\/channel\/(UC[^/?&#\s]+)/i);
    if (channelMatch) return { type: 'id',         value: channelMatch[1] };

    const cMatch     = s.match(/youtube\.com\/c\/([^/?&#\s]+)/i);
    if (cMatch)     return { type: 'forUsername',  value: cMatch[1] };

    const userMatch  = s.match(/youtube\.com\/user\/([^/?&#\s]+)/i);
    if (userMatch)  return { type: 'forUsername',  value: userMatch[1] };

    const bareMatch  = s.match(/youtube\.com\/([^/?&#\s@]+)/i);
    if (bareMatch && bareMatch[1] !== 'watch') return { type: 'forHandle', value: '@' + bareMatch[1] };
  }

  if (s.startsWith('@')) return { type: 'forHandle',  value: s };
  if (/^UC[a-zA-Z0-9_-]{20,}$/.test(s)) return { type: 'id', value: s };

  return { type: 'forHandle', value: '@' + s };
}

async function fetchDescription(identifier, apiKey) {
  const params = new URLSearchParams({ part: 'snippet', key: apiKey });
  if (identifier.type === 'forHandle')   params.set('forHandle',   identifier.value);
  else if (identifier.type === 'id')     params.set('id',           identifier.value);
  else                                   params.set('forUsername',  identifier.value);

  const r = await fetch(`${YT_API}/channels?${params}`);
  if (!r.ok) throw new Error(`YouTube API error: ${r.status}`);
  const data = await r.json();
  if (!data.items || data.items.length === 0) return null;
  return data.items[0].snippet.description || '';
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Verify caller is a logged-in member
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return res.status(401).json({ error: 'Missing token' });

  let userId;
  try {
    const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.SUPABASE_ANON_KEY
      }
    });
    const user = await userRes.json();
    if (!userRes.ok || !user.id) return res.status(401).json({ error: 'Invalid token' });
    userId = user.id;
  } catch (e) {
    return res.status(500).json({ error: 'Could not verify user' });
  }

  const { handle, verification_code, row_id } = req.body || {};
  if (!handle || !verification_code) {
    return res.status(400).json({ error: 'handle and verification_code are required' });
  }

  // Check YouTube channel description for the verification code
  let description;
  try {
    description = await fetchDescription(parseHandle(handle), process.env.YOUTUBE_API_KEY);
  } catch (e) {
    console.error('YouTube API error:', e.message);
    return res.status(500).json({ error: 'Could not reach YouTube API. Try again shortly.' });
  }

  if (description === null) {
    return res.status(200).json({
      success: false,
      message: 'Channel not found. Double-check the handle or URL and try again.'
    });
  }

  const found = description.includes(verification_code);
  const now   = new Date().toISOString();

  try {
    if (row_id) {
      // Update existing pending row
      const patch = { status: found ? 'verified' : 'pending' };
      if (found) patch.verified_at = now;

      const r = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/platform_verifications?id=eq.${row_id}`,
        {
          method: 'PATCH',
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify(patch)
        }
      );
      if (!r.ok) throw new Error(await r.text());
      return res.status(200).json({ success: found, row_id });
    } else {
      // Insert new row
      const insert = {
        user_id: userId,
        platform: 'YouTube',
        handle,
        verification_code,
        member_confirmed: false,
        status: found ? 'verified' : 'pending',
        ...(found ? { verified_at: now } : {})
      };
      const r = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/platform_verifications`,
        {
          method: 'POST',
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(insert)
        }
      );
      if (!r.ok) throw new Error(await r.text());
      const rows = await r.json();
      return res.status(200).json({ success: found, row_id: rows[0]?.id });
    }
  } catch (e) {
    console.error('Supabase error:', e.message);
    return res.status(500).json({ error: 'Database error' });
  }
};
