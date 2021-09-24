import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializer/index'
import jsonApiMongoParser from '@serializer/jsonapiMongoParser'

export default async function (resource, model, req) {
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
