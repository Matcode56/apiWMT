import { QueryResult } from 'pg'
import { CRUD } from '../../common/CRUD'
import { paginatedResults, PaginatedResults } from '../../common/utils/paginatedResults'
import UsersDao from '../DAO/usersDao'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { GetUserDTO } from '../DTO/getUserDTO'
import { GetUsersDTO } from '../DTO/getUsersDTO'
import { PatchUserDTO } from '../DTO/patchUserDTO'
import { User } from '../entite/user'
import { UserMapper } from '../mapper/userMapper'
import { UserDatabase } from '../models/userDatabase'

class UsersService implements CRUD {
  async create(resource: CreateUserDTO): Promise<boolean> {
    return UsersDao.addUser(resource)
  }

  async deleteById(id: number) {
    return UsersDao.removeUserById(id)
  }

  async getAll(size: number, page: number): Promise<GetUsersDTO> {
    const offset: number = size * page
    const numberUsers = await UsersDao.getNumberUsers()
    const responseDB: QueryResult = await UsersDao.getUsers(size, offset)
    const pagination: PaginatedResults = paginatedResults(responseDB, offset, numberUsers)
    const usersDB: UserDatabase[] = responseDB.rows

    const users: User[] = usersDB.map(userDB => UserMapper.mapToEntite(userDB))
    const usersDTO: GetUserDTO[] = users.map(userDB => UserMapper.mapToDTO(userDB))
    const resDTO: GetUsersDTO = {
      ...pagination,
      users: usersDTO,
    }

    return resDTO
  }

  async getById(id: number): Promise<GetUserDTO> {
    const userDB: UserDatabase = await UsersDao.getUserById(id)
    if (!userDB) {
      return undefined
    }
    const user: User = UserMapper.mapToEntite(userDB)
    const userDTO: GetUserDTO = UserMapper.mapToDTO(user)
    return userDTO
  }

  async getByEmail(email: string): Promise<GetUserDTO> {
    const userDB: UserDatabase = await UsersDao.getUserByEmail(email)
    if (!userDB) {
      return undefined
    }
    const user: User = UserMapper.mapToEntite(userDB)
    const userDTO: GetUserDTO = UserMapper.mapToDTO(user)
    return userDTO
  }

  async patchById(userId: number, resource: PatchUserDTO) {
    const userUpdated = UserMapper.mapToDatabase(resource)
    return UsersDao.patchUserById(userUpdated.id, userUpdated)
  }

  async getUserByEmailWithPassword(email: string): Promise<UserDatabase> {
    const user = await UsersDao.getUserByEmail(email)
    return user
  }
}

export default new UsersService()
