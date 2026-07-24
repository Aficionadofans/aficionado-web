import { NextResponse } from 'next/server'

/**
 * Mux webhook handler.
 * Receives events for video asset lifecycle (ready, errored, etc.)
 * and updates the corresponding records in Supabase.
 *
 * TODO: Implement full webhook verification and asset status sync.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Log for debugging during development
    console.log('Mux webhook received:', body.type)

    // TODO: Verify Mux webhook signature
    // TODO: Handle asset.ready, asset.errored, etc.

    return NextResponse.json({ received: true })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('Mux webhook error:', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
