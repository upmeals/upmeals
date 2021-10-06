import { ISession } from '@interfaces/ISession'
import { IUser, IUserInputDTO } from '@interfaces/IUser'
import { COOKIE_OPTIONS, verifyUser } from '@lib/authenticate'
import AuthService from '@services/auth'
import { celebrate, Joi } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'
import passport from 'passport'
import { Container } from 'typedi'

const authServiceInstance = Container.get(AuthService)
const route = Router()

export default (): Router => {
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
                const { success, refreshToken, token } = await authServiceInstance.Register(
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
                const { success, refreshToken, token } = await authServiceInstance.Login(
                    req.user as IUser,
                )

                res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS)
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
            const { refreshToken } = signedCookies

            const { success, newRefreshToken, token } = await authServiceInstance.RefreshToken(
                refreshToken as ISession,
            )

            res.cookie('refreshToken', newRefreshToken, COOKIE_OPTIONS)
            return res.send({ success, token })
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
            // return next(e)
        }
    })

    route.post('/logout', verifyUser, async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { signedCookies = {} } = req
            const { refreshToken } = signedCookies

            const { success } = await authServiceInstance.Logout(
                refreshToken as ISession,
                req.user['_id'],
            )

            res.clearCookie('refreshToken', COOKIE_OPTIONS)
            return res.send({ success })
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
            // return next(e)
        }
    })

    return route
}
