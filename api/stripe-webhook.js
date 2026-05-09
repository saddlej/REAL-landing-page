const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// Collect the raw request body — required for Stripe signature verification
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const sig = req.headers['stripe-signature'];
  if (!sig) {
    return res.status(400).json({ error: 'Missing Stripe-Signature header' });
  }

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    console.error('Webhook signature verification failed:', e.message);
    return res.status(400).json({ error: `Webhook error: ${e.message}` });
  }

  // Only act on successful verification
  if (event.type === 'identity.verification_session.verified') {
    const session = event.data.object;
    const userId = session.metadata?.supabase_user_id;

    if (!userId) {
      console.error('No supabase_user_id in session metadata — cannot update user');
      return res.status(200).json({ received: true });
    }

    try {
      const updateRes = await fetch(
        `${process.env.SUPABASE_URL}/auth/v1/admin/users/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY
          },
          body: JSON.stringify({ user_metadata: { id_verified: true } })
        }
      );

      if (!updateRes.ok) {
        const err = await updateRes.json().catch(() => ({}));
        console.error('Supabase user update failed:', err);
      } else {
        console.log(`id_verified set to true for user ${userId}`);
      }
    } catch (e) {
      console.error('Failed to update Supabase user:', e.message);
    }
  }

  // Always return 200 — Stripe retries on anything else
  return res.status(200).json({ received: true });
}

// Disable Vercel's body parser — Stripe needs the raw bytes to verify the signature
handler.config = {
  api: { bodyParser: false }
};

module.exports = handler;
