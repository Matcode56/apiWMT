import express from 'express'
import { checkPassword } from '../../common/utils/cryptagePassword'
import { UserDatabase } from '../../users/models/userDatabase'
import usersService from '../../users/services/users.service'

export class AuthMiddleware {
  async verifyUserPassword(req: express.Request, res: express.Response, next: express.NextFunction) {
    const user: UserDatabase = await usersService.getUserByEmailWithPassword(req.body.email)
    if (user) {
      const password = req.body.password
      const passwordHashInDB = user.password
      const isSamePassword = checkPassword(password, passwordHashInDB)
      return isSamePassword ? next() : res.status(400).send({ error: 'Invalid email and/or password' })
    }
    return res.status(400).send({ error: 'Invalid email and/or password' })
  }
}
