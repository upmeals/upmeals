import './App.scss';


import { Router } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import config from './config';
import { getMessages } from './i18n';
import history from './history';
import { initStore } from './store/ducks/init/operations'
import { IntlProvider } from 'react-intl';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import PropTypes from 'prop-types';
import React, { Suspense } from 'react';
import RoutedApp from './config/routes/middlewares/RoutedApp';
import ConfigProvider from './config/ConfigProvider';



const App = ({ initStore }) => {
    React.useEffect(() => {
        initStore();
    }, [initStore]);

    const title = config().title;
    React.useEffect(() => {
        document.title = title;
    }, [title]);

    return (
        <ConfigProvider>
            <MuiThemeProvider theme={config().theme}>
                <IntlProvider key={'fr'} locale={'fr'} messages={getMessages('fr')}>
                    <Router history={history}>
                        <Suspense
                            fallback={
                                <p>Loading...</p>
                            }
                        >
                            <RoutedApp routes={config().routes} />
                            {/* <CookieConsentBar /> */}
                        </Suspense>
                    </Router>
                </IntlProvider>
            </MuiThemeProvider>
        </ConfigProvider>
    );
};

App.propTypes = {
    initStore: PropTypes.func.isRequired,
    // contextError: PropTypes.bool, 
};

// const mapProps = ({ context: { error } }) => ({ contextError: error });
const mapDispatch = (dispatch) => bindActionCreators({ initStore }, dispatch);

export default connect(
    null,
    mapDispatch
)(App);