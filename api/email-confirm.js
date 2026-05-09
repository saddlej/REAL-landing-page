import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const { token, id } = req.query;

  if (!token || !id) {
    return res.redirect('/email-confirmed.html?status=invalid');
  }

  const { data: verification, error: fetchError } = await supabase
    .from('platform_verifications')
    .select('*')
    .eq('id', id)
    .single();

  if (fetchError || !verification) {
    return res.redirect('/email-confirmed.html?status=invalid');
  }

  if (verification.verification_code !== token) {
    return res.redirect('/email-confirmed.html?status=invalid');
  }

  if (verification.status === 'verified') {
    return res.redirect('/email-confirmed.html?status=already');
  }

  if (verification.notes && verification.notes.startsWith('expires:')) {
    const expiresAt = new Date(verification.notes.replace('expires:', ''));
    if (new Date() > expiresAt) {
      return res.redirect('/email-confirmed.html?status=expired');
    }
  }

  const { error: updateError } = await supabase
    .from('platform_verifications')
    .update({
      status: 'verified',
      verified_at: new Date().toISOString(),
      member_confirmed: true
    })
    .eq('id', id);

  if (updateError) {
    console.error('Update error:', updateError);
    return res.redirect('/email-confirmed.html?status=error');
  }

  return res.redirect('/email-confirmed.html?status=success');
}
