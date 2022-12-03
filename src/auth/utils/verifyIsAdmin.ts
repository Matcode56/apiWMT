import express from 'express'
import { TokenJwt } from '../types/jwt'

export const verifyIsAdmin = (token: TokenJwt): boolean => {
  if (token.role !== 'admin') {
    return false
  }
  return true
}
