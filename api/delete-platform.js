module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { user_id, platform, token } = req.body || {};

  if (!token) return res.status(401).json({ error: 'Missing token' });
  if (!user_id || !platform) return res.status(400).json({ error: 'user_id and platform are required' });

  // Verify the JWT and confirm the user_id matches
  let verifiedUserId;
  try {
    const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.SUPABASE_ANON_KEY
      }
    });
    const user = await userRes.json();
    if (!userRes.ok || !user.id) return res.status(401).json({ error: 'Invalid token' });
    verifiedUserId = user.id;
  } catch (e) {
    return res.status(500).json({ error: 'Could not verify user' });
  }

  if (verifiedUserId !== user_id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Delete all rows for this user + platform using the service role key
  try {
    const r = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/platform_verifications?user_id=eq.${verifiedUserId}&platform=eq.${encodeURIComponent(platform)}`,
      {
        method: 'DELETE',
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'Prefer': 'return=minimal'
        }
      }
    );
    if (!r.ok) {
      const err = await r.text();
      console.error('Supabase DELETE failed:', err);
      return res.status(500).json({ error: 'Failed to delete rows' });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('delete-platform error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
