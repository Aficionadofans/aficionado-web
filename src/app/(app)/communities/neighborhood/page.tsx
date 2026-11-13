import { redirect } from 'next/navigation'
import { NeighborhoodFeed } from '@/features/communities/ui/NeighborhoodFeed'
import { createClient } from '@/shared/lib/supabase/server'

export default async function NeighborhoodPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?next=/communities/neighborhood')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('zip_code')
    .eq('id', user.id)
    .single()

  const userZipCode = profile?.zip_code?.trim() ?? ''

  return <NeighborhoodFeed userZipCode={userZipCode} />
}
