const Mux = require('@mux/mux-node').default || require('@mux/mux-node')
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})
async function run() {
  try {
    const assets = await mux.video.assets.list({ limit: 5 })
    console.log('Assets:', JSON.stringify(assets.data, null, 2))
  } catch (e) {
    console.error('Error:', e.message)
  }
}
run()
