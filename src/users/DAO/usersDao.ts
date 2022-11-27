import { getPool } from '../../config/db'

import { User } from '../entite/user'
import { QueryResult } from 'pg'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { GetUserDTO } from '../DTO/GetUserDTO'
import { UpdateUserDTO } from '../DTO/updateUserDTO'
import { UserMapper } from '../mapper/userMapper'

require('dotenv').config()

class UsersDao {
  users: User[] = []
  poolPostgres = getPool()

  async addUser(user: CreateUserDTO) {
    // this.users.push(user)
    // return user.id
  }

  async getUsers(): Promise<User[]> {
    const request = 'SELECT *  FROM users'
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request)
      const users: User[] = responseDB.rows
      return users
    } catch (err) {
      console.log(err)

      throw new Error()
    }
  }

  async getUserById(userId: number): Promise<User> {
    const request = 'SELECT * FROM users WHERE id=$1'
    const value = [userId]
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request, value)
      const user: User = responseDB.rows[0]

      return user
    } catch (err) {
      console.log('testtt')

      throw new Error('unfound')
    }
  }

  async getUserByEmail(email: string) {
    return this.users.find((user: { email: string }) => user.email === email)
  }

  async putUserById(userId: number, user: UpdateUserDTO) {
    const objIndex = this.users.findIndex((obj: { id: number }) => obj.id === userId)
    // this.users.splice(objIndex, 1, user)
    return `${user.id} updated via put`
  }

  async patchUserById(userId: number, user: UpdateUserDTO) {
    const objIndex = this.users.findIndex((obj: { id: number }) => obj.id === userId)
    let currentUser = this.users[objIndex]
    const allowedPatchFields = ['password', 'firstName', 'lastName', 'email']
    for (let field of allowedPatchFields) {
      if (field in user) {
        // @ts-ignore
        currentUser[field] = user[field]
      }
    }
    this.users.splice(objIndex, 1, currentUser)
    return `${user.id} patched`
  }

  async removeUserById(userId: number) {
    const objIndex = this.users.findIndex((obj: { id: number }) => obj.id === userId)
    this.users.splice(objIndex, 1)
    return `${userId} removed`
  }
}

export default new UsersDao()
