import { GetUserDTO } from '../DTO/getUserDTO'
import { GetUsersDTO } from '../DTO/getUsersDTO'

export class userCRUD {
  getAll: (limit: number, page: number) => Promise<GetUsersDTO>
  getById: (id: number) => Promise<GetUserDTO>
  getByEmail: (email: string) => Promise<GetUserDTO>
  create: (resource: any) => Promise<boolean>
  putById?: (id: number, ressource: any) => Promise<string>
  patchById: (id: number, ressource: any) => Promise<boolean>
  deleteById: (id: number) => Promise<boolean>
}
