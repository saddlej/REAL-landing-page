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

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const userId = session.client_reference_id;

    if (!userId) {
      console.error('checkout.session.completed: no client_reference_id — cannot create member');
      return res.status(200).json({ received: true });
    }

    try {
      let tier = 'founding';
      try {
        const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
          expand: ['line_items.data.price'],
        });
        const lineItem = fullSession.line_items?.data?.[0];
        if (!lineItem) {
          console.warn(`checkout.session.completed ${session.id}: no line_items returned (amount_total=${session.amount_total}), defaulting tier to founding`);
        } else {
          const nickname = lineItem.price?.nickname ?? '';
          tier = nickname.toLowerCase().includes('founding') ? 'founding' : 'standard';
          console.log(`checkout.session.completed ${session.id}: price nickname="${nickname}", tier=${tier}`);
        }
      } catch (retrieveErr) {
        console.error(`checkout.session.completed ${session.id}: session retrieve failed (amount_total=${session.amount_total}), defaulting tier to founding:`, retrieveErr.message);
      }

      const supabaseHeaders = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
        'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
      };

      // Insert the new member row — real_id and verified_since are set later, after gov ID verification
      const insertRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/members`,
        {
          method: 'POST',
          headers: { ...supabaseHeaders, 'Prefer': 'return=minimal' },
          body: JSON.stringify({
            user_id: userId,
            membership_tier: tier,
            is_active: true,
          }),
        }
      );

      if (!insertRes.ok) {
        const err = await insertRes.json().catch(() => ({}));
        console.error('Failed to insert member row:', err);
      } else {
        console.log(`Member row created (${tier}) for user ${userId} — awaiting gov ID verification`);
      }
    } catch (e) {
      console.error('checkout.session.completed handler error:', e.message);
    }
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

    // Generate and assign REAL ID now that gov ID is confirmed
    const idHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    try {
      const lastRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/members?select=real_id&real_id=not.is.null&order=real_id.desc&limit=1`,
        { headers: idHeaders }
      );
      const lastRows = await lastRes.json();
      const lastNum = lastRows.length > 0
        ? parseInt(lastRows[0].real_id.replace('RL-', ''), 10)
        : 0;
      const realId = 'RL-' + String(lastNum + 1).padStart(6, '0');

      // Save real_id, verified_since, and full_name in one PATCH
      const firstName = session.verified_outputs?.first_name || '';
      const lastName  = session.verified_outputs?.last_name  || '';
      const fullName  = [firstName, lastName].filter(Boolean).join(' ');

      const patch = {
        real_id: realId,
        verified_since: new Date().toISOString(),
        ...(fullName ? { full_name: fullName } : {}),
      };

      const patchRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${userId}`,
        {
          method: 'PATCH',
          headers: { ...idHeaders, 'Prefer': 'return=minimal' },
          body: JSON.stringify(patch),
        }
      );
      if (!patchRes.ok) {
        const err = await patchRes.json().catch(() => ({}));
        console.error('Failed to assign real_id / verified_since / full_name:', err);
      } else {
        console.log(`REAL ID ${realId} assigned and verified_since set for user ${userId}${fullName ? ` (${fullName})` : ''}`);
      }
    } catch (e) {
      console.error('Failed to assign REAL ID after gov ID verification:', e.message);
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
