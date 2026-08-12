const { createClient } = require('@supabase/supabase-js')
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
)
async function run() {
  const { data } = await supabase
    .from('content')
    .select('id, mux_playback_id, status')
    .order('created_at', { ascending: false })
    .limit(5)
  console.log(JSON.stringify(data, null, 2))
}
run()
