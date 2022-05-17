import { otpObject } from '../../interfaces/Otp'
import { isLoggedInVar, currentUserVar, otpVar } from './vars'



export const setAuthIsLoggedIn = (value : boolean) => {
    isLoggedInVar(value)
}

export const setAuthCurrentUser = (currentUser : object) => {
    currentUserVar(currentUser)
}

export const setAuthOtp = (otpObject: otpObject) => {
    otpVar(otpObject)
}



const operations = {
    setAuthIsLoggedIn,
    setAuthCurrentUser,
    setAuthOtp,
}

export default operations