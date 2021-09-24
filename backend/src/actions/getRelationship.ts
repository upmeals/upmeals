import mongooseAdapter from '@lib/mongoose-adapter'
import jsonapiSerializer from '@serializers/index'
import jsonApiMongoParser from '@serializers/jsonapiMongoParser'
import _ from 'lodash'

export default async (resource, model, relationship, req) => {
    // Query
    let document = await mongooseAdapter.findById(
        model,
        req.params.id,
        jsonApiMongoParser.parse(resource, req.query),
    )
    // Serialize
    let serializedData = jsonapiSerializer.serialize(resource, document)

    // serialized relationship
    let serializedRelationship = serializedData.data.relationships[relationship]

    // Response
    let response: any = {}
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
