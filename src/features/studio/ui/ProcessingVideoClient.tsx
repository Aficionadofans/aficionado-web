'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/shared/lib/supabase/client'

export function ProcessingVideoClient({ contentId }: { contentId: string }) {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const channel = supabase
      .channel(`content-${contentId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'content',
          filter: `id=eq.${contentId}`,
        },
        (payload) => {
          if (payload.new.status === 'ready' && payload.new.mux_playback_id) {
            router.refresh()
          }
        },
      )
      .subscribe()

    // Fallback polling just in case realtime isn't enabled on the table
    const interval = setInterval(async () => {
      const { data } = await supabase
        .from('content')
        .select('status, mux_playback_id')
        .eq('id', contentId)
        .single()

      if (data?.status === 'ready' && data?.mux_playback_id) {
        router.refresh()
      }
    }, 3000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(interval)
    }
  }, [contentId, router, supabase])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground bg-surface/30">
      <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mb-4" />
      <p className="font-medium tracking-wide animate-pulse">Processing media...</p>
      <p className="text-xs mt-2 opacity-70">This page will automatically refresh when ready.</p>
    </div>
  )
}
