//Importation Framework Express
import express, { Router } from 'express'
import * as http from 'http'
import cors from 'cors'
import { CommonRoutesConfig } from './common/common.routes.config'
import { UsersRoutes } from './users/routes/users.routes'
import * as winston from 'winston'
import * as expressWinston from 'express-winston'
import 'dotenv/config'
import { getPool } from './config/db'
import { AuthRoutes } from './auth/routes/auth.routes'

const app: express.Application = express()
const server: http.Server = http.createServer(app)

const port = 3000
const routes: Array<CommonRoutesConfig> = []

// export const pool = getPool()
// const connectToDB = async () => {

//   try {
//     await pool.connect()
//   } catch (err) {
//     console.log(err)
//   }
// }
// connectToDB()

//Parse all incoming requests as JSON
app.use(express.json())

// here we are adding middleware to allow cross-origin requests
app.use(cors())

// here we are preparing the expressWinston logging middleware configuration,
// which will automatically log all HTTP requests handled by Express.js
const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
}

app.use(expressWinston.logger(loggerOptions))

routes.push(new UsersRoutes(app))
routes.push(new AuthRoutes(app))

const runningMessage = `Server running at http://localhost:${port}`

server.listen(port, () => {
  // our only exception to avoiding console.log(), because we
  // always want to know when the server is done starting up
  console.log(runningMessage)
})
