import actions from '@actions/index'
import Ingredient from '@models/ingredient'
import Recipe from '@models/recipe'
import User from '@models/user'
import { Request, Response, Router } from 'express'

const route = Router()

export default (): Router => {
    route.get('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.find('recipies', Recipe, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.post('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.post('recipies', Recipe, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('recipies', Recipe, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.patch('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('recipies', Recipe, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.patch('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.patch('recipies', Recipe, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id/ingredients', async (req: Request, res: Response) => {
        try {
            const datas = await actions.findRelationship(
                'recipies',
                Recipe,
                'ingredients',
                'ingredients',
                Ingredient,
                req,
            )

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id/author', async (req: Request, res: Response) => {
        try {
            const datas = await actions.findRelationship(
                'recipies',
                Recipe,
                'author',
                'users',
                User,
                req,
            )

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    return route
}
