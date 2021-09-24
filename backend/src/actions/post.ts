import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializers/index'

module.exports = async (resource, model, req) => {
    let document = await mongooseAdapter.save(model, req.body.data)

    return jsonapiSerializer.serialize(resource, document.toObject())
}
