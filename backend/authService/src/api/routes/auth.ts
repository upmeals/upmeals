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
                const { success, user, refreshToken, token } = await authServiceInstance.Login(
                    req.user as IUser,
                )

                console.log(refreshToken)

                res.cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
                res.status(200).send({ success, token })
            } catch (error) {
                res.status(404).send({ success: false, error: error.message })
                // return next(e)
            }
        },
    )

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
