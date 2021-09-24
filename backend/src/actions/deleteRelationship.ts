import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializers/index'
import _ from 'lodash'

export default async (resource, model, req) => {
    let document = await mongooseAdapter.deleteRelationship(
        model,
        req.params.id,
        req.params.relationship,
        req.body.data,
    )

    let serializedData = jsonapiSerializer.serialize(resource, document.toObject())

    // serialized relationship
    var serializedRelationship = serializedData.data.relationships[req.params.relationship]

    // Response
    var response: any = {}
    response.jsonapi = serializedData.jsonapi
    // Meta
    if (_.isArray(serializedRelationship.data)) {
        response.meta = {
            count: serializedRelationship.data.length,
        }
    }
    // Links + data
    _.assign(response, serializedRelationship)

    return response
}
