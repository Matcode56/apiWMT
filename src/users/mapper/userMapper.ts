import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { GetUserDTO } from '../DTO/getUserDTO'
import { PatchUserDTO } from '../DTO/patchUserDTO'
import { User } from '../entite/user'
import { UserDatabase } from '../models/userDatabase'

export class UserMapper {
  static mapToDatabase = (userDTO: CreateUserDTO | PatchUserDTO): Partial<UserDatabase> => {
    const keyCorrespondence = {
      id: 'id',
      email: 'email',
      password: 'password',
      firstName: 'first_name',
      lastName: 'last_name',
    }
    const user: Partial<UserDatabase> = Object.keys(userDTO).reduce((acc, elem) => {
      const key: string = keyCorrespondence[elem]

      const newValue = { [key]: userDTO[elem] }
      const oldValue = { ...acc }

      return { ...oldValue, ...newValue }
    }, {})

    return user
  }

  static mapToEntite = (user: UserDatabase): User => {
    const userEntite: User = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      password: user.password,
      role: user.role,
    }
    return userEntite
  }

  static mapToDTO = (user: User): GetUserDTO => {
    const userDTO: GetUserDTO = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    }
    return userDTO
  }
}
