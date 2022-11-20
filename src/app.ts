//Importation dotenv pour sécuriser des données sensible
require('dotenv').config({ path: './config/.env' })

//Importation Framework Express
import express from 'express'
const app = express()

// import http from 'http'
// const server = http.createServer(app)

//CORS
// import cors from 'cors';
// const corsOptions= {
//   origin: 'http://localhost:3000',
//   credentials: true
// }

// app.use(cors(corsOptions));

// Routes
const userRoutes = require('./routes/users.routes')
const authRoutes = require('./routes/auth.routes')
const messagesRoutes = require('./routes/messages.routes')

// Parser
app.use(express.json())
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Routes

app.use('/api/user', userRoutes)
app.use('/api/auth/', authRoutes)
app.use('/api/messages', messagesRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`)
})

export default app
