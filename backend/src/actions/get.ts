import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializers/index'
import jsonApiMongoParser from '@serializers/jsonapiMongoParser'

export default async (resource, model, req) => {
    let document = await mongooseAdapter.findById(
        model,
        req.params.id,
        jsonApiMongoParser.parse(resource, req.query),
    )

    let extraOptions = {
        self: req.originalUrl,
    }

    return jsonapiSerializer.serialize(resource, document, extraOptions)
}
