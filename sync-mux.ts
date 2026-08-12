import { createClient } from '@supabase/supabase-js'

const Mux = require('@mux/mux-node').default || require('@mux/mux-node')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

async function run() {
  try {
    let hasMore = true
    let page = 1
    while (hasMore) {
      const response = await mux.video.assets.list({ limit: 100, page })
      const assets = response.data || []
      if (assets.length === 0) break

      for (const asset of assets) {
        if (asset.passthrough && asset.status === 'ready') {
          const playbackId = asset.playback_ids?.find(
            (p) => p.policy === 'signed' || p.policy === 'public',
          )?.id
          if (playbackId) {
            console.log(`Updating ${asset.passthrough} with asset ${asset.id}`)
            await supabase
              .from('content')
              .update({
                mux_asset_id: asset.id,
                mux_playback_id: playbackId,
                status: 'ready',
              })
              .eq('id', asset.passthrough)
          }
        }
      }

      if (assets.length < 100) hasMore = false
      page++
    }
    console.log('Done syncing Mux assets.')
  } catch (e) {
    console.error(e.message)
  }
}
run()
