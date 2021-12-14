import mongooseAdapter from '@lib/mongoose-adapter'
import Pagination from '@lib/pagination'
import jsonapiSerializer from '@serializers/index'
import jsonApiMongoParser from '@serializers/jsonapiMongoParser'
import _ from 'lodash'

export default async (resource, model, relationship, relationshipType, relationshipModel, req) => {
    // Default pagination
    let defaultPagination = {
        offset: 0,
        limit: 50,
    }

    req.query.page = req.query.page || defaultPagination

    let results = await mongooseAdapter.findRelationship(
        model,
        req.params.id,
        relationship,
        relationshipModel,
        jsonApiMongoParser.parse(relationshipType, req.query),
    )

    let extraOptions = {
        self: req.originalUrl,
    }

    // To many relationships
    if (results) {
        // Pagination links
        let pagination = new Pagination(req.query.page, results.total)
        let paginationLinks = pagination.getLinks(req.originalUrl)

        // Extra options
        extraOptions = _.assign(
            extraOptions,
            {
                count: results.length,
            },
            _.pick(pagination, ['total', 'totalPage', 'number', 'size', 'offset', 'limit']),
            _.pick(paginationLinks, ['self', 'first', 'last', 'prev', 'next']),
        )
    }

    return jsonapiSerializer.serialize(relationshipType, results, extraOptions)
}
