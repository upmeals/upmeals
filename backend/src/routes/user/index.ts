import actions from '@actions/index'
import { verifyUser } from '@lib/authenticate'
import recipeModel from '@models/recipe'
import UserModel from '@models/user'
import { Request, Response, Router } from 'express'

const route = Router()

export default (): Router => {
    route.get('/me', verifyUser, (req, res) => {
        res.send(req.user)
    })

    route.get('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.find('people', UserModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('people', UserModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id/recipies', async (req: Request, res: Response) => {
        try {
            const datas = await actions.findRelationship(
                'people',
                UserModel,
                'poeple',
                'recipe',
                recipeModel,
                req,
            )

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    return route
}
