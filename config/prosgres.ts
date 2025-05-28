import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const isDev = process.argv.includes('--dev')

const config = isDev
    ? {
          connectionString: process.env.DB_URL,
          ssl: {
              rejectUnauthorized: false,
          },
      }
    : {
          connectionString: process.env.DB_URL,
          ssl: {
              rejectUnauthorized: false,
          },
      }

export default new Pool(config)
