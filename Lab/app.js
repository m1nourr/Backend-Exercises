import { app } from './src/express.js'
import databaseService from './src/service/DatabaseService.js'

// Connect to the database
await databaseService.connect()

// Start the express server
const port = process.env.PORT || 3100
const host = '127.0.0.1'

app.listen(port, host, () => {
  console.log(`Listening on http://${host}:${port}`)
})