import { createClient } from '@supabase/supabase-js';
import dns from 'dns';

const resolver = new dns.promises.Resolver();
resolver.setServers(['8.8.8.8']);

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
    // Look up all TXT records on the domain
    let records;
    try {
      records = await resolver.resolveTxt(cleanDomain);
    } catch (dnsError) {
      // Domain doesn't exist or DNS lookup failed
      return res.status(200).json({
        verified: false,
        message: 'Could not find DNS records for that domain. Make sure you entered the domain correctly and the TXT record has been saved.'
      });
    }

    // records is an array of arrays — flatten to a simple list of strings
    const allRecords = records.flat();

    // Check if any TXT record matches the verification code
    const found = allRecords.some(record => record.includes(verification_code));

    if (found) {
      // Mark as verified in Supabase
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
