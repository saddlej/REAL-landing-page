module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, handle, platform_request } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Check for duplicate email in Supabase Waitlist table
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const checkRes = await fetch(`${supabaseUrl}/rest/v1/Waitlist?email=eq.${encodeURIComponent(email)}&select=email&limit=1`, {
    headers: {
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    }
  });

  if (checkRes.ok) {
    const existing = await checkRes.json().catch(() => []);
    if (existing.length > 0) {
      return res.status(200).json({ success: true });
    }
  }

  // Insert into Supabase Waitlist table
  const insertRes = await fetch(`${supabaseUrl}/rest/v1/Waitlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`,
      'Prefer': 'return=minimal'
    },
    body: JSON.stringify({ name, email, handle, platform_request })
  });

  if (!insertRes.ok) {
    const err = await insertRes.json().catch(() => ({}));
    console.error('[waitlist] Supabase insert error:', err);
    return res.status(500).json({ error: 'Failed to save to waitlist' });
  }

  // Send confirmation email via Resend
  const resendKey = process.env.RESEND_API_KEY || '';

  const emailRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: 'REAL <info@realverified.co.uk>',
      to: email,
      subject: "You're on the REAL waitlist.",
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
              <p style="margin:0 0 12px; font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:#FFD007; font-weight:700;">Waitlist Confirmed</p>
              <p style="margin:0 0 20px; font-size:28px; font-weight:700; color:#0F2044; font-family:Georgia,serif; line-height:1.2;">You're on the list.</p>
              <div style="width:48px; height:3px; background:#FFD007; margin-bottom:28px; font-size:0; line-height:0;">&nbsp;</div>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Hi ${name},</p>
              <p style="margin:0 0 20px; font-size:15px; color:#333; line-height:1.8;">Thanks for joining the waitlist. When REAL opens its doors, you'll be among the first to know.</p>
              <p style="margin:0 0 32px; font-size:15px; color:#333; line-height:1.8;">We're limiting founding membership to 100 people — low numbers, locked rates, and a verified identity that starts building from day one.</p>
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
</html>`
    })
  });

  if (!emailRes.ok) {
    const emailErr = await emailRes.text();
    console.error('[waitlist] Resend error:', emailRes.status, emailErr);
    // Don't fail the whole request — insert succeeded, email is best-effort
  }

  return res.status(200).json({ success: true });
};
