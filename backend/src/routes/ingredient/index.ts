import actions from '@actions/index'
import Ingredient from '@models/ingredient'
import Recipe from '@models/recipe'
import { Request, Response, Router } from 'express'

const route = Router()

export default (): Router => {
    route.get('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.find('ingredients', Ingredient, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.post('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.post('ingredients', Ingredient, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('ingredients', Ingredient, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.patch('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('ingredients', Ingredient, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.patch('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.patch('ingredients', Ingredient, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id/recipies', async (req: Request, res: Response) => {
        try {
            const datas = await actions.findRelationship(
                'ingredients',
                Ingredient,
                'ingredients',
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
