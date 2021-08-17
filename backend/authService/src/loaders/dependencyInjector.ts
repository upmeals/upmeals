import { Container } from 'typedi'

export default ({
    mongoConnection,
    models,
}: {
    mongoConnection
    models: { name: string; model: any }[]
}) => {
    try {
        models.forEach(m => {
            Container.set(m.name, m.model)
        })
    } catch (e) {
        throw e
    }
}
