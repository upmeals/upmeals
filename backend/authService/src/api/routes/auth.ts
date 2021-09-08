import { ISession, IUser, IUserInputDTO } from '@interfaces/IUser'
import AuthService from '@services/auth'
import { COOKIE_OPTIONS, verifyUser } from '@src/authenticate'
import { celebrate, Joi } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import { Container } from 'typedi'

const authServiceInstance = Container.get(AuthService)

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
                const { success, user, refreshToken, token } = await authServiceInstance.Register(
                    req.body as IUserInputDTO,
                )

                res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
                res.status(200).send({ success, token })
            } catch (error) {
                res.status(404).send({ success: false, error: error.message })
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
<<<<<<< HEAD
                const authServiceInstance = Container.get(AuthService)
                const { success, refreshToken, token } =
                    await authServiceInstance.Login(req.user as IUser)
=======
                const { success, user, refreshToken, token } = await authServiceInstance.Login(
                    req.user as IUser,
                )
>>>>>>> main

                console.log(refreshToken)

                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.status(200).send({ success, token })
            } catch (error) {
                res.status(404).send({ success: false, error: error.message })
                // return next(e)
            }
        },
    )

<<<<<<< HEAD
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
=======
    route.post('/refreshToken', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { signedCookies = {} } = req
            const { refreshTokenCookie } = signedCookies
            const { success, refreshToken, token } = await authServiceInstance.RefreshToken(
                refreshTokenCookie as ISession,
            )

            res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
            return res.send({ success, refreshToken, token })
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
            // return next(e)
        }
    })

    route.post('/logout', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { signedCookies = {} } = req
            const { refreshTokenCookie } = signedCookies
            const { success } = await authServiceInstance.Logout(
                refreshTokenCookie as ISession,
                req.user['_id'],
            )
>>>>>>> main

            res.clearCookie('refreshToken', COOKIE_OPTIONS)
            return res.send({ success })
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
            // return next(e)
        }
    })

    route.get('/me', verifyUser, (req, res, next) => {
        res.send(req.user)
    })
}
