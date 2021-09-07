import * as reducers from './ducks'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
const reducer = combineReducers( reducers );

// Save state to local storage
const saveState = () => {
    // const isLoggedIn = store.getState().user.login.loggedIn;

    try {
        // Persist all objects from storage store
        // localStorage.persistedStore = JSON.stringify({ isLoggedIn });
    } catch (err) {
        // Ignore errors
    }
};

// Load state from local storage
const loadState = () => {
    try {
        return {
            // user: {
            //     login: {
            //         loggedIn: JSON.parse(localStorage.persistedStore).isLoggedIn || undefined,
            //     },
            // }
        };
    } catch (err) {
        return {};
    }
};

// Create store
export const store = createStore(
    reducer,
    loadState(),
    compose(
        applyMiddleware(thunkMiddleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
);

// Subscribe to store
store.subscribe(saveState);