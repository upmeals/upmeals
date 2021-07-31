import { initStoreStart, initStoreDone, loadSettings } from './actions';
// import JSONAPIService from "../../../services/JSONAPIService";


const initStore = () => {
    return async (dispatch) => {
        try {
            dispatch(initStoreStart());
            // const result = await refreshTokenIfSet()(dispatch);
            // await setupApp(result)(dispatch);
            dispatch(initStoreDone());
        } catch (error) {
            // reportError(error);
            // sentry.reportError(error);
            dispatch(initStoreDone(error));
        }
    };
}


const setupApp = (includeProtected) => {
    return async (dispatch) => {
        // Load user settings from api
        // const service = new JSONAPIService("settings");
        // const settingsResponse = await service.index();
        // dispatch(loadSettings(settingsResponse));
        // if (includeProtected) {
        //   dispatch(
        //     indexAll("roles", { include: ["permissions", "requires_permission"] })
        //   );
        // }
    }
}



export {
    initStore,
    initStoreStart,
    initStoreDone,
    loadSettings,
    setupApp,
}