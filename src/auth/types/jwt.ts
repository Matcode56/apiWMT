import { ROLE } from '../../users/entite/user'

export interface TokenJwt {
  idUser: number
  role: ROLE
  iat: number
  exp: number
}
