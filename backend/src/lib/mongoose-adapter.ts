import async from 'async'
import _ from 'lodash'

let mongooseAdapter: any = {}

let buildCollectionQuery = function (dbQuery, query) {
    // Select
    dbQuery.select(query.select)

    // Sort
    dbQuery.sort(query.sort)

    // Pagination
    if (query.page) {
        dbQuery.skip(query.page.skip)
        dbQuery.limit(query.page.limit)
    }

    // Populate
    if (query.populate) {
        dbQuery.populate(query.populate)
    }
}

mongooseAdapter.find = async function (model, query) {
    return await async.parallel({
        total: function (cb) {
            model.countDocuments(cb)
        },
        data: function (cb) {
            let dbQuery = model.find().lean()
            buildCollectionQuery(dbQuery, query)
            dbQuery.exec(cb)
        },
    })
}

mongooseAdapter.findByIds = async function (model, ids, query) {
    let conditions = {
        _id: {
            $in: ids,
        },
    }

    return await async.parallel({
        total: function (cb) {
            model.countDocuments(conditions).exec(cb)
        },
        data: function (cb) {
            let dbQuery = model.find(conditions).lean()
            buildCollectionQuery(dbQuery, query)
            dbQuery.exec(cb)
        },
    })
}

mongooseAdapter.findById = async function (model, id, query) {
    let dbQuery = model.findById(id).lean()

    // Select
    dbQuery.select(query.select)

    // Populate
    if (query.populate) {
        dbQuery.populate(query.populate)
    }

    return await dbQuery.exec()
}

mongooseAdapter.findByIdAndUpdate = function (model, id, body, callback) {
    let update = {}

    // Attributes
    Object.assign(update, body.attributes)

    // relationships
    _.forOwn(body.relationships, function (value, key) {
        if (_.isArray(value.data)) {
            update[key] = value.data.map(function (d) {
                return d.id
            })
        } else {
            update[key] = value.data.id
        }
    })

    model.findByIdAndUpdate(
        id,
        update,
        {
            new: true,
        },
        callback,
    )
}

mongooseAdapter.findRelationship = function (
    model,
    id,
    relationship,
    relationshipModel,
    query,
    callback,
) {
    let dbQuery = model.findById(id).lean()

    dbQuery.exec(function (err, document) {
        let relationshipId = document[relationship]

        // To many relationship
        if (_.isArray(relationshipId)) {
            mongooseAdapter.findByIds(relationshipModel, relationshipId, query, callback)
        }
        // To one relationship
        else {
            mongooseAdapter.findById(relationshipModel, relationshipId, query, callback)
        }
    })
}

mongooseAdapter.updateRelationship = function (model, id, relationship, data, callback) {
    let update = {}

    if (_.isArray(data)) {
        update[relationship] = data.map(function (d) {
            return d.id
        })
    } else {
        update[relationship] = data.id
    }

    model.findByIdAndUpdate(
        id,
        update,
        {
            new: true,
        },
        callback,
    )
}

mongooseAdapter.createRelationship = function (model, id, relationship, data, callback) {
    model.findById(id, function (err, result) {
        result[relationship] = _.concat(
            result[relationship],
            data.map(function (d) {
                return d.id
            }),
        )

        result.save(callback)
    })
}

mongooseAdapter.deleteRelationship = function (model, id, relationship, data, callback) {
    model.findById(id, function (err, result) {
        result[relationship] = _.difference(
            result[relationship].toString(),
            data.map(function (d) {
                return d.id
            }),
        )

        result.save(callback)
    })
}

mongooseAdapter.save = function (model, body, callback) {
    let newObject = {}

    // Attributes
    Object.assign(newObject, body.attributes)

    // Relationships
    _.forOwn(body.relationships, function (value, key) {
        if (_.isArray(value.data)) {
            newObject[key] = value.data.map(function (d) {
                return d.id
            })
        } else {
            newObject[key] = value.data.id
        }
    })

    // Save
    let doc = new model(newObject)
    doc.save(callback)
}

export default mongooseAdapter
