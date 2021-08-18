import { Router } from 'express'
import jwt from 'jsonwebtoken'
import passport from 'passport'
import { IUser } from '@interfaces/IUser'
import User from '@src/models/user'

const {
    getToken,
    COOKIE_OPTIONS,
    getRefreshToken,
    verifyUser,
} = require('@src/authenticate')

export default (route: Router) => {
    
    route.post('/register', (req, res, next) => {
        if (!req.body.email) {
            res.statusCode = 500
            res.send({
                name: 'FirstNameError',
                message: 'The email is required',
            })
        } else {
            User.register(
                new User({ email: req.body.email }),
                req.body.password,
                (err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        const token = getToken({ _id: user._id })
                        const refreshToken = getRefreshToken({ _id: user._id })
                        user.refreshToken.push({ refreshToken })
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err)
                            } else {
                                res.cookie(
                                    'refreshToken',
                                    refreshToken,
                                    COOKIE_OPTIONS,
                                )
                                res.send({ success: true, token })
                            }
                        })
                    }
                },
            )
        }
    })

    route.post('/login', passport.authenticate('local'), (req, res, next) => {
        const token = getToken({ _id: req.user['_id'] })
        const {refreshToken} = getRefreshToken({ _id: req.user['_id'] })
        User.findById(req.user['_id']).then(
            user => {
                user.refreshToken.push(refreshToken)
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    }
                    res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
                    res.status(200).send({ success: true, token })
                })
            },
            err => next(err),
        )
    })

    route.post('/refreshToken', (req, res, next) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies
        if (refreshToken) {
            try {
                const payload = jwt.verify(
                    refreshToken,
                    process.env.REFRESH_TOKEN_SECRET,
                )
                const userId = payload['_id']
                User.findOne({ _id: userId }).then(
                    user => {
                        if (user) {
                            // Find the refresh token against the user record in database
                            const tokenIndex = user.refreshToken.findIndex(
                                item => item.refreshToken === refreshToken,
                            )
                            if (tokenIndex === -1) {
                                res.statusCode = 401
                                res.send('Unauthorized')
                            } else {
                                const token = getToken({ _id: userId })
                                // If the refresh token exists, then create new one and replace it.
                                const newRefreshToken = getRefreshToken({
                                    _id: userId,
                                })
                                user.refreshToken[tokenIndex] = {
                                    refreshToken: newRefreshToken,
                                }
                                user.save((err, user) => {
                                    if (err) {
                                        res.statusCode = 500
                                        res.send(err)
                                    } else {
                                        res.cookie(
                                            'refreshToken',
                                            newRefreshToken,
                                            COOKIE_OPTIONS,
                                        )
                                        res.send({ success: true, token })
                                    }
                                })
                            }
                        } else {
                            res.statusCode = 401
                            res.send('Unauthorized')
                        }
                    },
                    err => next(err),
                )
            } catch (err) {
                res.statusCode = 401
                res.send('Unauthorized')
            }
        } else {
            res.statusCode = 401
            res.send('Unauthorized')
        }
    })

    route.get('/me', verifyUser, (req, res, next) => {
        res.send(req.user)
    })

    route.get('/logout', verifyUser, (req, res, next) => {
        const { signedCookies = {} } = req
        const { refreshToken } = signedCookies
        User.findById(req.user['_id']).then(
            user => {
                const tokenIndex = user.refreshToken.findIndex(
                    item => item.refreshToken === refreshToken,
                )
                if (tokenIndex !== -1) {
                    user.refreshToken = user.refreshToken.filter(
                        obj => obj._id !== user.refreshToken[tokenIndex]._id,
                    )
                }
                user.save((err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        res.clearCookie('refreshToken', COOKIE_OPTIONS)
                        res.send({ success: true })
                    }
                })
            },
            err => next(err),
        )
    })
}
