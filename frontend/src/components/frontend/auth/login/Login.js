import { Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import LoginForm from './LoginForm';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        loginFormContainer: {
            width: '100%',
            padding: '0px 25%',
        },
        loginSectionTitle: {
            fontWeight: `700 !important`,
            fontSize: `42px !important`,
            margin: `${theme.spacing(2, 0, 2, 0)} !important`,
        },
        loginSectionSubtitle: {
            fontWeight: `500 !important`,
            fontSize: `16px !important`,
            color: "#909090 !important",
            margin: `theme.spacing(0, 0, 5, 0) !important`,
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
            <a href="/">
                <img src="/logos/app_logo.png" alt="app logo" width="48px" height="48px" className={classes.appLogo} />
            </a>
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