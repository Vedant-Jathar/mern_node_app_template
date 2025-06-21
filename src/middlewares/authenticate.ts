import { expressjwt, GetVerificationKey } from 'express-jwt'
import jwksClient from 'jwks-rsa'
import { Config } from '../config'
import { Request } from 'express'

export default expressjwt({
  secret: jwksClient.expressJwtSecret({
    jwksUri: Config.JWKS_URI!,
    cache: true,
    rateLimit: true,
  }) as GetVerificationKey,

  algorithms: ['RS256'],

  getToken(req: Request) {
    const authHeader = req.headers.authorization

    if (authHeader && authHeader.split(' ')[1] !== 'undefined') {
      const accessToken = authHeader.split(' ')[1]
      return accessToken
    }

    type Cookies = {
      accessToken: string
    }
    const { accessToken } = req.cookies as Cookies

    return accessToken
  },
})
