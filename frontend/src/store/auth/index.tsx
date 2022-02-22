import { useQuery } from "@apollo/client"
import { CURRENT_USER, IS_LOGGED_IN, OTP } from "./types"



export function GetAuthIsLoggedIn () {
    const { data } = useQuery(IS_LOGGED_IN);
    return data.isLoggedIn
}

export function GetAuthCurrentUser () {
    const { data } = useQuery(CURRENT_USER)
    return data.currentUser
}

export function GetAuthOtp () {
    const { data } = useQuery(OTP)
    return data.otp
}


const exports = {
    GetAuthIsLoggedIn,
    GetAuthCurrentUser,
    GetAuthOtp,
}


export default exports