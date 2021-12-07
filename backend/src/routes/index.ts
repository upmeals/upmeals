import auth from '@routes/auth'
import user from '@routes/user'
import ingredient from '@routes/ingredient'
import recepe from '@routes/recepe'
import { Router } from 'express'

export default () => {
    const app = Router()
    
    app.use('/auth', auth())
    app.use('/users', user())
    app.use('/ingredients', ingredient())
    app.use('/recepies', recepe())

    return app
}
