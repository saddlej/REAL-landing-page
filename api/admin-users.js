export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Verify admin password before returning any user data
  const { password, userIds } = req.body;

  if (!password || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: 'No user IDs provided' });
  }

  try {
    // Use service role key to access auth.users
    const response = await fetch(
      `${process.env.SUPABASE_URL}/auth/v1/admin/users`,
      {
        headers: {
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch users from Supabase');
    }

    const data = await response.json();
    const users = data.users || [];

    // Build a map of id -> email, filtered to only the IDs we need
    const emailMap = {};
    for (const user of users) {
      if (userIds.includes(user.id)) {
        emailMap[user.id] = user.email;
      }
    }

    return res.status(200).json({ emailMap });

  } catch (err) {
    console.error('admin-users error:', err);
    return res.status(500).json({ error: err.message });
  }
}
