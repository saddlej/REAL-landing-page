import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, domain, verification_code } = req.body;

  if (!id || !domain || !verification_code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Clean the domain — strip http/https and trailing slashes
  const cleanDomain = domain
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .trim();

  try {
    // Look up TXT records via Google DNS-over-HTTPS (works in Vercel serverless)
    let dohRes;
    try {
      dohRes = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=TXT`);
    } catch (fetchError) {
      return res.status(200).json({
        verified: false,
        message: 'Could not reach DNS. Please try again in a moment.'
      });
    }

    if (!dohRes.ok) {
      return res.status(200).json({
        verified: false,
        message: 'Could not find DNS records for that domain. Make sure you entered the domain correctly and the TXT record has been saved.'
      });
    }

    const dohData = await dohRes.json();

    // Answer is an array of records; status 0 = NOERROR, 3 = NXDOMAIN
    if (dohData.Status !== 0 || !Array.isArray(dohData.Answer)) {
      return res.status(200).json({
        verified: false,
        message: 'Could not find DNS records for that domain. Make sure you entered the domain correctly and the TXT record has been saved.'
      });
    }

    // Each Answer entry has a `data` field with the TXT value (may be quoted)
    const found = dohData.Answer.some(record =>
      String(record.data).replace(/"/g, '').includes(verification_code)
    );

    if (found) {
      const { error } = await supabase
        .from('platform_verifications')
        .update({
          status: 'verified',
          verified_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Supabase update error:', error);
        return res.status(500).json({ error: 'Verification found but failed to save. Please try again.' });
      }

      return res.status(200).json({
        verified: true,
        message: 'Domain verified successfully.'
      });
    } else {
      return res.status(200).json({
        verified: false,
        message: 'TXT record not found yet. Make sure you added it exactly as shown and give DNS up to 30 minutes to update.'
      });
    }

  } catch (err) {
    console.error('Domain verify error:', err);
    return res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
}
