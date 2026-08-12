const { createClient } = require('@supabase/supabase-js')
const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)
async function run() {
  const { data, error } = await admin
    .from('content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5)
  console.log('Error:', error)
  console.log('Latest content:', JSON.stringify(data, null, 2))
}
run()
