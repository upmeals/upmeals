import auth from '@routes/auth'
import ingredient from '@routes/ingredient'
import recipe from '@routes/recipe'
import user from '@routes/user'
import { Router } from 'express'

export default () => {
    const app = Router()

    app.use('/auth', auth())
    app.use('/users', user())
    app.use('/ingredients', ingredient())
    app.use('/recipies', recipe())

    return app
}
