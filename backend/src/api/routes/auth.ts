import { Router } from 'express'

const route = Router()

export default (app: Router) => {
    app.use('/auth', route)

    // route.post(
    //     '/signup',
    //     celebrate({
    //         body: Joi.object({
    //             name: Joi.string().required(),
    //             email: Joi.string().required(),
    //             password: Joi.string().required(),
    //         }),
    //     }),
    //     async (req: Request, res: Response, next: NextFunction) => {
    //         const logger: Logger = Container.get('logger')
    //         logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
    //         try {
    //             const authServiceInstance = Container.get(AuthService)
    //             const { user, token } = await authServiceInstance.SignUp(
    //                 req.body as IUserInputDTO,
    //             )
    //             return res.status(201).json({ user, token })
    //         } catch (e) {
    //             logger.error('🔥 error: %o', e)
    //             return next(e)
    //         }
    //     },
    // )
}