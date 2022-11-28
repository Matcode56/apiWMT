import express from 'express'
import usersService from '../services/users.service'
import { hashPassword } from '../../common/utils/cryptagePassword'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { GetUsersDTO } from '../DTO/getUsersDTO'
import { GetUserDTO } from '../DTO/getUserDTO'

class UsersController {
  async getUsers(req: express.Request, res: express.Response): Promise<express.Response<GetUsersDTO[]>> {
    try {
      const size: number = req.query.size ? Number(req.query.page) : 20
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
    const userId = await usersService.create(userWithHashedPassword)
    res.status(201).send({ id: userId })
  }

  async patch(req: express.Request, res: express.Response) {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password)
    }
    console.log(await usersService.patchById(req.body.id, req.body))
    res.status(204).send()
  }

  async put(req: express.Request, res: express.Response) {
    req.body.password = await hashPassword(req.body.password)
    console.log(await usersService.putById(req.body.id, req.body))
    res.status(204).send()
  }

  async removeUser(req: express.Request, res: express.Response) {
    console.log(await usersService.deleteById(req.body.id))
    res.status(204).send()
  }
}

export default new UsersController()
