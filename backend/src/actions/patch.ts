import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializers/index'

export default async (resource, model, req) => {
    let document = await mongooseAdapter.findByIdAndUpdate(model, req.params.id, req.body.data)

    return jsonapiSerializer.serialize(resource, document.toObject())
}
