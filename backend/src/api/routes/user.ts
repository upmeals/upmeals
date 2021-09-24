import UserModel from '@models/user'
import actions from '@src/actions'
import { verifyUser } from '@src/authenticate'
import { NextFunction, Request, Response, Router } from 'express'

const route = Router()

export default (): Router => {
    route.get('/me', verifyUser, (req, res, next) => {
        res.send(req.user)
    })

    route.get('/', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = await actions.find('user', UserModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
        try {
            const datas = await actions.get('user', UserModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    return route
}
