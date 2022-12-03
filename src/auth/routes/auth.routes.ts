import { CommonRoutesConfig } from '../../common/common.routes.config'
import express from 'express'
import authController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'
import bodyValidationMiddleware from '../../common/middlewares/body.validation.middleware'

export class AuthRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'AuthRoutes')
  }

  configureRoutes(): express.Application {
    this.app.post(
      '/login',
      bodyValidationMiddleware.validateNotEmptyBody,
      authMiddleware.validateRequiredLoginBodyField,
      authMiddleware.verifyUserPassword,
      authController.createJWT
    )

    return this.app
  }
}
