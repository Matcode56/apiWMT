import express from 'express'
import usersService from '../services/users.service'
import { hashPassword } from '../../common/utils/cryptagePassword'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { GetUsersDTO } from '../DTO/getUsersDTO'
import { GetUserDTO } from '../DTO/getUserDTO'
import { PatchUserDTO } from '../DTO/patchUserDTO'

class UsersController {
  async getUsers(req: express.Request, res: express.Response): Promise<express.Response<GetUsersDTO[]>> {
    try {
      const size: number = req.query.size ? Number(req.query.size) : 20
      const page: number = req.query.page ? Number(req.query.page) : 0

      const users: GetUsersDTO = await usersService.getAll(size, page)
      return res.status(200).send(users)
    } catch (err) {
      return res.status(500).send('erreur')
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const id: number = Number(req.params.userId)
      const userDTO: GetUserDTO = await usersService.getById(id)
      if (!userDTO) {
        return res.status(404).send('user unfound')
      }
      return res.status(200).send(userDTO)
    } catch (err) {
      res.status(500).send(err)
    }
  }

  async createUser(req: express.Request, res: express.Response) {
    const user: CreateUserDTO = req.body
    const passwordHashed = await hashPassword(user.password)
    const userWithHashedPassword: CreateUserDTO = { ...user, password: passwordHashed }
    await usersService.create(userWithHashedPassword)
    res.status(201).send({ message: 'User created' })
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password)
    }
    const user: PatchUserDTO = req.body

    await usersService.patchById(user.id, user)
    res.status(204).send()
  }

  async removeUser(req: express.Request, res: express.Response) {
    console.log(await usersService.deleteById(req.body.id))
    res.status(204).send()
  }
}

export default new UsersController()
