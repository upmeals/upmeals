import { Grid, Typography, TextField, InputLabel, Checkbox, Link, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import withAuth from '../../../hoc/withAuth';
import { useHistory } from 'react-router-dom';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        formContainer: {
            width: '100%',
            height: '75vh',
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
            fontFamily: 'Jost!important',
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
            fontFamily: 'Jost!important',
            padding: '0.5rem 1.5rem!important',
        },
        inputLabel: {
            margin: theme.spacing(1, 0, 0, 0),
            fontWeight: 'bold',
            fontSize: 14,
            color: '#212121',
        },
        rememberAndForgotContainer: {
            margin: theme.spacing(2, 0, 2, 0),
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
            color: '#5138EE',
            fontSize: 14,
            fontWeight: 700,
        }
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
const LoginForm = ({ login }) => {
    const classes = useStyles();
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await login(
                {
                    email: values.email,
                    password: values.password
                }
            )

            return history.push('/dashboard')
        }
    });

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
                <Grid>
                    <Button href="?register=true" className={`${classes.modalContainer__button} ${classes.modalContainer_active}`}>Inscription</Button>
                    <Button href="?login=true" className={classes.modalContainer__button}>Connexion</Button>
                </Grid>
                <Grid>
                    <Grid className={classes.modalComponentContainer}>
                        <TextField
                            id="login_email"
                            name="email"
                            label="Identifiant"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            className={classes.modalInputContainer__input}
                        />
                    </Grid>
                    <Grid className={classes.modalComponentContainer}>
                        <TextField
                            id="login_password"
                            name="password"
                            type="password"
                            label="Mot de passe"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            className={classes.modalInputContainer__input}
                            autoComplete="on"
                        />
                    </Grid>
                </Grid>
                <Grid
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    container
                    className={classes.rememberAndForgotContainer}
                >
                    <div className={classes.inputRememberMeContainer}>
                        <Checkbox
                            onChange={formik.handleChange}
                            id="rememberMe"
                            name="rememberMe"
                            type="checkbox"
                            color="primary"
                            size="medium"
                        />
                        <InputLabel id="rememberMe" htmlFor="rememberMe" className={classes.inputLabel}>
                            Remember Me
                        </InputLabel>
                    </div>
                    <Link href="/forgot-password">
                        <Typography variant="body1" className={classes.forgotPassword}>
                            Forgot password ?
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

export default withAuth(LoginForm)