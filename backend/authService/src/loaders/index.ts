import mongooseLoader from '@loaders/mongooseLoader'
import dependencyInjectorLoader from '@loaders/dependencyInjector'
import expressLoader from '@loaders/express'

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader()

    require("@strategies/jwtStrategy")
    require("@strategies/localStrategy")   

    const models = [
        {
            name: 'userModel',
            model: require('@models/user').default,
        },
    ]

    await dependencyInjectorLoader({
        mongoConnection,
        models,
    })

    await expressLoader({ app: expressApp })
}
