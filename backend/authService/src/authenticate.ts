import passport from 'passport'
import jwt from 'jsonwebtoken'
import config from '@config/index'
import { ISession } from './interfaces/IUser'

export const COOKIE_OPTIONS = {
    httpOnly: true,
    // Since localhost is not having https protocol,
    // secure cookies do not work correctly (in postman)
    secure: !config.env,
    signed: true,
    maxAge: eval(config.refreshToken.expiry) * 1000,
    sameSite: false,
}

export function getToken(user) {
    return jwt.sign(user, config.jwtSecret, {
        expiresIn: eval(config.sessionExpiry),
    })
}

export function getRefreshToken(user) {
    const refreshToken = jwt.sign(user, config.refreshToken.secret, {
        expiresIn: eval(config.refreshToken.expiry),
    })
    return refreshToken
}

export const verifyUser = passport.authenticate('jwt', { session: false })
