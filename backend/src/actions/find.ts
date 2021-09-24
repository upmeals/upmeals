import mongooseAdapter from '@lib/mongoose-adapter'
import Pagination from '@lib/pagination'
import jsonapiSerializer from '@serializers/index'
import jsonApiMongoParser from '@serializers/jsonapiMongoParser'
import _ from 'lodash'

export default async (resource, model, req) => {
    // Default pagination
    let defaultPagination = {
        offset: 0,
        limit: 50,
    }

    req.query.page = req.query.page || defaultPagination

    // Query
    let documents = await mongooseAdapter.find(model, jsonApiMongoParser.parse(resource, req.query))

    // Pagination links
    let pagination = new Pagination(req.query.page, documents.total)
    let paginationLinks = pagination.getLinks(req.originalUrl)

    // Extra options
    let extraOptions = _.assign(
        {
            count: documents.data.length,
        },
        _.pick(pagination, ['total', 'totalPage', 'number', 'size', 'offset', 'limit']),
        _.pick(paginationLinks, ['self', 'first', 'last', 'prev', 'next']),
    )

    // Serialize
    return jsonapiSerializer.serialize(resource, documents.data, extraOptions)
}
