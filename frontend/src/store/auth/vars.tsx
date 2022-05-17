import { makeVar } from '@apollo/client';
import { otpObject } from '../../interfaces/Otp';


export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));
export const currentUserVar = makeVar<object>({});
export const otpVar = makeVar<otpObject>({ otpauth_url: '', secret: '' })