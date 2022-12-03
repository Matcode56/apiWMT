import express from 'express'
import { checkPassword } from '../../common/utils/cryptagePassword'
import { UserDatabase } from '../../users/models/userDatabase'
import jwt, { JwtPayload } from 'jsonwebtoken'
import usersService from '../../users/services/users.service'
import { TokenJwt } from '../types/jwt'
import { Logform } from 'winston'

const jwtSecret: string = process.env.JWT_SECRET

export class AuthMiddleware {
  async verifyUserPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user: UserDatabase = await usersService.getUserByEmailWithPassword(req.body.email)
    if (user) {
      const password = req.body.password
      const passwordHashInDB = user.password
      const isSamePassword = checkPassword(password, passwordHashInDB)
      res.locals.userId = user.id
      res.locals.userRole = user.role
      return isSamePassword ? next() : res.status(400).send({ error: 'Invalid email and/or password' })
    }
    return res.status(400).send({ error: 'Invalid email and/or password' })
  }

  async verifyAndDecryptToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token = res.locals.token

    try {
      const tokenDecrypted = jwt.verify(token, jwtSecret)
      res.locals.token = tokenDecrypted
      console.log(res.locals.token)

      next()
    } catch (err) {
      return res.status(401).send({ error: 'Unauthorized' })
    }
  }

  async extractTokenHeader(req: express.Request, res: express.Response, next: express.NextFunction) {
    const authorization = req.headers['authorization']
    if (!authorization) {
      return res.status(401).send({ error: 'Unauthorized' })
    }
    const authorizationSplit = req.headers['authorization'].split(' ')
    if (authorizationSplit[0] !== 'Bearer') {
      return res.status(401).send({ error: 'Unauthorized' })
    }
    res.locals.token = authorizationSplit[1]
    next()
  }

  validateRequiredLoginBodyField(req: express.Request, res: express.Response, next: express.NextFunction) {
    const requiredField = ['email', 'password']
    const fields = Object.keys(req.body)
    const isEqual = fields.every(val => requiredField.find(field => field === val))

    if (isEqual) {
      next()
    } else {
      res.status(400).send({
        error: `Error required fields`,
      })
    }
  }
}

export default new AuthMiddleware()
