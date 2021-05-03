import { createConnection } from 'typeorm'

createConnection()
  .then(() => console.log('Database Connected'))
  .catch(e => console.log(`Error: ${e}`))
