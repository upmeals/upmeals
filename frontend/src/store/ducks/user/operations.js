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
    const service = new JSONAPIService('users')
    return async (dispatch) => {
        dispatch(loginRequest())
        try {
            const response = await service['rawPost'](
                'register/',
                '',
                {
                    email: options.email,
                    password: options.password
                },
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
    const service = new JSONAPIService('users')
    return async (dispatch) => {
        dispatch(loginRequest())
        try {
            const response = await service['rawPost'](
                'login/',
                '',
                {
                    username: options.email,
                    password: options.password
                },
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