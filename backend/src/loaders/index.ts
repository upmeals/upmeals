import mongooseLoader from '@loaders/mongooseLoader'
import dependencyInjectorLoader from '@loaders/dependencyInjector'

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader()

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
}
