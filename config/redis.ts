import { createClient } from 'redis'

const isDev = process.argv.includes('--dev')

const redis = createClient(isDev ? {} : { url: 'redis://redis:6379' })

export default redis
