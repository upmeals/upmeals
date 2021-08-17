import { IUserInputDTO } from '@interfaces/IUser'
import { celebrate, Joi } from 'celebrate'
import { Router, Request, Response, NextFunction } from 'express'
import AuthService from '@services/auth'
import Container from 'typedi'

const route = Router()

export default (app: Router) => {
    // TODO : REMOVE THIS FOR MICROS
    app.use('/auth', route)
    // END

    // route.post(
    //     '/register',
    //     celebrate({
    //         body: Joi.object({
    //             email: Joi.string().required(),
    //             password: Joi.string().required(),
    //         }),
    //     }),
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         try {
    //             const authServiceInstance = Container.get(AuthService)
    //             const { user, token } = await authServiceInstance.Register(
    //                 req.body as IUserInputDTO,
    //             )
    //             return res.status(201).json({ user, token })
    //         } catch (e) {
    //             console.error(`🔥 error: ${e}`)
    //             return next(e)
    //         }
    //     },
    // )
}