// Daily scheduled check for time-delayed member/waitlist emails.
// Triggered by .github/workflows/daily-email-scheduler.yml via a cron job (see also manual workflow_dispatch).
// Must never be publicly triggerable — gated on CRON_SECRET below.

const SUPABASE_HEADERS = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
  'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
};

async function sendEmail(to, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: 'REAL <info@realverified.co.uk>', to, subject, html }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend send failed (${res.status}): ${err}`);
  }
}

async function getUserEmailAndFirstName(userId) {
  const res = await fetch(
    `${process.env.SUPABASE_URL}/auth/v1/admin/users/${userId}`,
    { headers: SUPABASE_HEADERS }
  );
  const data = await res.json();
  return {
    email: data?.email || '',
    firstName: data?.user_metadata?.first_name || 'there',
  };
}

// ── Email templates ───────────────────────────────────────────────────────────
// Same visual shell as buildPaymentConfirmedEmailHtml in stripe-webhook.js
// (navy background, centered logo, gold rule, white card body, founder sign-off).

function buildEmailWrapper({ eyebrow, headline, bodyHtml, ctaHtml }) {
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
              <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#FFD007; font-weight:700;">${eyebrow}</p>
              <p style="margin:0 0 20px; font-size:28px; font-weight:700; color:#0F2044; font-family:Georgia,serif; line-height:1.2;">${headline}</p>
              <div style="width:48px; height:3px; background:#FFD007; margin-bottom:28px; font-size:0; line-height:0;">&nbsp;</div>
              ${bodyHtml}
              ${ctaHtml || ''}
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

function buildCtaButton(label, href) {
  return `<table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:32px;">
                    <a href="${href}" style="display:inline-block; background-color:#0F2044; color:#FFD007; font-size:14px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; text-decoration:none; padding:14px 32px; border-radius:4px;">${label}</a>
                  </td>
                </tr>
              </table>`;
}

function buildWaitlistNurture2EmailHtml(firstName) {
  const bodyHtml = `
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${firstName},</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">You're on the waitlist — here's exactly what you'll get.</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">REAL gives you one permanent, verified identity that travels across every platform you use. A single REAL ID, backed by real government ID verification, that anyone can check in five seconds. Not a platform badge that can be removed. Not something you rent. Something you own.</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">If someone copies your name, your photos, your content — a REAL profile is the one thing they can't fake.</p>
              <p style="margin:0 0 24px; font-size:15px; color:#333; line-height:1.8;">We'll let you know the moment spots open.</p>`;
  return buildEmailWrapper({
    eyebrow: 'While You Wait',
    headline: "Here's what<br>you'll get.",
    bodyHtml,
  });
}

function buildWaitlistNurture3EmailHtml(firstName) {
  const bodyHtml = `
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${firstName},</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">The first 100 members get REAL at founding member pricing — locked in for life, even as the price rises for everyone after.</p>
              <p style="margin:0 0 24px; font-size:15px; color:#333; line-height:1.8;">You joined the waitlist early, which puts you in a good position. Spots are limited, and once they're gone, that price is gone with them.</p>`;
  return buildEmailWrapper({
    eyebrow: 'Founding Member Pricing',
    headline: 'Limited spots<br>remain.',
    bodyHtml,
  });
}

function buildWaitlistNurture4EmailHtml(firstName) {
  const bodyHtml = `
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${firstName},</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">We're getting close to opening REAL up. If you've been on the fence, this is a good moment to make sure your spot's secured.</p>
              <p style="margin:0 0 24px; font-size:15px; color:#333; line-height:1.8;">You'll be first to know the second it's live.</p>`;
  return buildEmailWrapper({
    eyebrow: 'Almost Time',
    headline: "We're getting<br>close.",
    bodyHtml,
  });
}

function buildVerificationNudgeEmailHtml(firstName) {
  const bodyHtml = `
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${firstName},</p>
              <p style="margin:0 0 32px; font-size:15px; color:#333; line-height:1.8;">You're all set up, but your verification's still open. Takes about 2 minutes, and it's the only thing standing between you and your REAL ID.</p>`;
  return buildEmailWrapper({
    eyebrow: 'Action Needed',
    headline: 'Your REAL ID<br>is waiting.',
    bodyHtml,
    ctaHtml: buildCtaButton('Verify my identity &rarr;', 'https://realverified.co.uk/dashboard'),
  });
}

function buildPostVerificationGuidanceEmailHtml(firstName) {
  const bodyHtml = `
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${firstName},</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">A few days in — here's how to actually put your REAL ID to work.</p>
              <p style="margin:0 0 32px; font-size:15px; color:#333; line-height:1.8;">Your permanent profile is only as strong as what's linked to it. Every platform, handle, or domain you add makes it harder for anyone to convincingly copy you. If you've only linked one so far, now's the time to add the rest.</p>`;
  const cta = buildCtaButton('Add more platforms &rarr;', 'https://realverified.co.uk/dashboard');
  const afterCta = `
              <p style="margin:32px 0 24px; font-size:15px; color:#333; line-height:1.8;">Your badge is ready to use too — the embed code turns into a live, clickable badge anywhere that supports HTML: your website, Linktree, or email signature. For places like your social bio, use your plain profile link instead — same destination, just as a normal clickable link.</p>`;
  return buildEmailWrapper({
    eyebrow: 'Getting Started',
    headline: 'Make your REAL ID<br>work for you.',
    bodyHtml,
    ctaHtml: cta + afterCta,
  });
}

// ── Scheduler checks ──────────────────────────────────────────────────────────

async function checkWaitlistNurture({ delayDays, sentColumn, subject, buildHtml }) {
  const cutoff = encodeURIComponent(new Date(Date.now() - delayDays * 24 * 60 * 60 * 1000).toISOString());
  const url = `${process.env.SUPABASE_URL}/rest/v1/Waitlist?created_at=lte.${cutoff}&${sentColumn}=is.null&select=id,name,email`;
  const res = await fetch(url, { headers: SUPABASE_HEADERS });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Waitlist query failed (${res.status}): ${err}`);
  }
  const rows = await res.json();

  let sent = 0;
  for (const row of rows) {
    try {
      const firstName = (row.name || 'there').split(' ')[0];
      await sendEmail(row.email, subject, buildHtml(firstName));
      const patchRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/Waitlist?id=eq.${row.id}`,
        {
          method: 'PATCH',
          headers: { ...SUPABASE_HEADERS, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ [sentColumn]: new Date().toISOString() }),
        }
      );
      if (!patchRes.ok) {
        const err = await patchRes.json().catch(() => ({}));
        console.error(`[scheduled-emails] Failed to set ${sentColumn} for Waitlist row ${row.id}:`, err);
      } else {
        sent++;
      }
    } catch (e) {
      console.error(`[scheduled-emails] ${sentColumn} send failed for Waitlist row ${row.id}:`, e.message);
    }
  }
  return sent;
}

async function checkMemberEmail({ filterQuery, sentColumn, subject, buildHtml }) {
  const url = `${process.env.SUPABASE_URL}/rest/v1/members?${filterQuery}&${sentColumn}=is.null&select=user_id`;
  const res = await fetch(url, { headers: SUPABASE_HEADERS });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`members query failed (${res.status}): ${err}`);
  }
  const rows = await res.json();

  let sent = 0;
  for (const row of rows) {
    try {
      const { email, firstName } = await getUserEmailAndFirstName(row.user_id);
      if (!email) {
        console.error(`[scheduled-emails] No auth email found for member user_id ${row.user_id} — skipping ${sentColumn}`);
        continue;
      }
      await sendEmail(email, subject, buildHtml(firstName));
      const patchRes = await fetch(
        `${process.env.SUPABASE_URL}/rest/v1/members?user_id=eq.${row.user_id}`,
        {
          method: 'PATCH',
          headers: { ...SUPABASE_HEADERS, 'Prefer': 'return=minimal' },
          body: JSON.stringify({ [sentColumn]: new Date().toISOString() }),
        }
      );
      if (!patchRes.ok) {
        const err = await patchRes.json().catch(() => ({}));
        console.error(`[scheduled-emails] Failed to set ${sentColumn} for member ${row.user_id}:`, err);
      } else {
        sent++;
      }
    } catch (e) {
      console.error(`[scheduled-emails] ${sentColumn} send failed for member ${row.user_id}:`, e.message);
    }
  }
  return sent;
}

module.exports = async function handler(req, res) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!process.env.CRON_SECRET || token !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const summary = {
    nurture_email_2: 0,
    nurture_email_3: 0,
    nurture_email_4: 0,
    verification_nudge: 0,
    post_verification_guidance: 0,
  };
  const errors = [];

  try {
    summary.nurture_email_2 = await checkWaitlistNurture({
      delayDays: 7,
      sentColumn: 'nurture_email_2_sent_at',
      subject: 'Why REAL exists',
      buildHtml: buildWaitlistNurture2EmailHtml,
    });
  } catch (e) {
    console.error('[scheduled-emails] Check A (nurture_email_2) failed:', e.message);
    errors.push({ check: 'nurture_email_2', error: e.message });
  }

  try {
    summary.nurture_email_3 = await checkWaitlistNurture({
      delayDays: 14,
      sentColumn: 'nurture_email_3_sent_at',
      subject: 'Founding member pricing — limited spots',
      buildHtml: buildWaitlistNurture3EmailHtml,
    });
  } catch (e) {
    console.error('[scheduled-emails] Check B (nurture_email_3) failed:', e.message);
    errors.push({ check: 'nurture_email_3', error: e.message });
  }

  try {
    summary.nurture_email_4 = await checkWaitlistNurture({
      delayDays: 21,
      sentColumn: 'nurture_email_4_sent_at',
      subject: 'Almost time',
      buildHtml: buildWaitlistNurture4EmailHtml,
    });
  } catch (e) {
    console.error('[scheduled-emails] Check C (nurture_email_4) failed:', e.message);
    errors.push({ check: 'nurture_email_4', error: e.message });
  }

  try {
    const dayAgo = encodeURIComponent(new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());
    summary.verification_nudge = await checkMemberEmail({
      // Unverified means real_id is null OR still the 'RL-PENDING' placeholder — same check as
      // hasRealId in stripe-webhook.js and the dashboard's real_id gating.
      filterQuery: `created_at=lte.${dayAgo}&or=(real_id.is.null,real_id.eq.RL-PENDING)`,
      sentColumn: 'verification_nudge_sent_at',
      subject: 'Quick one — your REAL ID is waiting',
      buildHtml: buildVerificationNudgeEmailHtml,
    });
  } catch (e) {
    console.error('[scheduled-emails] Check D (verification_nudge) failed:', e.message);
    errors.push({ check: 'verification_nudge', error: e.message });
  }

  try {
    const threeDaysAgo = encodeURIComponent(new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString());
    summary.post_verification_guidance = await checkMemberEmail({
      // Verified means real_id is set and isn't the 'RL-PENDING' placeholder.
      filterQuery: `verified_since=lte.${threeDaysAgo}&real_id=not.is.null&real_id=neq.RL-PENDING`,
      sentColumn: 'post_verification_guidance_sent_at',
      subject: 'Getting the most from your REAL ID',
      buildHtml: buildPostVerificationGuidanceEmailHtml,
    });
  } catch (e) {
    console.error('[scheduled-emails] Check E (post_verification_guidance) failed:', e.message);
    errors.push({ check: 'post_verification_guidance', error: e.message });
  }

  console.log('[scheduled-emails] Run summary:', JSON.stringify(summary), errors.length ? `errors: ${JSON.stringify(errors)}` : '');

  return res.status(200).json({ ok: true, summary, errors });
};
