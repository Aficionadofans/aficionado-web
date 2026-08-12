import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const dbClient = createClient(supabaseUrl, anonKey)

async function testJoin() {
  const { data: _data, error } = await dbClient
    .from('content')
    .select('id, profiles!inner(username)')
    .limit(1)

  console.log('Join error:', error)
}

testJoin()
