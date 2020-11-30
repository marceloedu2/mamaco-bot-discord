const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist'

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [`./${rootDir}/database/migrations/*.{js,ts}`],
  entities: [`./${rootDir}/models/*.{js,ts}`],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
