import { GetUserDTO } from './getUserDTO'

export interface GetUsersDTO {
  totalElements: number
  nextPage: boolean
  users: GetUserDTO[]
}
