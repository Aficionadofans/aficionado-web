const Mux = require('@mux/mux-node').default || require('@mux/mux-node')
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})
async function run() {
  try {
    const keys = await mux.system.signingKeys.list()
    console.log('Signing Keys:', JSON.stringify(keys, null, 2))
  } catch (e) {
    console.error('Error:', e.message)
  }
}
run()
