import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const playbackId = searchParams.get('playbackId')
  const width = searchParams.get('width') || '400'

  if (!playbackId) {
    return new NextResponse('Missing playbackId', { status: 400 })
  }

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase credentials')
    }

    const res = await fetch(`${supabaseUrl}/functions/v1/api/mux/sign-thumbnail`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${supabaseAnonKey}`,
      },
      body: JSON.stringify({ playbackId, width }),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(`Edge function returned ${res.status}: ${text}`)
    }

    const { token, error } = await res.json()
    if (error || !token) {
      throw new Error(error || 'No token returned')
    }

    const thumbnailUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg?token=${token}`

    return NextResponse.redirect(thumbnailUrl, 302)
  } catch (error) {
    console.error('Error generating Mux thumbnail token:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
