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

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'REAL <info@realverified.co.uk>',
      to: email,
      subject: 'Confirm your email address — REAL',
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#0F2044;font-family:Arial,sans-serif;"><table width="100%" cellpadding="0" cellspacing="0" style="background:#0F2044;padding:40px 20px;"><tr><td align="center"><table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;"><tr><td style="padding:0 0 32px 0;text-align:center;"><span style="font-size:28px;font-weight:700;color:#ffffff;letter-spacing:0.15em;">REAL</span><span style="color:#FFD007;font-size:14px;margin-left:4px;">™</span></td></tr><tr><td style="background:#122459;border-radius:12px;padding:40px;border:1px solid rgba(255,208,7,0.15);"><p style="margin:0 0 8px 0;color:#FFD007;font-size:12px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;">Email Verification</p><h1 style="margin:0 0 24px 0;color:#ffffff;font-size:24px;font-weight:700;">Confirm your email address</h1><p style="margin:0 0 24px 0;color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;">You asked REAL to verify <strong style="color:#ffffff;">${email}</strong> as one of your confirmed contact addresses. Click the button below to confirm it's yours.</p><p style="margin:0 0 32px 0;color:rgba(255,255,255,0.5);font-size:14px;line-height:1.6;">This link expires in 24 hours. If you didn't request this, you can safely ignore this email.</p><table cellpadding="0" cellspacing="0" width="100%"><tr><td align="center"><a href="${confirmUrl}" style="display:inline-block;background:#FFD007;color:#0F2044;font-size:16px;font-weight:700;text-decoration:none;padding:16px 40px;border-radius:8px;">Confirm email address →</a></td></tr></table></td></tr><tr><td style="padding:24px 0 0 0;text-align:center;"><p style="margin:0;color:rgba(255,255,255,0.3);font-size:12px;">REAL — Identity Infrastructure for the Internet<br><a href="https://www.realverified.co.uk" style="color:rgba(255,208,7,0.5);text-decoration:none;">realverified.co.uk</a></p></td></tr></table></td></tr></table></body></html>`
    })
  });

  if (!resendResponse.ok) {
    const resendError = await resendResponse.text();
    console.error('Resend error:', resendError);
    return res.status(500).json({ error: 'Failed to send confirmation email' });
  }

  return res.status(200).json({ success: true });
}
