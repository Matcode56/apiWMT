import { CRUD } from '../../common/CRUD'
import UsersDao from '../DAO/usersDao'
import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { UpdateUserDTO } from '../DTO/updateUserDTO'

class UsersService implements CRUD {
  async create(resource: CreateUserDTO) {
    return UsersDao.addUser(resource)
  }

  async deleteById(id: number) {
    return UsersDao.removeUserById(id)
  }

  async getAll(limit: number, page: number) {
    return UsersDao.getUsers()
  }

  async getById(id: number) {
    return UsersDao.getUserById(id)
  }

  getByEmail = async (email: string) => {
    return UsersDao.getUserByEmail(email)
  }

  async patchById(id: number, resource: UpdateUserDTO) {
    return UsersDao.patchUserById(id, resource)
  }

  async putById(id: number, resource: UpdateUserDTO) {
    return UsersDao.putUserById(id, resource)
  }
}

export default new UsersService()
