import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Shield artwork shared with the "REAL Verified" badge-demo markup in index.html.
function shieldPaths(outlineFill, checkFill, letterFill) {
  return `<path fill="${outlineFill}" d="M 757 269 C 787 288 979 406 1148 406 L 1148 789 C 1148 789 1153 1132 755 1235 C 750 1237 745 1235 745 1235 C 347 1132 352 789 352 789 L 352 406 C 536 406 743 269 743 269 C 743 269 749 263 757 269 Z" fill-rule="evenodd"/><path fill="${checkFill}" d="M 693 1040 L 567 915 L 617 864 L 693 940 L 883 750 L 933 800 Z"/><g fill="${letterFill}"><path transform="translate(390,720)" d="M 15.5 -213 L 91.7 -213 C 112.2 -213 128.9 -207.6 141.8 -196.7 C 154.7 -185.7 161.1 -170.1 161.1 -149.8 C 161.1 -134.1 157.2 -121 149.4 -110.4 C 141.6 -99.8 130.9 -92.4 117.5 -88.1 L 190.8 0 L 129.1 0 L 64 -84.2 L 64 0 L 15.5 0 Z M 64 -118.5 L 69.7 -118.5 C 74.2 -118.5 78 -118.6 81.1 -118.8 C 84.2 -119 87.7 -119.6 91.7 -120.6 C 95.6 -121.6 98.8 -123.1 101.2 -125 C 103.6 -126.9 105.7 -129.6 107.4 -133.3 C 109.1 -136.9 110 -141.3 110 -146.4 C 110 -151.6 109.1 -156 107.4 -159.6 C 105.7 -163.2 103.6 -166 101.2 -167.9 C 98.8 -169.8 95.6 -171.2 91.7 -172.3 C 87.7 -173.3 84.2 -173.9 81.1 -174 C 78 -174.2 74.2 -174.3 69.7 -174.3 L 64 -174.3 Z"/><path transform="translate(587,720)" d="M 137.4 -213 L 137.4 -170.4 L 64 -170.4 L 64 -128.1 L 134.3 -128.1 L 134.3 -85.5 L 64 -85.5 L 64 -42.6 L 137.4 -42.6 L 137.4 0 L 15.5 0 L 15.5 -213 Z"/><path transform="translate(750,720)" d="M 123.7 -213 L 209.7 0 L 157.5 0 L 141.8 -42.6 L 60.7 -42.6 L 45 0 L -7.2 0 L 78.8 -213 Z M 125.3 -85.2 L 101.5 -147.2 L 101 -147.2 L 77.2 -85.2 Z"/><path transform="translate(963,720)" d="M 64 -213 L 64 -42.6 L 137.4 -42.6 L 137.4 0 L 15.5 0 L 15.5 -213 Z"/></g>`;
}

function escapeXml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;'
  }[c]));
}

function buildBadgeSvg(state, displayId) {
  const safeId = escapeXml(displayId || '—');
  let bg, outlineFill, checkFill, letterFill, label, subLabel, subFill, labelFill;

  if (state === 'verified') {
    bg = '#0F2044';
    outlineFill = '#ffffff';
    checkFill = '#FFD007';
    letterFill = '#0F2044';
    label = 'REAL Verified';
    labelFill = '#ffffff';
    subLabel = safeId;
    subFill = '#FFD007';
  } else if (state === 'lapsed') {
    bg = '#6b7280';
    outlineFill = '#e5e7eb';
    checkFill = '#9ca3af';
    letterFill = '#4b5563';
    label = 'Verification Lapsed';
    labelFill = '#e5e7eb';
    subLabel = safeId;
    subFill = '#d1d5db';
  } else {
    bg = '#7a1f1f';
    outlineFill = '#9b3a3a';
    checkFill = '#d97706';
    letterFill = '#2d0a0a';
    label = 'REAL ID Not Found';
    labelFill = '#ffffff';
    subLabel = safeId;
    subFill = '#fca5a5';
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="260" height="64" viewBox="0 0 260 64">` +
    `<rect width="260" height="64" fill="${bg}"/>` +
    `<svg x="12" y="12" width="40" height="40" viewBox="200 200 1100 1100">${shieldPaths(outlineFill, checkFill, letterFill)}</svg>` +
    `<text x="64" y="27" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="600" letter-spacing="0.4" fill="${labelFill}">${escapeXml(label)}</text>` +
    `<text x="64" y="44" font-family="'DM Mono', monospace" font-size="11" letter-spacing="0.8" fill="${subFill}">${subLabel}</text>` +
    `</svg>`;
}

async function handleBadge(req, res) {
  const rawId = (req.query.id || '').toString();
  const realId = rawId.toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 20);

  let state = 'not_found';

  if (realId) {
    const { data, error } = await supabase
      .from('members')
      .select('real_id, is_active')
      .ilike('real_id', realId)
      .maybeSingle();

    if (!error && data) {
      state = data.is_active ? 'verified' : 'lapsed';
    }
  }

  const svg = buildBadgeSvg(state, realId || rawId.slice(0, 20));

  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=300');
  return res.status(200).send(svg);
}

export default async function handler(req, res) {
  if (req.query.action === 'badge') {
    return handleBadge(req, res);
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { id, domain, verification_code } = req.body;

  if (!id || !domain || !verification_code) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Clean the domain — strip http/https and trailing slashes
  const cleanDomain = domain
    .replace(/^@+/, '')
    .replace(/^https?:\/\//, '')
    .replace(/\/.*$/, '')
    .trim();

  try {
    const dohUrl = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=TXT`;

    // Look up TXT records via Google DNS-over-HTTPS (works in Vercel serverless)
    let dohRes;
    try {
      dohRes = await fetch(dohUrl);
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
