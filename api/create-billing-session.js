const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

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

  let stripeCustomerId;
  try {
    const memberRes = await fetch(
      `${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${userId}&select=stripe_customer_id&limit=1`,
      {
        headers: {
          'apikey': process.env.SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    );
    const members = await memberRes.json();
    if (!Array.isArray(members) || members.length === 0 || !members[0].stripe_customer_id) {
      return res.status(400).json({ error: 'No billing account found' });
    }
    stripeCustomerId = members[0].stripe_customer_id;
  } catch (e) {
    console.error('Member lookup failed:', e.message);
    return res.status(500).json({ error: 'Could not retrieve billing account' });
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: 'https://www.realverified.co.uk/dashboard'
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    console.error('Stripe billing portal session failed:', e.message);
    return res.status(500).json({ error: e.message });
  }
};
