import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializers/index'

export default async (resource, model, req) => {
    let document = await mongooseAdapter.updateRelationship(
        model,
        req.params.id,
        req.params.relationship,
        req.body.data,
    )

    return jsonapiSerializer.serialize(resource, document.toObject())
}
