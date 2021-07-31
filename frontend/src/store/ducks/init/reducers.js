import * as actions from "./actions"
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { reduceSettings } from './utils'



/**
 * State Shape
 * 
 * {
 *     initialized: bool,
 *     error: bool,
 *     settings: object
 * }
 * 
 */



export default combineReducers({
    initialized: handleActions(
        {
            [actions.initStoreStart]: () => false,
            [actions.initStoreDone]: () => true,
        },
        false
    ),
    error: handleActions(
        {
            [actions.initStoreDone]: (state, action) => Boolean(action.error) 
        },
        false
    ),
    settings: handleActions(
        {
            [actions.loadSettings]: reduceSettings
        },
        {}
    )
})