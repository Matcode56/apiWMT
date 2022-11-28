import { getPool } from '../../config/db'
import { User } from '../entite/user'
import { QueryResult } from 'pg'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { UserDatabase } from '../models/userDatabase'
import { PutUserDTO } from '../DTO/putUserDTO'
import { PatchUserDTO } from '../DTO/patchUserDTO'

require('dotenv').config()

class UsersDao {
  users: User[] = []
  poolPostgres = getPool()

  async addUser(user: CreateUserDTO): Promise<boolean> {
    const request =
      'INSERT INTO users (first_name, last_name, , email, password) VALUES ($1, $2, $3, $4 , $5, $6) RETURNING *'
    const values = [user.firstName, user.lastName, user.email, user.password]
    try {
      await this.poolPostgres.query(request, values)
      return true
    } catch (err) {
      throw new Error()
    }
  }

  async getNumberUsers(): Promise<number> {
    const request = 'SELECT count(*) FROM users'
    try {
      const queryResult: QueryResult = await this.poolPostgres.query(request)
      const numberUsers: number = Number(queryResult.rows[0].count)
      return numberUsers
    } catch (err) {
      throw new Error()
    }
  }

  async getUsers(size: number, offset: number): Promise<QueryResult> {
    const request = 'SELECT * FROM users ORDER BY id LIMIT $1 OFFSET $2'

    const values = [size, offset]
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request, values)
      console.log(responseDB.rowCount)

      return responseDB
    } catch (err) {
      console.log(err)

      throw new Error()
    }
  }

  async getUserById(userId: number): Promise<UserDatabase> {
    const request = 'SELECT * FROM users WHERE id=$1'
    const value = [userId]
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request, value)
      const user: UserDatabase = responseDB.rows[0]
      return user
    } catch (err) {
      console.log('testtt')

      throw new Error('unfound')
    }
  }

  async getUserByEmail(email: string) {
    return this.users.find((user: { email: string }) => user.email === email)
  }

  async putUserById(userId: number, user: PutUserDTO) {
    const objIndex = this.users.findIndex((obj: { id: number }) => obj.id === userId)
    // this.users.splice(objIndex, 1, user)
    return `${user.id} updated via put`
  }

  async patchUserById(userId: number, user: PatchUserDTO) {
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
