module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password } = req.body || {};
  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const r = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/platform_verifications` +
      `?status=eq.pending&member_confirmed=eq.true&order=submitted_at.asc` +
      `&select=id,user_id,platform,handle,profile_url,verification_code,submitted_at,notes`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    );

    if (!r.ok) {
      const err = await r.text();
      console.error('Supabase fetch failed:', err);
      return res.status(500).json({ error: 'Failed to fetch verifications' });
    }

    const rows = await r.json();
    return res.status(200).json({ rows });
  } catch (e) {
    console.error('admin-verifications error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
