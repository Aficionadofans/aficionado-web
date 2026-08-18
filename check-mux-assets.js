const Mux = require('@mux/mux-node').default || require('@mux/mux-node')
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})

async function run() {
  try {
    const assets = await mux.video.assets.list({ limit: 5 })
    ;(assets.data || assets).forEach((a) => {
      console.log(`Asset ID: ${a.id}`)
      console.log(`Status: ${a.status}`)
      console.log(`Created: ${a.created_at}`)
      console.log(
        `Playback IDs:`,
        a.playback_ids?.map((p) => p.id),
      )
      console.log(`Passthrough: ${a.passthrough}`)
      console.log('---')
    })
  } catch (e) {
    console.error(e.message)
  }
}
run()
