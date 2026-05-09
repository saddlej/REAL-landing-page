const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
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

  // Build the return URL — where Stripe sends the user after verification
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers['host'];
  const returnUrl = `${proto}://${host}/dashboard.html?verification=complete`;

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

    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error('Stripe session creation failed:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
