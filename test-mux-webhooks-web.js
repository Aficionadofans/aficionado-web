const Mux = require('@mux/mux-node').default || require('@mux/mux-node')
const mux = new Mux({
  tokenId: process.env.MUX_TOKEN_ID,
  tokenSecret: process.env.MUX_TOKEN_SECRET,
})
async function run() {
  const hooks = await mux.webhooks.list()
  console.log('Webhooks:', JSON.stringify(hooks, null, 2))
}
run()
