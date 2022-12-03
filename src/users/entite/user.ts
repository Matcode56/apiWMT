export class User {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  role: ROLE
}

export type ROLE = 'admin' | 'user'
