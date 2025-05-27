import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const isDev = process.argv.includes('--dev')

export default new Pool({
    user: process.env.DB_USER,
    host: isDev ? 'localhost' : process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: +process.env.DB_PORT!,
})
