import { NextRequest, NextResponse } from 'next/server'
import Mux from '@mux/mux-node'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const playbackId = searchParams.get('playbackId')
  const width = searchParams.get('width') || '400'

  if (!playbackId) {
    return new NextResponse('Missing playbackId', { status: 400 })
  }

  try {
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    })

    const token = await mux.jwt.signPlaybackId(playbackId, {
      type: 'thumbnail',
      expiration: '1h',
      params: { width },
    })

    const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?token=${token}`

    return NextResponse.redirect(thumbnailUrl, 302)
  } catch (error) {
    console.error('Error generating Mux thumbnail token:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
