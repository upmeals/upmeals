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
import { Factory } from "../../../models";
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

const refreshTokenIfSet = (callback = defaultCallback) => {
    if (localStorage.getItem('token')) {
        const service = new JSONAPIService('users')
        return async (dispatch) => {
            dispatch(refreshTokenRequest())
            try {
                const response = await service['rawPost'](
                    'refreshToken/',
                    '',
                    {},
                    {},
                )

                dispatch(loginResponse(response.data))
                return callback(response)
            } catch (e) {
                return dispatch(loginResponse(e))
            }
        }
    }
}




export {
    register,
    login,
    logoutUser,
    fetchProfile,
    updateProfile,
    refreshTokenIfSet
}