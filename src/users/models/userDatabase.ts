import { ROLE } from '../entite/user'

export class UserDatabase {
  id: number
  email: string
  password: string
  first_name: string
  last_name: string
  role: ROLE
}
