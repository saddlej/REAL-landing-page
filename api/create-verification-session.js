const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  // Status-check branch: dashboard calls this (GET) to find out what actually happened with the last verification attempt
  if (req.method === 'GET' && req.query.action === 'status') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) return res.status(401).json({ error: 'Missing token' });

    try {
      const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
        headers: { 'Authorization': `Bearer ${token}`, 'apikey': process.env.SUPABASE_ANON_KEY }
      });
      const user = await userRes.json();
      if (!userRes.ok || !user.id) return res.status(401).json({ error: 'Invalid or expired session' });

      const memberRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${user.id}&select=verification_session_id&limit=1`,
        { headers: { 'apikey': process.env.SUPABASE_ANON_KEY, 'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
      );
      const members = await memberRes.json();
      const sessionId = members?.[0]?.verification_session_id;
      if (!sessionId) return res.status(200).json({ status: 'none' });

      const session = await stripe.identity.verificationSessions.retrieve(sessionId);
      return res.status(200).json({ status: session.status });
    } catch (e) {
      console.error('Verification status check failed:', e.message);
      return res.status(500).json({ error: e.message });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Pull the user's JWT out of the Authorization header
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  // Verify the token with Supabase and get the user's ID
  let userId;
  try {
    const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': process.env.SUPABASE_ANON_KEY
      }
    });
    const user = await userRes.json();
    if (!userRes.ok || !user.id) {
      return res.status(401).json({ error: 'Invalid or expired session' });
    }
    userId = user.id;
  } catch (e) {
    console.error('Supabase user check failed:', e.message);
    return res.status(500).json({ error: 'Could not verify user' });
  }

  // Check that the user has a paid membership row before allowing verification
  try {
    const memberRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${userId}&select=id&limit=1`,
      {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    );
    const members = await memberRes.json();
    if (!Array.isArray(members) || members.length === 0) {
      return res.status(403).json({ error: 'Payment required before identity verification' });
    }
  } catch (e) {
    console.error('Member check failed:', e.message);
    return res.status(500).json({ error: 'Could not verify membership' });
  }

  // Build the return URL — where Stripe sends the user after verification
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];
  const returnUrl = `${proto}://${host}/dashboard.html?verification=returned`;

  // Create the Stripe Identity hosted verification session
  try {
    const session = await stripe.identity.verificationSessions.create({
      type: 'document',
      metadata: { supabase_user_id: userId },
      options: {
        document: { require_matching_selfie: true }
      },
      return_url: returnUrl
    });

    // Save this session's ID so we can check its real status later, when the member returns from Stripe
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'apikey': process.env.SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ verification_session_id: session.id })
    });

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error('Stripe session creation failed:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
