import { apiRequest, apiCleanRecord, apiResponse, setRecord, updateRecordProperty } from './actions';
import { defaultCallback } from "./utils"
import JSONAPIService from "../../../services/JSONAPIService";



const attachToRecord = (type, recordId, path, files) => {
    const service = new JSONAPIService(type);
    return (dispatch) => {
        dispatch(apiRequest());
        return service
            .rawUpload(recordId, path, files)
            .then((response) => dispatch(apiResponse(response)))
            .catch((error) => dispatch(apiResponse(error)));
    };
};


const connectApiCall = (method, callback = defaultCallback) => {
    return function (type) {
        const service = new JSONAPIService(type);
        const args = Array.prototype.slice.call(arguments, 1);
        return async (dispatch) => {
            dispatch(apiRequest());
            try {
                const response = await service[method](...args);
                dispatch(apiResponse(response.data));
                return callback(response, dispatch, type, args);
            } catch (error) {
                return dispatch(apiResponse(error));
            }
        };
    };
};


export const addRelated = connectApiCall("add_related");
export const createRecord = connectApiCall("create");
export const fetchRecord = connectApiCall("get");
export const indexRecords = connectApiCall("index");
export const indexRelatedRecords = connectApiCall("fetch_related");
export const rawDelete = connectApiCall("rawDelete");
export const rawPost = connectApiCall("rawPost");
export const updateRecord = connectApiCall("update");


const indexAll = (type, options = {}) => {
    const service = new JSONAPIService(type);
    return (dispatch) => {
        return service.index({ ...options, page: { size: 1 } }).then((response) => {
            const count = (response.data.meta.page.total);
            
            if (!count) {
                return [];
            }

            const size = options.page ? options.page.size || 100 : 100;
            const defaultNumberLimit = Math.ceil(count / size);
            const numberLimit = options.page
                ? options.page.number || defaultNumberLimit
                : defaultNumberLimit;
            const promises = [];
            for (let number = 1; number <= numberLimit; number += 1) {
                promises.push(
                    indexRecords(type, {
                        ...options,
                        page: { size, number },
                    })(dispatch)
                );
            }
            return Promise.all(promises).then((values) =>
                [].concat.apply([], values)
            );
        });
    };
};


const removeRecord = connectApiCall(
    "delete",
    (response, dispatch, type, args) => {
        dispatch(apiCleanRecord({ type, id: args[0] }));
        return null;
    }
);




export {
    attachToRecord,
    connectApiCall,
    indexAll,
    removeRecord,
    apiRequest,
    apiCleanRecord,
    apiResponse,
    setRecord,
    updateRecordProperty,
}