import { CreateUserDTO } from '../DTO/CreateUserDTO'
import { GetUserDTO } from '../DTO/GetUserDTO'
import { UpdateUserDTO } from '../DTO/updateUserDTO'
import { User } from '../entite/user'

export class UserMapper {
  static mapToEntite = (userDTO: CreateUserDTO | UpdateUserDTO): Partial<User> => {
    const keyCorrespondence = {
      id: 'id',
      email: 'email',
      password: 'password',
      firstName: 'first_name',
      lastName: 'last_name',
    }
    const user: Partial<User> = Object.keys(userDTO).reduce((acc, elem) => {
      const key: string = keyCorrespondence[elem]

      const newValue = { [key]: userDTO[elem] }
      const oldValue = { ...acc }

      return { ...oldValue, ...newValue }
    }, {})

    return user
  }

  static mapToDTO = (user: User): GetUserDTO => {
    console.log(user)

    const userDTO: GetUserDTO = {
      id: user.id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
    }
    return userDTO
  }
}
