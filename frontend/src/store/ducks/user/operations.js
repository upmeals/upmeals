import {
    loginRequest,
    loginResponse,
    logout,
    fetchProfileRequest,
    fetchProfileResponse,
    refreshTokenRequest,
    // updateProfileRequest,
    // updateProfileResponse,
} from './actions';
import {
    defaultCallback,
} from './utils'
import JSONAPIService from "../../../services/JSONAPIService";



const fetchProfile = (callback = defaultCallback) => {
    const service = new JSONAPIService('users')
    return async (dispatch) => {
        dispatch(fetchProfileRequest())
        try {
            const response = await service['get'](
                'me',
                '',
            )

            dispatch(fetchProfileResponse(response.data))

            return callback(response)
        } catch (error) {
            return dispatch(fetchProfileResponse(undefined))
        }
    }
}

// const updateProfile = () => {

// }

const register = (options, callback = defaultCallback) => {
    const service = new JSONAPIService('auth')
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
            await fetchProfile()(dispatch);

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
                '',
                {
                    username: options.email,
                    password: options.password
                },
                options.options ? options.options : {},
            )

            dispatch(loginResponse(response.data))
            await fetchProfile()(dispatch);

            return callback(response)
        } catch (error) {
            return dispatch(loginResponse(error))
        }
    }
}

const logoutUser = (options, callback = defaultCallback) => {
    const service = new JSONAPIService('auth')
    return async (dispatch) => {
        dispatch(logout())
        try {
            const response = await service['rawPost'](
                'logout/',
                '',
                {},
                options.options ? options.options : {},
            )
            localStorage.removeItem('token')
            return callback(response)
        } catch (error) {
            return
        }
    }
}

const refreshTokenIfSet = (callback = defaultCallback) => {
    let token = localStorage.getItem('token')
    if (token) {
        const service = new JSONAPIService('auth')
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
    // updateProfile,
    refreshTokenIfSet
}