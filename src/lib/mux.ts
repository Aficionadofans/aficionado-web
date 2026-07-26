import Mux from '@mux/mux-node'

let _mux: Mux | null = null

/**
 * Lazily initialised Mux client singleton.
 * Deferred to avoid throwing during Next.js static page collection
 * when MUX_TOKEN_ID / MUX_TOKEN_SECRET are not yet configured.
 */
export function getMux(): Mux {
  if (!_mux) {
    const tokenId = process.env.MUX_TOKEN_ID
    const tokenSecret = process.env.MUX_TOKEN_SECRET

    if (!tokenId || !tokenSecret) {
      throw new Error(
        'MUX_TOKEN_ID and MUX_TOKEN_SECRET are missing. Please set the environment variables.'
      )
    }

    _mux = new Mux({ tokenId, tokenSecret })
  }

  return _mux
}
