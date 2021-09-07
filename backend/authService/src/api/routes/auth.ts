import jwt from 'jsonwebtoken'
import passport from 'passport'
import User from '@src/models/user'
import { Router, Request, Response, NextFunction } from 'express'
import { Container } from 'typedi'
import AuthService from '@services/auth'
import { IUser, IUserInputDTO } from '@interfaces/IUser'
import { celebrate, Joi } from 'celebrate'
import { COOKIE_OPTIONS } from '@src/authenticate'
import { getToken, getRefreshToken } from '@src/authenticate'

export default (route: Router) => {
    route.post(
        '/register',
        celebrate({
            body: Joi.object({
                email: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authServiceInstance = Container.get(AuthService)
                const { success, user, refreshToken, token } =
                    await authServiceInstance.Register(
                        req.body as IUserInputDTO,
                    )

                res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
                res.status(200).send({ success, token })
            } catch (error) {
                res.status(404).send({ success: false, error })
                // return next(e)
            }
        },
    )

    route.post(
        '/login',
        passport.authenticate('local'),
        celebrate({
            body: Joi.object({
                username: Joi.string().required(),
                password: Joi.string().required(),
            }),
        }),
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                const authServiceInstance = Container.get(AuthService)
                const { success, refreshToken, token } =
                    await authServiceInstance.Login(req.user as IUser)

                console.log(refreshToken)

                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.status(200).send({ success, token })
            } catch (error) {
                res.status(404).send({ success: false, error })
                // return next(e)
            }
        },
    )

    route.post(
        '/refreshToken',
        async (req: Request, res: Response, next: NextFunction) => {
            const { signedCookies = {} } = req
            const { refreshToken } = signedCookies
            
            if (!refreshToken) {
                res.status(401).send('Unauthorized')
            }
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
                                res.status(401).send('Unauthorized')
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
                                        res.status(500).send(err)
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
                            res.status(401).send('Unauthorized')
                        }
                    },
                    err => next(err),
                )
            } catch (err) {
                res.status(401).send('Unauthorized')
            }
        },
    )

    // route.post(
    //     '/logout',
    //     verifyUser,
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         const { signedCookies = {} } = req
    //         const { refreshToken } = signedCookies
    //         User.findById(req.user['_id']).then(
    //             user => {
    //                 const tokenIndex = user.refreshToken.findIndex(
    //                     item => item.refreshToken === refreshToken,
    //                 )
    //                 if (tokenIndex !== -1) {
    //                     user.refreshToken = user.refreshToken.filter(
    //                         obj => obj._id !== user.refreshToken[tokenIndex]._id,
    //                     )
    //                 }
    //                 user.save((err, user) => {
    //                     if (err) {
    //                         res.statusCode = 500
    //                         res.send(err)
    //                     } else {
    //                         res.clearCookie('refreshToken', COOKIE_OPTIONS)
    //                         res.send({ success: true })
    //                     }
    //                 })
    //             },
    //             err => next(err),
    //         )
    //     }
    // )

    // route.get('/me', verifyUser, (req, res, next) => {
    //     res.send(req.user)
    // })
}
