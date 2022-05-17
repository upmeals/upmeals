import _ from 'lodash'
import { gqlAuthGetCurrentUser } from '.';
import { setAuthCurrentUser, setAuthIsLoggedIn } from '../../../store/auth/operations'


export const baseCallback = async (response: any, type?: string) => {
    if (response.data === "") {
        return {
            error: "Empty data"
        };
    }
    const data = response.data[Object.keys(response.data)[0]]
    if (_.isUndefined(data)) {
        return {
            error: "Empty data"
        };
    }
    if (response.error) {
        return {
            error: response.error
        }
    }

    return { data }
}


export const requestPasswordResetCallback = async (response: any, type?: string) => {
    let { data } = await baseCallback(response, type)

    return { data, loading: false }
}


export const saveUserCallback = async (response: any, type?: string) => {
    let { data } = await baseCallback(response, type)

    setAuthCurrentUser(data)

    return { data, loading: false }
}

export const authCallback = async (response: any, type?: string) => {
    let { data } = await baseCallback(response, type)

    if (type === "logout") {
        await localStorage.removeItem('accessToken')
        await setAuthIsLoggedIn(false)
    } else {
        await localStorage.setItem('accessToken', data.access_token)
        await setAuthIsLoggedIn(true)
        await gqlAuthGetCurrentUser()
    }

    return { data, loading: false }
}

export const errorLoginCallback = async (error: any) => {
    if (error && error.message && error.message.includes('otp')) {
        error = "otp_missing"
    }

    return { error, loading: false }
}

export const errorRefreshCallback = async () => {
    await localStorage.removeItem('accessToken')
    await setAuthIsLoggedIn(false)

    return { error: 'Refresh token expired, user logged out !', loading: false }
}