const { createClient } = require('@supabase/supabase-js')
const Mux = require('@mux/mux-node').default || require('@mux/mux-node')

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

async function run() {
  const { data: signIdData } = await admin.rpc('vault_get_secret', {
    secret_name: 'MUX_SIGNING_KEY',
  })
  const { data: signPkData } = await admin.rpc('vault_get_secret', {
    secret_name: 'MUX_PRIVATE_KEY',
  })

  if (signIdData && signPkData) {
    console.log('Got keys from vault!')
    const mux = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
      jwtSigningKey: signIdData,
      jwtPrivateKey: signPkData,
    })

    try {
      const token = await mux.jwt.signPlaybackId('PqidO6PrQW8f3pOr00TfaprwbPH9ql5k5BEkgA1GEWAk', {
        type: 'video',
        expiration: '6h',
      })
      console.log('Signed token:', token)
      console.log(
        'HLS URL: https://stream.mux.com/PqidO6PrQW8f3pOr00TfaprwbPH9ql5k5BEkgA1GEWAk.m3u8?token=' +
          token,
      )
    } catch (e) {
      console.error('JWT Error:', e.message)
    }
  } else {
    console.log('Keys not found in vault.')
  }
}
run()
