import { Grid, Button, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { Theme } from '@mui/system';
import { useHistory } from 'react-router-dom';


// Component classes
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: '100vh',
        },
        title: {
            margin: `${theme.spacing(2, 0)} !important`,
        },
        button: {
            margin: `${theme.spacing(1, 0)} !important`,
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
    const history = useHistory()

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
                href="/command"
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Dashboard
            </Button>
            <Button
                onClick={() => { history.push({search:'modal=login'}) }}
                className={classes.button}
                variant="contained"
                color="primary"
            >
                Login
            </Button>
            <Button
                onClick={() => { history.push({search:'modal=register'}) }}
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