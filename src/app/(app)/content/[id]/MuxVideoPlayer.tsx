'use client'

import MuxPlayer from '@mux/mux-player-react'

interface MuxVideoPlayerProps {
  playbackId: string
  envKey?: string
  tokens?: {
    playback: string
    thumbnail: string
    storyboard: string
  }
  title?: string
}

export function MuxVideoPlayer({ playbackId, envKey, tokens, title }: MuxVideoPlayerProps) {
  return (
    <MuxPlayer
      playbackId={playbackId}
      envKey={envKey}
      tokens={tokens}
      metadata={{
        video_title: title ?? '',
      }}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
