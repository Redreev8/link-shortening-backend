import { createClient } from 'redis'

const isDev = process.argv.includes('--dev')

const redis = createClient(
    isDev ? { url: process.env.REDIS_URL } : { url: process.env.REDIS_URL },
)

export default redis
