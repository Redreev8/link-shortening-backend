import pkg from 'pg'
import dotenv from 'dotenv'

const { Pool } = pkg

dotenv.config()

const config = {
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
}
export default new Pool(config)
