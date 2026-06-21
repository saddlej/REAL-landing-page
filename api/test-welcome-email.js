// TEMPORARY TEST SCAFFOLDING — delete this file before going to production.
// Usage: /api/test-welcome-email?key=SECRET&name=Sadi&realid=RL-000042&email=test@example.com
// Requires environment variable: TEST_EMAIL_KEY

module.exports = async function handler(req, res) {
  const { key, name, realid, email } = req.query || {};

  if (!key || key !== process.env.TEST_EMAIL_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (!name || !realid || !email) {
    return res.status(400).json({ error: 'name, realid, and email query params are required' });
  }

  const firstName = name;
  const realId = realid.toUpperCase();

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'REAL <info@realverified.co.uk>',
      to: email,
      subject: `Your REAL ID — ${realId} — is live.`,
      html: `<!DOCTYPE html>
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
</html>`,
    }),
  });

  if (!emailRes.ok) {
    const err = await emailRes.text();
    console.error('[test-welcome-email] Resend error:', emailRes.status, err);
    return res.status(500).json({ error: 'Resend send failed', detail: err });
  }

  return res.status(200).json({ ok: true, sent_to: email, realid: realId });
};
