import { ConnectionOptions, createConnection } from 'typeorm'

const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist'

const config: ConnectionOptions = {
  type: 'sqlite',
  database: './src/database/database.sqlite',
  migrations: [`./${rootDir}/database/migrations/*.{js,ts}`],
  entities: [`./${rootDir}/models/*.{js,ts}`],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
console.log({ config })
createConnection(config)
  .then(() => {
    console.log('Connected to database')
  })
  .catch(error => console.log(error))
