import express from 'express'

import usersService from '../services/users.service'

import bcrypt from 'bcrypt'

import debug from 'debug'

import { hashPassword } from '../../common/utils/cryptagePassword'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { UserMapper } from '../mapper/userMapper'
import { GetUserDTO } from '../DTO/GetUserDTO'

class UsersController {
  async getUsers(req: express.Request, res: express.Response) {
    try {
      const users = await usersService.getAll(100, 0)
      const usersDTO: GetUserDTO[] = users.map(user => UserMapper.mapToDTO(user))
      return res.status(200).send(usersDTO)
    } catch (err) {
      return res.status(500).send('erreur')
    }
  }

  async getUserById(req: express.Request, res: express.Response) {
    try {
      const id: number = Number(req.params.userId)
      const user = await usersService.getById(id)
      if (!user) {
        return res.status(404).send('user unfound')
      }
      const userDTO = UserMapper.mapToDTO(user)
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
