import { 
    loginRequest, 
    loginResponse, 
    logout, 
    fetchProfileRequest, 
    fetchProfileResponse, 
    refreshTokenRequest, 
    refreshTokenResponse, 
    updateProfileRequest, 
    updateProfileResponse,
} from './actions';
import {
    defaultCallback,
} from './utils'
import JSONAPIService from "../../../services/JSONAPIService";


const register = (options, callback = defaultCallback) => {
    const service = new JSONAPIService('auth')
    return async (dispatch) => {
        dispatch(loginRequest())
        try {
            const response = await service['rawPost'](
                'register/',
                options.id,
                options.payload,
                options.options ? options.options : {},
            )
            dispatch(loginResponse(response.data))
            return callback(response)
        } catch (error) {
            return dispatch(loginResponse(error))
        }
    }
}

const login = (options, callback = defaultCallback) => {
    const service = new JSONAPIService('auth')
    return async (dispatch) => {
        dispatch(loginRequest())
        try {
            const response = await service['rawPost'](
                'login/',
                options.id,
                options.payload,
                options.options ? options.options : {},
            )
            dispatch(loginResponse(response.data))
            return callback(response)
        } catch (error) {
            return dispatch(loginResponse(error))
        }
    }
}

const logoutUser = () => {

}

const fetchProfile = () => {

}

const updateProfile = () => {

}

const refreshToken = () => {

}




export {
    register,
    login,
    logoutUser,
    fetchProfile,
    updateProfile,
    refreshToken
}