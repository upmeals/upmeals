import * as reducers from './ducks'
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Reducers
const reducer = combineReducers( reducers );

// Save state to local storage
const saveState = () => {
    const { language, storage } = store.getState();
    try {
        localStorage.selectedLanguage = language;
        // Persist all objects from storage store
        localStorage.persistedStore = JSON.stringify(storage);
    } catch (err) {
        // Ignore errors
    }
};

// Load state from local storage
const loadState = () => {
    const languages = window.navigator.languages.filter(
        language => language === 'en' || language === 'fr'
    );
    const language = languages.length ? languages[0] : 'en';
    try {
        return {
            language,
            storage: JSON.parse(localStorage.persistedStore) || undefined,
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