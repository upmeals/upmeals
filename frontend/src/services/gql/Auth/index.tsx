import { connectGQLQuery } from '../utils'
import {
    QueryLogin,
    QueryRegister,
    QueryRequestPasswordReset,
    QueryApplyPasswordReset,
    GenerateTfa,
    EnableTfa,
    DisableTfa,
} from '../../../interfaces/Queries'
import GQLAuth from './service'
import { authCallback, errorRefreshCallback, saveUserCallback, requestPasswordResetCallback, errorLoginCallback } from './callbacks'


const service = new GQLAuth()


// pure auth
export const gqlAuthLogin = ({ email, password, otp }: QueryLogin) => connectGQLQuery(service, "login", { email, password, otp }, (response: any) => authCallback(response, "login"), errorLoginCallback)
export const gqlAuthRefresh = () => connectGQLQuery(service, "refresh", {}, authCallback, errorRefreshCallback)
export const gqlAuthLogout = () => connectGQLQuery(service, "logout", {}, (response: any) => authCallback(response, "logout"))
export const gqlAuthRegister = ({ email, password }: QueryRegister) => connectGQLQuery(service, "register", { email, password })
// fetch user
export const gqlAuthGetCurrentUser = () => connectGQLQuery(service, "me", {}, saveUserCallback)
// password reset
export const gqlAuthRequestPasswordReset = ({ email } : QueryRequestPasswordReset) => connectGQLQuery(service, "requestPasswordReset", { email }, requestPasswordResetCallback)
export const gqlAuthApplyPasswordReset = ({ token, password } : QueryApplyPasswordReset) => connectGQLQuery(service, "applyPasswordReset", { token, password })
// otp
export const gqlAuthGenerateTfa = ({ password } : GenerateTfa) => connectGQLQuery(service, "generateTfa", { password })
export const gqlAuthEnableTfa = ({ otp, secret } : EnableTfa) => connectGQLQuery(service, "enableTfa", { otp, secret })
export const gqlAuthDisableTfa = ({ otp } : DisableTfa) => connectGQLQuery(service, "disableTfa", { otp })


const exports = {
    gqlAuthLogin,
    gqlAuthRefresh,
    gqlAuthLogout,
    gqlAuthRegister,
    gqlAuthGetCurrentUser,
    gqlAuthGenerateTfa,
    gqlAuthEnableTfa,
    gqlAuthDisableTfa
}


export default exports