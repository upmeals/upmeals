import { apiRequest, apiCleanRecord, apiResponse, setRecord, updateRecordProperty } from './actions';
import { defaultCallback } from "./utils"
import JSONAPIService from "../../../services/JSONAPIService";


// add a file to a record
const attachToRecord = (type, recordId, path, files) => {
    // create service
    const service = new JSONAPIService(type);
    // dispatch request
    return (dispatch) => {
        dispatch(apiRequest());
        return service
            .rawUpload(recordId, path, files)
            .then((response) => dispatch(apiResponse(response)))
            .catch((error) => dispatch(apiResponse(error)));
    };
};


// create a request to the api with JSONAPIService and use the redux store afterwards.
// build api call for the corresponding method
const connectApiCall = (method, callback = defaultCallback) => {
    // when function is called pass in resource as type
    return function (type) {
        // create service
        const service = new JSONAPIService(type);
        // pass arguments in args
        const args = Array.prototype.slice.call(arguments, 1);

        // execute request
        return async (dispatch) => {
            //dispatch apirequest
            dispatch(apiRequest());
            try {
                // dispatch request to httpservice
                const response = await service[method](...args);
                // dispatch response
                dispatch(apiResponse(response.data));
                // execute callback
                return callback(response, dispatch, type, args);
            } catch (error) {
                // dispatch error
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


// index every records of a resource
const indexAll = (type, options = {}) => {
    // create service for resource (type)
    const service = new JSONAPIService(type);
    return (dispatch) => {
        // execute an index (authGet) request to the API
        return service.index({ ...options, page: { size: 1 } }).then((response) => {

            // get the number of pages
            const count = (response.data.meta.count);
            
            // if no pages return nothing
            if (!count) {
                return [];
            }

            // set the correct number of items per page
            const size = options.page ? options.page.size || 100 : 100;
            // set the maximum number of pages to fetch
            const defaultNumberLimit = Math.ceil(count / size);

            // set the number of pages to fetch following options or the maximum
            const numberLimit = options.page
                ? options.page.number || defaultNumberLimit
                : defaultNumberLimit;
            
            // prepare the array of promises (multiple pages to fetch ?)
            const promises = [];

            // for each page fetch records
            for (let number = 1; number <= numberLimit; number += 1) {
                promises.push(
                    indexRecords(type, {
                        ...options,
                        page: { size, number },
                    })(dispatch)
                );
            }

            // return records
            return Promise.all(promises).then((values) =>
                [].concat.apply([], values)
            );
        });
    };
};


// delete a record from a resource
const removeRecord = connectApiCall(
    // call api to delete record
    "delete",
    // callback to delete record from store
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