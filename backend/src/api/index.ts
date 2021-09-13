import auth from '@routes/auth'
import user from '@routes/user'
import { Router } from 'express'

export default () => {
    const app = Router()
    
    app.use('/auth', auth())
    app.use('/users', user())

    return app
}
