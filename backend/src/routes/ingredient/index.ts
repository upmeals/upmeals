import actions from '@actions/index'
import IngredientModel from '@models/ingredient'
import RecepeModel from '@models/recepe'
import { Request, Response, Router } from 'express'

const route = Router()

export default (): Router => {
    route.get('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.find('ingredient', IngredientModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.post('/', async (req: Request, res: Response) => {
        try {
            const datas = await actions.post('ingredient', IngredientModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('ingredient', IngredientModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.patch('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.get('ingredient', IngredientModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.patch('/:id', async (req: Request, res: Response) => {
        try {
            const datas = await actions.patch('ingredient', IngredientModel, req)

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    route.get('/:id/recepies', async (req: Request, res: Response) => {
        try {
            const datas = await actions.findRelationship(
                'ingredient',
                IngredientModel,
                'ingredient',
                'recepe',
                RecepeModel,
                req,
            )

            res.status(200).send(datas)
        } catch (error) {
            res.status(404).send({ success: false, error: error.message })
        }
    })

    return route
}
