import * as types from "./types";
import { createAction } from 'redux-actions'
import _ from "lodash";



export const apiRequest = createAction(types.API_REQUEST);
export const apiCleanRecord = createAction(types.API_CLEAN_RECORD);
export const apiResponse = createAction(types.API_RESPONSE);
export const setRecord = createAction(types.API_SET_RECORD_MANUAL);
export const updateRecordProperty = createAction(
    types.API_UPDATE_RECORD_PROPERTY,
    (key, value = false) => (value ? _.set({}, key, value) : key)
);