import express from 'express'
import { validationResult } from 'express-validator'

class BodyValidationMiddleware {
  validateNotEmptyBody(req: express.Request, res: express.Response, next: express.NextFunction) {
    const bodyLength = Object.keys(req.body).length
    bodyLength === 0 ? res.status(400).send({ error: 'error empty body' }) : next()
  }

  verifyBodyFieldsErrors(req: express.Request, res: express.Response, next: express.NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() })
    }
    next()
  }
}

export default new BodyValidationMiddleware()
