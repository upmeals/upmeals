import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Login from './auth/Login';
import LoginPresentation from './auth/LoginPresentation'


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        mainText: {
            color: theme.palette.black,
            fontSize: '32px',
            marginTop: '100px',
            marginBottom: '32px',
        },
        reactLogo: {
            width: '256px',
            marginBottom: '32px'
        },
        presentationContainer: {
            background: '#4F37E8',
            height: '100vh',
        }
    })
)

// Component texts
const i18n = defineMessages({
    frontendIntro: {
        id: 'frontend.intro',
        defaultMessage: 'Voici une simple application exemple avec react, redux, api, tests & plus.'
    }
})

// Component
const Frontend = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                lg={6}
                item
            >
                <Login />
            </Grid>
            <Grid
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                item
                lg={6}
                className={classes.presentationContainer}
            >
                <LoginPresentation />
            </Grid>
        </Grid>
    )
}

export default injectIntl(Frontend)