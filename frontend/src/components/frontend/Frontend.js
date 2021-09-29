// import { defineMessages, injectIntl } from 'react-intl';
import createStyles from '@material-ui/core/styles/createStyles';
import { Typography } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        container: {
            height: '100vh',
        },
        title: {
            margin: theme.spacing(2, 0),
        },
        button: {
            margin: theme.spacing(1, 0),
        }
    })
)

// Component texts
// const i18n = defineMessages({
//     frontendIntro: {
//         id: 'frontend.intro',
//         defaultMessage: 'Voici une simple application exemple avec react, redux, api, tests & plus.'
//     }
// })

// Component
const Frontend = () => {
    const classes = useStyles()

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.container}
        >
            <Typography className={classes.title}>Page d'accueil</Typography>
            <Button
                href="/dashboard"
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Dashboard
            </Button>
            <Button
                href="/login"
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Login
            </Button>
            <Button
                href="/register"
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Register
            </Button>
        </Grid>
    )
}

export default Frontend