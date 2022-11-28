import express from 'express'
import { CommonRoutesConfig } from '../../common/common.routes.config'
import UsersController from '../controllers/UsersController'
import { UserMapper } from '../mapper/userMapper'
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
        usersMiddleware.validateNotEmptyBody,
        usersMiddleware.validateRequiredUserBodyFields,
        usersMiddleware.validateSameEmailDoesntExist,
        UsersController.createUser
      )

    // this.app.param(`userId`, usersMiddleware.extractUserId)
    this.app
      .route(`/users/:userId`)
      .get(UsersController.getUserById)
      .delete(UsersController.removeUser)
      .patch([
        usersMiddleware.extractUserId,
        usersMiddleware.validateNotEmptyBody,
        usersMiddleware.validateUserExists,
        usersMiddleware.validatePatchUserField,
        usersMiddleware.validatePatchEmail,
        UsersController.patch,
      ])
    this.app.patch('/users/psw/:userId')

    // this.app.put(`/users/:userId`, [
    //   usersMiddleware.validateRequiredUserBodyFields,
    //   usersMiddleware.validateSameEmailBelongToSameUser,
    //   UsersController.put,
    // ])

    // this.app.patch(`/users/:userId`, [
    //   usersMiddleware.validatePatchUserField,
    //   usersMiddleware.validatePatchEmail,
    //   UsersController.patch,
    // ])

    return this.app
  }
}
