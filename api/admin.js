// Consolidated admin endpoint — merges the former admin-check, admin-update, admin-users,
// and admin-verifications functions into one, routed by ?action=, to stay under Vercel's
// Hobby-plan serverless function limit. Each branch below is a verbatim copy of that file's
// original logic — same auth checks, same Supabase calls, same status codes and response shapes.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const action = req.query?.action;
  const body = req.body || {};
  const { password } = body;

  // ── action=check (formerly admin-check.js) ─────────────────────────────────
  if (action === 'check') {
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ ok: false });
    }
    return res.status(200).json({ ok: true });
  }

  // ── action=update (formerly admin-update.js) ───────────────────────────────
  if (action === 'update') {
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { rowId, status, rejection_reason } = body;

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
  }

  // ── action=users (formerly admin-users.js) ─────────────────────────────────
  if (action === 'users') {
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    const { userIds } = body;

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return res.status(400).json({ error: 'No user IDs provided' });
    }

    try {
      // Use service role key to access auth.users
      const response = await fetch(
        `${process.env.SUPABASE_URL}/auth/v1/admin/users`,
        {
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users from Supabase');
      }

      const data = await response.json();
      const users = data.users || [];

      // Build a map of id -> email, filtered to only the IDs we need
      const emailMap = {};
      for (const user of users) {
        if (userIds.includes(user.id)) {
          emailMap[user.id] = user.email;
        }
      }

      return res.status(200).json({ emailMap });

    } catch (err) {
      console.error('admin-users error:', err);
      return res.status(500).json({ error: err.message });
    }
  }

  // ── action=verifications (formerly admin-verifications.js) ─────────────────
  if (action === 'verifications') {
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
  }

  return res.status(400).json({ error: 'Unknown or missing action' });
};
