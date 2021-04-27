const rootDir = process.env.NODE_ENV === 'development' ? 'src' : 'dist'

module.exports = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  migrations: [`./${rootDir}/database/migrations/*.{js,ts}`],
  entities: [`./${rootDir}/models/*.{js,ts}`],
  cli: {
    migrationsDir: './src/database/migrations',
  },
}
