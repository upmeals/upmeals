import { verifyUser } from '@src/authenticate'
import { Router } from 'express'

const route = Router()

export default (): Router => {
    route.use('/user', route)

    route.get('/me', verifyUser, (req, res, next) => {
        res.send(req.user)
    })

    return route
}
