import { createAction, handleActions } from 'redux-actions';
import { combineReducers } from 'redux';



const initStoreStart = createAction('@INIT_STORE_START');
const initStoreDone = createAction('@INIT_STORE_DONE');
const loadSettings = createAction('@LOAD_SETTINGS');




export const initStore = () => {
    return async dispatch => {
        dispatch(initStoreStart());
        // await Api calls ?
        // pass it into loadSettings
        // await refreshTokenIfSet()(dispatch);
        // const service = new JSONAPIService('settings');
        // const settingsResponse = await service.index();
        dispatch(loadSettings());
        dispatch(initStoreDone());
    };
};

const reduceSettings = (state, action) => {
    if (!action.error && action.payload) {
        return action.payload.data.data[0].attributes;
    }
    return null;
};




export default combineReducers({
    initialized: handleActions(
        {
            [initStoreStart]: () => false,
            [initStoreDone]: () => true,
        },
        false
    ),
    settings: handleActions(
        {
            [loadSettings]: reduceSettings,
        },
        {}
    ),
});