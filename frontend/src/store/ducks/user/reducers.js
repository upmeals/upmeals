import * as actions from "./actions"
import * as utils from "./utils"
// import _ from 'lodash'
import { combineReducers } from "redux";
import { handleActions } from "redux-actions";



/**
 * {
 *     login: {
 *         pending: bool,
 *         loggedIn: bool,
 *     },
 *     profile: {
 *         requested: bool,
 *         updating: bool,
 *         data: object,
 *     },
 *     confirmEmail: {
 *         requested: bool,
 *         token: string,
 *     },
 * }
 */



const loginReducer = combineReducers({
    pending: handleActions(
        {
            [actions.loginRequest]: () => true,
            [actions.loginResponse]: () => false,
        },
        false
    ),
    loggedIn: handleActions(
        {
            [actions.loginResponse]: (_, action) => (action && action.payload && action.payload.success) ? true : false, 
            [actions.logout]: () => false,
        }, 
        false
    )
})

const profileReducer = combineReducers({
    requested: handleActions(
        {        
            [actions.fetchProfileRequest]: () => true,
            [actions.fetchProfileResponse]: () => false,
            [actions.loginRequest]: () => true,
            [actions.loginResponse]: () => false
        }, 
        false
    ),
    updating: handleActions(
        {        
            [actions.updateProfileRequest]: () => true,
            [actions.updateProfileResponse]: () => false,
        }, 
        false
    ),
    data: handleActions(
        {
            [actions.fetchProfileResponse]: () => {},
            [actions.updateProfileResponse]: () => {},
            [actions.logout]: () => {},
        }, 
        {}
    )
})

const refreshTokenReducer = combineReducers({
    requested: handleActions(
        {
            [actions.refreshTokenRequest]: () => true,
            [actions.refreshTokenResponse]: () => false,
            [actions.loginRequest]: () => true,
            [actions.loginResponse]: () => false
        },
        false
    ),
    token: handleActions(
        {
            [actions.loginResponse]: (_, action) => (action && action.payload && action.payload.token) ? action.payload.token : null, 
            [actions.refreshTokenResponse]: () => null,
            [actions.logout]: () => null,
        },
        null
    )
})


export default combineReducers({
    login: loginReducer,
    profile: profileReducer,
    refreshToken: refreshTokenReducer,
})