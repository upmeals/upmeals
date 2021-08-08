import * as types from "./types";
import { createAction } from 'redux-actions'



export const loginRequest = createAction(types.LOGIN_REQUEST);
export const loginResponse = createAction(types.LOGIN_RESPONSE);
export const logout = createAction(types.LOGOUT);
export const fetchProfileRequest = createAction(types.FETCH_PROFILE_REQUEST);
export const fetchProfileResponse = createAction(types.FETCH_PROFILE_RESPONSE);
export const refreshTokenRequest = createAction(types.REFRESH_TOKEN_REQUEST);
export const refreshTokenResponse = createAction(types.REFRESH_TOKEN_RESPONSE);
export const updateProfileRequest = createAction(types.UPDATE_PROFILE_REQUEST);
export const updateProfileResponse = createAction(types.UPDATE_PROFILE_RESPONSE);