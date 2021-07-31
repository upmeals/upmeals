import * as actions from "./actions"
import * as utils from "./utils"
import _ from 'lodash'
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";



/**
 * 
 * {
 *     requested: bool,
 *     pendingRequests: integer,
 *     entities: object,
 * }
 * 
 */



export default combineReducers({
    requested: handleActions(
        {
            [actions.apiRequest]: () => true,
            [actions.apiResponse]: () => false,
        },
        false
    ),
    pendingRequests: handleActions(
        {
            [actions.apiRequest]: (state) => state + 1,
            [actions.apiResponse]: (state) => Math.max(state - 1, 0),
        },
        0
    ),
    entities: handleActions(
        {
            [actions.apiResponse]: utils.storeRecords,
            [actions.apiCleanRecord]: utils.cleanRecord,
            [actions.setRecord]: utils.storeRecords,
            [actions.updateRecordProperty]: (state, action) => _.merge(state, action.payload),
          },
          {}
    )
})