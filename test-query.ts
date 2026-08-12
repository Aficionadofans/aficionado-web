import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const dbClient = createClient(supabaseUrl, anonKey)

async function testQuery() {
  const userId = '125cc3e3-1c84-47d6-98d7-31f6689a9e26'
  const feedUserIds = [userId, '30eb8ce3-19f6-4041-8296-64fc85e11d5c']

  const { data: contentData, error } = await dbClient
    .from('content')
    .select('id, author_id, mux_playback_id, moderation_status, status')
    .or(
      `author_id.eq.${userId},and(author_id.in.(${feedUserIds.join(',')}),moderation_status.eq.approved,mux_playback_id.not.is.null)`,
    )
    .order('created_at', { ascending: false })
    .limit(5)

  console.log('Error:', error)
  console.log('Found items:', contentData?.length)
}

testQuery()
