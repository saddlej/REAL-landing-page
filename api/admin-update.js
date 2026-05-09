module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { password, rowId, status, rejection_reason } = req.body || {};

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!rowId || !['verified', 'failed'].includes(status)) {
    return res.status(400).json({ error: 'rowId and a valid status (verified or failed) are required' });
  }

  const patch = { status };
  if (status === 'verified') patch.verified_at = new Date().toISOString();
  if (status === 'failed' && rejection_reason) patch.rejection_reason = rejection_reason;

  try {
    const r = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/platform_verifications?id=eq.${rowId}`,
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

    if (!r.ok) {
      const err = await r.text();
      console.error('Supabase PATCH failed:', err);
      return res.status(500).json({ error: 'Failed to update row' });
    }

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error('admin-update error:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
