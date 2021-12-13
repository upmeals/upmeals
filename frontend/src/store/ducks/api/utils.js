import _ from 'lodash'
import { Factory } from "../../../models";



const defaultCallback = (response) => {
    if (response.data === "") {
        return response;
    }
    const data = _.get(response, "data.data");
    if (_.isUndefined(data)) {
        return null;
    }
    const result = Array.isArray(data) ? data.map(({ id }) => id) : data.id;
    if (response.data.meta) {
        result.recordCount = response.data.meta.totalPage;
    }
    if (response.data.links) {
        result.next = response.data.links.next;
        result.prev = response.data.links.prev;
        result.first = response.data.links.first;
        result.last = response.data.links.last;
        result.self = response.data.links.self;
    }

    return result;
};


const insertOrUpdateRecord = (state, record) => {
    const { id, type } = record;
    const newState = _.cloneDeep(state);
    const preparedRecord = Factory.createRecord(record, newState);
    if (!state[type]) {
        newState[type] = { [id]: preparedRecord };
    } else if (!state[type][id]) {
        newState[type][id] = preparedRecord;
    } else {
        const customizer = (objValue, srcValue) => {
            if (_.isArray(objValue) || _.isObject(objValue)) {
                return srcValue;
            }
        };
        newState[type][id] = _.mergeWith(
            newState[type][id],
            preparedRecord,
            customizer
        );
    }
    return newState;
};


const storeRecords = (state, action) => {
    if (!action.error) {
        let { data, included = [] } = action.payload;
        if (!data) {
            data = action.payload;
        }
        let newState = included
            ? included.reduce(insertOrUpdateRecord, state)
            : _.cloneDeep(state);
        if (Array.isArray(data)) {
            newState = data.reduce(insertOrUpdateRecord, newState);
        } else if (typeof data === "object") {
            newState = insertOrUpdateRecord(newState, data);
        }
        // update relationships
        _.map(newState, (records) => {
            _.map(records, (record) => {
                _.map(record.relationships, (related, relation) => {
                    const attribute = _.camelCase(relation);
                    if (_.isUndefined(related.data)) {
                        delete record.relationships[relation];
                    } else if (related.data === null) {
                        record[attribute] = null;
                    } else if (_.isArray(related.data)) {
                        record[attribute] = _.map(related.data, (item) =>
                            _.get(
                                newState,
                                `${item.type}.${item.id}`,
                                Factory.createRecord(item)
                            )
                        );
                    } else {
                        record[attribute] = _.get(
                            newState,
                            `${related.data.type}.${related.data.id}`,
                            Factory.createRecord(related.data)
                        );
                    }
                });
            });
        });
        return newState;
    }
    return _.cloneDeep(state);
};


const findRecord = (state, { id, type }) => {
    return (state[type] || {})[id];
};


const cleanRecord = (state, action) => {
    const newState = { ...state };
    const record = findRecord(state, action.payload);
    if (typeof record !== "undefined" && record) {
        delete newState[record.type][record.id];
    }
    return newState;
};



export {
    cleanRecord,
    defaultCallback,
    findRecord,
    insertOrUpdateRecord,
    storeRecords,
}