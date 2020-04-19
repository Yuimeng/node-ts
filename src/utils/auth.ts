import jwt from 'jsonwebtoken'
import { secret } from '../secret'

export const genToken = (payload: any) => {
  return jwt.sign(payload, secret, {
    expiresIn: '2 days'
  })
}
