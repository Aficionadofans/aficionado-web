import { createClient } from '@supabase/supabase-js'

const supabase = createClient('https://nkxztsfuhgjvcdseuree.supabase.co', 'dummy_key')

const q = supabase
  .from('content')
  .select('*')
  .or('moderation_status.eq.approved,author_id.eq.123')
  .in('author_id', ['123', '456'])
  .or('mux_playback_id.not.is.null,author_id.eq.123')

console.log((q as any).url.toString())
