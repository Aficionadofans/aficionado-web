'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/shared/lib/supabase/client'

export function ActiveUserTracker({ userId }: { userId: string }) {
  const _pathname = usePathname()
  const supabase = createClient()

  useEffect(() => {
    if (!userId) return

    const trackActivity = async () => {
      await supabase.from('active_users_tracking').upsert({
        user_id: userId,
        last_active_at: new Date().toISOString(),
      })
    }

    trackActivity()
  }, [userId, supabase])

  return null
}
