import { getPool } from '../../config/db'
import { User } from '../entite/user'
import { QueryResult } from 'pg'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { UserDatabase } from '../models/userDatabase'
import { createPatchRequest } from '../../common/utils/createPatchRequest'

require('dotenv').config()

class UsersDao {
  users: User[] = []
  poolPostgres = getPool()

  async addUser(user: CreateUserDTO): Promise<boolean> {
    const request = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *'
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
      throw new Error('unfound')
    }
  }

  async getUserByEmail(email: string): Promise<UserDatabase> {
    const request = 'SELECT * FROM users WHERE email=$1'
    const value = [email]
    try {
      const responseDB: QueryResult = await this.poolPostgres.query(request, value)
      const user: UserDatabase = responseDB.rows[0]
      return user
    } catch (err) {
      throw new Error("email doesn't exist")
    }
  }

  async patchUserById(userId: number, user: Partial<UserDatabase>): Promise<boolean> {
    const request = createPatchRequest('users', user, userId)
    console.log(request)

    try {
      await this.poolPostgres.query(request)
      return true
    } catch (err) {
      throw new Error(err)
    }
  }

  async removeUserById(userId: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id=$1'
    const value = [userId]
    try {
      await this.poolPostgres.query(query, value)
      return true
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new UsersDao()
