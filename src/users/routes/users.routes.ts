import express from 'express'
import authMiddleware from '../../auth/middlewares/auth.middleware'
import { CommonRoutesConfig } from '../../common/common.routes.config'
import bodyValidationMiddleware from '../../common/middlewares/body.validation.middleware'
import UsersController from '../controllers/UsersController'
import usersMiddleware from '../middleware/users.middleware'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(authMiddleware.extractTokenHeader, authMiddleware.verifyAndDecryptToken, UsersController.getUsers)
      .post(
        bodyValidationMiddleware.validateNotEmptyBody,
        usersMiddleware.validateRequiredUserBodyFields,
        usersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      )

    this.app
      .route(`/users/:userId`)
      .get(
        usersMiddleware.extractUserId,
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        UsersController.getUserById
      )
      .delete(
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        usersMiddleware.extractUserId,
        usersMiddleware.validateIsAuthorized,
        usersMiddleware.validateUserExists,
        UsersController.removeUser
      )
      .patch([
        bodyValidationMiddleware.validateNotEmptyBody,
        authMiddleware.extractTokenHeader,
        authMiddleware.verifyAndDecryptToken,
        usersMiddleware.extractUserId,
        usersMiddleware.validateIsAuthorized,
        usersMiddleware.validateUserExists,
        usersMiddleware.validatePatchUserField,
        usersMiddleware.validatePatchEmail,
        UsersController.updateUser,
      ])

    return this.app
  }
}
