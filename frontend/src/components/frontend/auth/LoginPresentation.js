import { defineMessages, FormattedMessage, injectIntl } from 'react-intl';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import LoginForm from './LoginForm';
import { Typography } from '@material-ui/core';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
    })
)

// Component texts
const i18n = defineMessages({
    x: {
        id: 'x',
        defaultMessage: 'x.'
    }
})

// Component
const LoginPresentation = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            className={classes.loginFormContainer}
        >
            Présentation
        </Grid>
    )
}

export default injectIntl(LoginPresentation)