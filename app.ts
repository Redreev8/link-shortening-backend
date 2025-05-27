import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import userRouter from './controller/users/users.router'
import tokenRouter from './controller/token/token.router'
import rolesRouter from './controller/role/role.router'
import actionsRouter from './controller/actons/actons.router'
import roleActionsRouter from './controller/role_actions/role_actions.router'
import linksRouter from './controller/links/links.router'
import pool from './config/prosgres'
import redis from './config/redis'
import connectionCheckPg from './helper/connection-check-pg'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())

app.use('/api', userRouter)
app.use('/api', tokenRouter)
app.use('/api', rolesRouter)
app.use('/api', actionsRouter)
app.use('/api', roleActionsRouter)
app.use('/', linksRouter)

pool.query('SELECT NOW()', connectionCheckPg)

redis.on('error', (err) => console.log('Redis Client Error', err))
redis.on('connect', () => console.log('Redis Client Connected'))

redis.connect()

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
