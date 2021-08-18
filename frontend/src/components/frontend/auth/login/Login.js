// import { defineMessages, injectIntl } from 'react-intl';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import LoginForm from './LoginForm';
import { Typography } from '@material-ui/core';
// import withAuth from '../../hoc/withAuth';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        loginFormContainer: {
            width: '60%',
        },
        loginSectionTitle: {
            fontWeight: 700,
            fontSize: 28,
            margin: theme.spacing(5, 0, 2, 0),
        },
        loginSectionSubtitle: {
            fontWeight: 500,
            fontSize: 16,
            color: "#909090",
            margin: theme.spacing(0, 0, 5, 0),
        },
        appLogo: {
            margin: theme.spacing(6, 0, 5, 0),
        }
    })
)

// Component texts                
// const i18n = defineMessages({    
//     x: {                         
//         id: 'x',                
//         defaultMessage: 'x.'   
//     }                                
// })                             

// Component
const Login = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            className={classes.loginFormContainer}
        >
            <img src="/logos/app_logo.png" alt="app logo" width="48px" height="48px" className={classes.appLogo} />
            <Grid>
                <Typography variant="h3" className={classes.loginSectionTitle}>
                    Login
                </Typography>
                <Typography variant="h6" className={classes.loginSectionSubtitle}>
                    See your growth and get consulting support!
                </Typography>
            </Grid>
            <LoginForm />
        </Grid>
    )
}

export default Login