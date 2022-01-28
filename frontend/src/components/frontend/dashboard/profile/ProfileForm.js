import { Grid, Typography, TextField, InputLabel, Checkbox, Link, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
//import { deepOrange, grey } from '@mui/material/colors';
import React from 'react';
import { useFormik } from 'formik';
import withAuth from '../../../hoc/withAuth';
import { useHistory } from 'react-router-dom';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        notchedOutline: { 
            borderColor: '#B3B6B7 !important',
        },
        formContainer: {
            width: '100%',
            height: '500px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            '&:focus-visible': {
                outline: 'unset',
            },
        },
        modalContainer__button: {
            width: '50%',
            height: '4rem',
            color: '#707070!important',
        },
        modalContainer_active: {
            backgroundColor: '#F5F5F4!important',
            borderRadius: 'unset!important',
        },
        modalComponentContainer: {
            display: 'flex',
            justifyContent: 'center',
            "&>:nth-last-of-type(1)": {
                marginTop: '1rem',
                marginBottom: '1rem',
            },
        },
        modalInputContainer__input: {
            width: '85%',
        },
        modalButtonContainer: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2rem',
        },
        modalButtonContainer__connexion: {
            width: 'auto',
            height: 'auto',
            backgroundColor: '#56BB7E!important',
            borderRadius: '16px!important',
            color: 'white!important',
            textTransform: 'none!important',
            fontSize: '1.25rem!important',
            padding: '0.5rem 1.5rem!important',
            cursor: 'pointer',
        },
        inputLabel: {
            margin: theme.spacing(1, 0, 0, 0),
            fontWeight: 'bold',
            fontSize: 14,
            color: '#212121',
            cursor: 'pointer',
        },
        rememberAndForgotContainer: {
            marginLeft: '8% !important',
            width: '82.25% !important',
        },
        inputRememberMeContainer: {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            [`& label`]: {
                margin: theme.spacing(0, 0, 0, 1),
            },
        },
        forgotPassword: {
            color: '#F46E58',
            textDecoration: 'underline',
        }
    })
)

// Component
const ProfileForm = ({ }) => {
    const classes = useStyles();
    const history = useHistory();

    /*const handleSwitchToRegister = () => {
        handleClose();
        handleOpenRegister();
    }*/

    const formik = useFormik({
        onSubmit: async (values) => {
            return history.push('')
        }
    });

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <form className={classes.formContainer}>
                <Grid
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    container
                    className={classes.rememberAndForgotContainer}
                >
                    <div className={classes.inputRememberMeContainer}>
                        <InputLabel id="rememberMe" htmlFor="rememberMe" className={classes.inputLabel}>
                            Rester connecté
                        </InputLabel>
                    </div>
                    <Link href="/forgot-password">
                        <Typography variant="body1" className={classes.forgotPassword}>
                            Mot de passe oublié
                        </Typography>
                    </Link>
                </Grid>
                <Grid className={classes.modalButtonContainer}>
                    <Button type="submit" className={classes.modalButtonContainer__connexion}>Me connecter</Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default withAuth(ProfileForm)