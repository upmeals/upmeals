import * as types from "./types";
import { createAction } from 'redux-actions'



export const initStoreStart = createAction(types.INIT_STORE_START)
export const initStoreDone = createAction(types.INIT_STORE_DONE)
export const loadSettings = createAction(types.LOAD_SETTINGS)