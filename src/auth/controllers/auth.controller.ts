import express from 'express'
import jwt from 'jsonwebtoken'

require('dotenv').config()
const jwtSecret: string = process.env.JWT_SECRET
const tokenExpirationInSeconds = '1d'

class AuthController {
  async createJWT(req: express.Request, res: express.Response) {
    try {
      const token = jwt.sign({ userId: res.locals.userId, role: res.locals.userRole }, jwtSecret, {
        expiresIn: tokenExpirationInSeconds,
      })
      return res.status(201).send({ accessToken: token })
    } catch (err) {
      return res.status(500).send()
    }
  }
}

export default new AuthController()
