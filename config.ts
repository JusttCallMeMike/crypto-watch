require('dotenv').config() // this loads the defined variables from .env

const config = {
  db: process.env.db ?? 'mongodb://root:root@localhost:27888/admin',
  backendPort: process.env.backendPort ?? 3111,
  collectorPort: process.env.collectorPort ?? 3112,
  frontendPort: process.env.frontendPort ?? 3113,
}
console.log(config)
export default config
