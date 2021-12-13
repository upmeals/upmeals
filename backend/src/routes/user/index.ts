import actions from '@actions/index'
import { verifyUser } from '@lib/authenticate'
import Recipe from '@models/recipe'
import User from '@models/user'
import { Request, Response, Router } from 'express'

const route = Router()

export default (): Router => {
    route.get('/me', verifyUser, (req, res) => {
        res.send(req.user)
    })

    route.get('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.find('users', User, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('users', User, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id/recipies', async (req: Request, res: Response) => {
        try {
            const datas = await actions.findRelationship(
                'users',
                User,
                'users',
                'recipies',
                Recipe,
                req,
            )

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    return route
}
