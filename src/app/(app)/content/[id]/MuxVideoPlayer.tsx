'use client'

import MuxPlayer from '@mux/mux-player-react'

interface MuxVideoPlayerProps {
  playbackId: string
  envKey?: string
  token?: string
  title?: string
}

export function MuxVideoPlayer({ playbackId, envKey, token, title }: MuxVideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      envKey={envKey}
      tokens={token ? { playback: token } : undefined}
      metadata={{
        video_title: title ?? '',
      }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
