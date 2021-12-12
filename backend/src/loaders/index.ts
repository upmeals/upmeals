import config from '@config/index'
import recepiesSeeder from '@loaders/recepiesSeeder'
import ingredientsSeeder from '@loaders/ingredientsSeeder'
import expressLoader from '@loaders/express'
import mongooseLoader from '@loaders/mongooseLoader'
import Ingredient from '@models/ingredient'
import Recepe from '@models/recepe'

export default async ({ expressApp }) => {
    await mongooseLoader()

    require('@strategies/jwtStrategy')
    require('@strategies/localStrategy')

    if (config.env != 'production') {
        if ((await Ingredient.find()).length == 0) {
            await ingredientsSeeder()
        }
        if ((await Recepe.find()).length == 0) {
            await recepiesSeeder()
        }
    }

    await expressLoader({ app: expressApp })
}
