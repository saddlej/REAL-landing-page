const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.replace('Bearer ', '');

  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return res.status(401).json({ error: 'Invalid session' });
  }

  const { email, row_id: verificationId } = req.body;

  if (!email || !verificationId) {
    return res.status(400).json({ error: 'Missing email or verificationId' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  const confirmToken = crypto.randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const { error: updateError } = await supabase
    .from('platform_verifications')
    .update({
      verification_code: confirmToken,
      notes: `expires:${expiresAt}`
    })
    .eq('id', verificationId)
    .eq('user_id', user.id);

  if (updateError) {
    console.error('Supabase update error:', updateError);
    return res.status(500).json({ error: 'Failed to store confirmation token' });
  }

  const confirmUrl = `https://www.realverified.co.uk/api/email-confirm?token=${confirmToken}&id=${verificationId}`;

  const resendKey = process.env.RESEND_API_KEY || '';
  console.log('[email-verify] RESEND_API_KEY prefix:', resendKey ? resendKey.slice(0, 10) + '…' : '(not set)');

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'REAL <info@realverified.co.uk>',
      to: email,
      subject: 'Confirm your email address — REAL',
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
              <p style="margin:0; font-size:22px; font-weight:700; color:#ffffff; letter-spacing:0.15em; font-family:Georgia,serif;">REAL</p>
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
              <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#FFD007; font-weight:700;">Email Verification</p>
              <p style="margin:0 0 20px; font-size:28px; font-weight:700; color:#0F2044; font-family:Georgia,serif; line-height:1.2;">Confirm your email address</p>
              <table width="48" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:24px;"><tr><td style="height:3px; background:#FFD007;">&nbsp;</td></tr></table>
              <p style="margin:0 0 8px; font-size:14px; color:#4a4a4a; line-height:1.8;">You asked REAL to verify</p>
              <p style="margin:0 0 24px; font-size:16px; font-weight:700; color:#0F2044;">${email}</p>
              <p style="margin:0 0 32px; font-size:14px; color:#4a4a4a; line-height:1.8;">as one of your confirmed contact addresses. Click the button below to confirm it's yours and add it to your REAL profile.</p>
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:36px;">
                <tr>
                  <td style="background-color:#FFD007;">
                    <a href="${confirmUrl}" style="display:inline-block; padding:16px 40px; font-size:14px; font-weight:700; color:#0F2044; text-decoration:none; letter-spacing:0.05em;">Confirm email address &rarr;</a>
                  </td>
                </tr>
              </table>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="border-top:1px solid #E8EDF7; padding-top:24px;">
                <p style="margin:0 0 8px; font-size:12px; color:#9B9B9B; line-height:1.7;">This link expires in <strong style="color:#0F2044;">24 hours</strong>. If you didn't request this, you can safely ignore this email.</p>
                <p style="margin:0; font-size:11px; color:#bbb; line-height:1.6; word-break:break-all;">Or paste into your browser: <span style="color:#0F2044;">${confirmUrl}</span></p>
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
</html>`
    })
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error('[email-verify] Resend HTTP status:', resendResponse.status);
    console.error('[email-verify] Resend error body:', resendError);
    return res.status(500).json({ error: 'Failed to send confirmation email' });
  }

  return res.status(200).json({ success: true });
}
