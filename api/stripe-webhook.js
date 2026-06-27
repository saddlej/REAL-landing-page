const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

function buildWelcomeEmailHtml(firstName, realId) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#0F2044; font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0F2044; padding:48px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px; width:100%;">
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="https://realverified.co.uk/shield-email-white.png" width="60" height="60" alt="REAL" style="display:block; margin:0 auto;">
              <p style="margin:6px 0 0; font-size:10px; color:rgba(255,255,255,0.35); letter-spacing:0.2em; text-transform:uppercase;">Identity Infrastructure for the Internet</p>
            </td>
          </tr>
          <tr>
            <td style="padding-bottom:32px; font-size:0; line-height:0; text-align:center;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:1px; background-color:#FFD007;">&nbsp;</td></tr></table>
            </td>
          </tr>
          <tr>
            <td style="background-color:#ffffff; padding:48px 48px 40px;">
              <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#FFD007; font-weight:700;">Identity Confirmed</p>
              <p style="margin:0 0 20px; font-size:28px; font-weight:700; color:#0F2044; font-family:Georgia,serif; line-height:1.2;">Your REAL ID is live.</p>
              <div style="width:48px; height:3px; background:#FFD007; margin-bottom:28px; font-size:0; line-height:0;">&nbsp;</div>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${firstName},</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">It's official. You're verified.</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Your REAL ID number is <strong>${realId}</strong> — permanent, yours, never reassigned. From this moment, you have one verified record that travels with you across every platform you operate.</p>
              <p style="margin:0 0 8px; font-size:15px; color:#333; line-height:1.8;">Your public profile is live now:</p>
              <p style="margin:0 0 28px;"><a href="https://realverified.co.uk/${realId}" style="font-size:15px; color:#0F2044; font-weight:700;">realverified.co.uk/${realId}</a></p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">This is the moment fake accounts stop being able to touch you. Every platform you link from here on becomes part of one verified, timestamped record — proof anyone can check in five seconds.</p>
              <p style="margin:0 0 32px; font-size:15px; color:#333; line-height:1.8;">Next step: head to your dashboard and link the platforms you operate from. One verified platform or ten — they're all backed by the same permanent REAL ID.</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:32px;">
                    <a href="https://realverified.co.uk/dashboard" style="display:inline-block; background-color:#0F2044; color:#FFD007; font-size:14px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; padding:14px 32px; border-radius:4px;">Go to my dashboard</a>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 24px; font-size:15px; color:#333; line-height:1.8;">Welcome to REAL.</p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #E8EDF7; padding-top:24px;">
                <p style="margin:0; font-size:14px; color:#555; line-height:1.8;">— Sadi, Founder of REAL</p>
              </td></tr></table>
            </td>
          </tr>
          <tr>
            <td style="padding:28px 48px; text-align:center;">
              <p style="margin:0 0 6px; font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:0.1em;">REAL &trade; &mdash; realverified.co.uk</p>
              <p style="margin:0; font-size:11px; color:rgba(255,255,255,0.2);">info@realverified.co.uk &nbsp;&middot;&nbsp; London, UK</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

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
  // GET-only test path: send a preview welcome email without triggering Stripe logic
  if (req.method === 'GET') {
    const { key, name, realid, email } = req.query || {};
    if (!key || key !== process.env.TEST_EMAIL_KEY) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!name || !realid || !email) {
      return res.status(400).json({ error: 'name, realid, and email query params are required' });
    }
    const firstName = name;
    const realId = realid.toUpperCase();
    const testRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'REAL <info@realverified.co.uk>',
        to: email,
        subject: `Your REAL ID — ${realId} — is live.`,
        html: buildWelcomeEmailHtml(firstName, realId),
      }),
    });
    if (!testRes.ok) {
      const err = await testRes.text();
      return res.status(500).json({ error: 'Resend send failed', detail: err });
    }
    return res.status(200).json({ ok: true, sent_to: email, realid: realId });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // ── Billing portal session ──────────────────────────────────────────────────
  if (req.url && req.url.includes('create-billing-session')) {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (!token) return res.status(401).json({ error: 'Missing token' });

    let userId;
    try {
      const userRes = await fetch(`${process.env.SUPABASE_URL}/auth/v1/user`, {
        headers: { 'Authorization': `Bearer ${token}`, 'apikey': process.env.SUPABASE_ANON_KEY }
      });
      const user = await userRes.json();
      if (!userRes.ok || !user.id) return res.status(401).json({ error: 'Invalid or expired session' });
      userId = user.id;
    } catch (e) {
      console.error('Supabase user check failed:', e.message);
      return res.status(500).json({ error: 'Could not verify user' });
    }

    let stripeCustomerId;
    try {
      const memberRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${userId}&select=stripe_customer_id&limit=1`,
        { headers: { 'apikey': process.env.SUPABASE_ANON_KEY, 'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}` } }
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
  }
  // ───────────────────────────────────────────────────────────────────────────

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

      // Send welcome email now that REAL ID is assigned
      // Email address is fetched from Supabase auth using the userId already in scope
      try {
        const userRes = await fetch(
          `${process.env.SUPABASE_URL}/auth/v1/admin/users/${userId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
              'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
            },
          }
        );
        const userData = await userRes.json();
        const memberEmail = userData?.email;

        if (memberEmail) {
          const welcomeRes = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'REAL <info@realverified.co.uk>',
              to: memberEmail,
              subject: `Your REAL ID — ${realId} — is live.`,
              html: buildWelcomeEmailHtml(firstName, realId),
            }),
          });

          if (!welcomeRes.ok) {
            const emailErr = await welcomeRes.text();
            console.error(`Failed to send welcome email to ${memberEmail}:`, welcomeRes.status, emailErr);
          } else {
            console.log(`Welcome email sent to ${memberEmail} for ${realId}`);
          }
        } else {
          console.error(`Could not retrieve email for user ${userId} — welcome email not sent`);
        }
      } catch (e) {
        console.error('Welcome email send error:', e.message);
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
