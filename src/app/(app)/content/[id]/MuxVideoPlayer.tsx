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
      accentColor="#E8501A"
      primaryColor="#FFFFFF"
      secondaryColor="#0A0A0C"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
