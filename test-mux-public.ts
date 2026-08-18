const Mux = require('@mux/mux-node').default || require('@mux/mux-node')
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})
async function run() {
  try {
    const assetId = 'RwUuUx1uV14JnFqsli8voRthyzduhOabG29Jom02jqj8'
    const playbackId = await mux.video.assets.createPlaybackId(assetId, { policy: 'public' })
    console.log('New Public Playback ID:', playbackId)
  } catch (e) {
    console.error('Error:', e.message)
  }
}
run()
