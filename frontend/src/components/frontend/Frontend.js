import { Grid, Button, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ModalLogin from './auth/login/ModalLogin';


// Component classes
const useStyles = makeStyles(theme =>
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
    const [openLogin, setOpenLogin] = React.useState(false)
    const handleOpenLogin = () => {
        setOpenLogin(true)
        history.push({search:'login=true'})
    }
    
    useEffect(() => {
        if (history.location.search === '?login=true') {
            handleOpenLogin()
        }
        // eslint-disable-next-line
    }, [])

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
                onClick={handleOpenLogin}
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
            <ModalLogin
                open={openLogin}
                setOpenLogin={setOpenLogin}
            />
        </Grid>
    )
}

export default Frontend