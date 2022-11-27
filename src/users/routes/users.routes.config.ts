import express from 'express'
import { CommonRoutesConfig } from '../../common/common.routes.config'
import UsersController from '../controllers/UsersController'
import usersMiddleware from '../middleware/users.middleware'

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, 'UsersRoutes')
  }

  configureRoutes(): express.Application {
    this.app
      .route(`/users`)
      .get(UsersController.getUsers)
      .post(
        usersMiddleware.validateRequiredUserBodyFields,
        usersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      )

    // this.app.param(`userId`, usersMiddleware.extractUserId)
    this.app.route(`/users/:userId`).get(UsersController.getUserById).delete(UsersController.removeUser)

    this.app.put(`/users/:userId`, [
      usersMiddleware.validateRequiredUserBodyFields,
      usersMiddleware.validateSameEmailBelongToSameUser,
      UsersController.put,
    ])

    this.app.patch(`/users/:userId`, [usersMiddleware.validatePatchEmail, UsersController.patch])

    return this.app
  }
}
