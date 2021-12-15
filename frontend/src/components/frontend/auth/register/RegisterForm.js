import { Grid, TextField, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
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
    })
)

const validationSchema = yup.object({
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

// Component texts
// const i18n = defineMessages({
//     x: {
//         id: 'x',
//         defaultMessage: 'x.'
//     }
// })

// Component
const RegisterForm = ({ register, handleOpenLogin, handleClose }) => {
    const classes = useStyles();
    const history = useHistory();
    
    const handleSwitchToRegister = () => {
        handleClose();
        handleOpenLogin();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await register(
                {
                    email: values.email,
                    password: values.password
                }
            )
            return history.push('/command')
        }
    },
    );

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
                <Grid>
                    <Button className={classes.modalContainer__button}>Inscription</Button>
                    <Button onClick={handleSwitchToRegister} className={`${classes.modalContainer__button} ${classes.modalContainer_active}`}>Connexion</Button>
                </Grid>
                <Grid>
                    <Grid className={classes.modalComponentContainer}>
                        <TextField
                            id="register_email"
                            name="email"
                            label="Identifiant"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            placeholder="Identifiant ou email"
                            className={classes.modalInputContainer__input}
                            InputProps={ {
                                classes: {
                                    notchedOutline: classes.notchedOutline,
                                },
                            } }
                        />
                    </Grid>
                    <Grid className={classes.modalComponentContainer}>
                        <TextField
                            id="register_password"
                            name="password"
                            type="password"
                            label="Mot de passe"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            placeholder="Min. 8 character"
                            className={classes.modalInputContainer__input}
                            autoComplete="on"
                            InputProps={ {
                                classes: {
                                    notchedOutline: classes.notchedOutline,
                                },
                            } }
                        />
                    </Grid>
                </Grid>
                <Grid className={classes.modalButtonContainer}>
                    <Button type="submit" className={classes.modalButtonContainer__connexion}>
                        Créer mon compte
                    </Button>
                </Grid>
            </form>
        </Grid>
    )
}

export default withAuth(RegisterForm)