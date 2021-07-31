/* Store must be loaded before everything else */
import { store } from './store/index.js';

// eslint-disable-next-line
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';


render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);