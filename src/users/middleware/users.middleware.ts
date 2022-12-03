import express from 'express'
import userService from '../services/users.service'
import debug from 'debug'
import { TokenJwt } from '../../auth/types/jwt'
import { verifyIsAdmin } from '../../auth/utils/verifyIsAdmin'

const log: debug.IDebugger = debug('app:users-controller')
class UsersMiddleware {
  extractUserId(req: express.Request, res: express.Response, next: express.NextFunction) {
    req.body.id = Number(req.params.userId)
    next()
  }

  validateNotEmptyBody(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bodyLength = Object.keys(req.body).length
    bodyLength === 0 ? res.status(400).send({ error: 'error empty body' }) : next()
  }

  validateRequiredUserBodyFields(req: express.Request, res: express.Response, next: express.NextFunction) {
    const requiredField = ['email', 'password', 'lastName', 'firstName']
    const fields = Object.keys(req.body)
    const isEqual = fields.every(val => requiredField.find(field => field === val))
    if (isEqual) {
      next()
    } else {
      res.status(400).send({
        error: `Missing required fields`,
      })
    }
  }

  validateIsAuthorized(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token: TokenJwt = res.locals.token
    const userId: number = req.body.id
    const isAdmin: boolean = verifyIsAdmin(token)
    if (!isAdmin && token.idUser !== userId) {
      return res.status(401).send({ error: 'Unauthorized' })
    }
    next()
  }

  validatePatchUserField(req: express.Request, res: express.Response, next: express.NextFunction) {
    const allowedFields = ['email', 'lastName', 'firstName', 'password', 'id']
    const fields = Object.keys(req.body)
    const isValidFields = fields.some(elt => allowedFields.find(field => field === elt))
    if (!isValidFields) {
      return res.status(400).send({ error: 'Invalid field' })
    }
    next()
  }

  async validateSameEmailDoesntExist(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getByEmail(req.body.email)
    if (user) {
      res.status(400).send({ error: `User email already exists` })
    } else {
      next()
    }
  }

  async validateSameEmailBelongToSameUser(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getByEmail(req.body.email)
    if (user && user.id === Number(req.params.userId)) {
      next()
    } else {
      res.status(400).send({ error: `Invalid email` })
    }
  }

  validatePatchEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.body.email) {
      this.validateSameEmailBelongToSameUser(req, res, next)
    } else {
      next()
    }
  }

  async validateUserExists(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user = await userService.getById(Number(req.params.userId))
    if (user) {
      next()
    } else {
      res.status(404).send({
        error: `User ${req.params.userId} not found`,
      })
    }
  }
}

export default new UsersMiddleware()
