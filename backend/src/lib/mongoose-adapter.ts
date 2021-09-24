import async from 'async'
import _ from 'lodash'

let mongooseAdapter: any = {}

let buildCollectionQuery = (dbQuery, query) => {
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

mongooseAdapter.find = async (model, query) => {
    return await async.parallel({
        total: (cb) => {
            model.countDocuments(cb)
        },
        data: (cb) => {
            let dbQuery = model.find().lean()
            buildCollectionQuery(dbQuery, query)
            dbQuery.exec(cb)
        },
    })
}

mongooseAdapter.findByIds = async (model, ids, query) => {
    let conditions = {
        _id: {
            $in: ids,
        },
    }

    return await async.parallel({
        total: (cb) => {
            model.countDocuments(conditions).exec(cb)
        },
        data: (cb) => {
            let dbQuery = model.find(conditions).lean()
            buildCollectionQuery(dbQuery, query)
            dbQuery.exec(cb)
        },
    })
}

mongooseAdapter.findById = async (model, id, query) => {
    let dbQuery = model.findById(id).lean()

    // Select
    dbQuery.select(query.select)

    // Populate
    if (query.populate) {
        dbQuery.populate(query.populate)
    }

    return await dbQuery.exec()
}

mongooseAdapter.findByIdAndUpdate = async (model, id, body) => {
    let update = {}

    // Attributes
    Object.assign(update, body.attributes)

    // relationships
    _.forOwn(body.relationships, (value, key) => {
        if (_.isArray(value.data)) {
            update[key] = value.data.map((d) => {
                return d.id
            })
        } else {
            update[key] = value.data.id
        }
    })

    return await model.findByIdAndUpdate(id, update, {
        new: true,
    })
}

// TODO
mongooseAdapter.findRelationship = async (model, id, relationship, relationshipModel, query) => {
    let dbQuery = model.findById(id).lean()

    dbQuery.exec(async (err, document) => {
        let relationshipId = document[relationship]

        // To many relationship
        if (_.isArray(relationshipId)) {
            return await mongooseAdapter.findByIds(relationshipModel, relationshipId, query)
        }
        // To one relationship
        else {
            return await mongooseAdapter.findById(relationshipModel, relationshipId, query)
        }
    })
}

mongooseAdapter.updateRelationship = async (model, id, relationship, data) => {
    let update = {}

    if (_.isArray(data)) {
        update[relationship] = data.map((d) => {
            return d.id
        })
    } else {
        update[relationship] = data.id
    }

    return await model.findByIdAndUpdate(id, update, {
        new: true,
    })
}

// TODO
mongooseAdapter.createRelationship = async (model, id, relationship, data) => {
    return await model.findById(id, (err, result) => {
        result[relationship] = _.concat(
            result[relationship],
            data.map((d) => {
                return d.id
            }),
        )

        return result.save()
    })
}

// TODO
mongooseAdapter.deleteRelationship = async (model, id, relationship, data) => {
    return await model.findById(id, (err, result) => {
        result[relationship] = _.difference(
            result[relationship].toString(),
            data.map((d) => {
                return d.id
            }),
        )

        return result.save()
    })
}

mongooseAdapter.save = async (model, body) => {
    let newObject = {}

    // Attributes
    Object.assign(newObject, body.attributes)

    // Relationships
    _.forOwn(body.relationships, (value, key) => {
        if (_.isArray(value.data)) {
            newObject[key] = value.data.map((d) => {
                return d.id
            })
        } else {
            newObject[key] = value.data.id
        }
    })

    // Save
    let doc = new model(newObject)
    return await doc.save()
}

export default mongooseAdapter
