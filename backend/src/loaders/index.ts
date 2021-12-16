import config from '@config/index'
import expressLoader from '@loaders/express'
import ingredientsSeeder from '@loaders/ingredientsSeeder'
import mongooseLoader from '@loaders/mongooseLoader'
import recipiesSeeder from '@loaders/recipiesSeeder'
import Ingredient from '@models/ingredient'
import User from '@models/user'
import Recipe from '@models/recipe'

export default async ({ expressApp }) => {
    await mongooseLoader()

    require('@strategies/jwtStrategy')
    require('@strategies/localStrategy')

    if (config.env != 'production' && (await User.find()).length > 0) {
        if ((await Ingredient.find()).length == 0) {
            await ingredientsSeeder()
        }
        if ((await Recipe.find()).length == 0) {
            await recipiesSeeder()
        }
    }

    await expressLoader({ app: expressApp })
}
