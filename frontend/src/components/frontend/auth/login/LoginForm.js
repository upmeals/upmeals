// import { defineMessages, injectIntl } from 'react-intl';
import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import withAuth from '../../../hoc/withAuth';
import { useHistory } from 'react-router-dom';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        formContainer: {
            marginTop: theme.spacing(3),
            width: '100%',
        },
        formControl: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        googleButton: {
            background: '#ffffff',
            padding: theme.spacing(2, 1),
            margin: theme.spacing(2, 0),
            borderRadius: 32,
            border: '1px solid #dddddd',
            boxShadow: 'none',
            textTransform: 'none',
            fontWeight: 800,
            fontSize: 15,
            [`&:hover`]: {
                background: "#fdfdfd",
            }
        },
        googleLogo: {
            marginRight: theme.spacing(2),
        },
        loginButton: {
            background: '#5138EE',
            padding: theme.spacing(2, 1),
            margin: theme.spacing(1, 0),
            borderRadius: 32,
            fontWeight: 'bold',
            fontSize: 14,
            color: 'white',
            textTransform: 'capitalize',
        },
        inputLabel: {
            margin: theme.spacing(1, 0, 0, 0),
            fontWeight: 'bold',
            fontSize: 14,
            color: '#212121',
        },
        inputText: {
            margin: theme.spacing(2, 0),
            boxSizing: 'border-box',
            [`& fieldset`]: {
                borderRadius: 32,
                borderColor: '#dddddd',
            },
            [`& input`]: {
                padding: theme.spacing(2, 3),
            },
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
        },
        presentationContainer: {
            background: '#4F37E8',
            height: '100vh',
        },
        delimiterContainer: {
            zIndex: 5,
            width: '100%',
            background: '#cccccc',
            color: '#bbbbbb',
            height: 1,
            margin: theme.spacing(3, 0),
            position: 'relative',
            '&::after': {
                zIndex: 10,
                background: 'white',
                position: 'absolute',
                textAlign: 'center',
                height: 32,
                top: -11,
                padding: theme.spacing(0, 3),
                left: '50%',
                marginLeft: -103.175,
                content: `"or Sign in with Email"`,
                fontFamily: 'Poppins, sans-serif'
            },
        },
        notRegisteredYet: {
            margin: theme.spacing(3, 0, 0, 0),
        },
        createAnAccount: {
            margin: theme.spacing(0, 0, 0, 1),
            fontWeight: 'bold',
            color: '#5138EE',
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
            {/* <Button variant="contained" fullWidth type="submit" className={classes.googleButton}>
                <img src="/logos/google_logo.png" alt="Google logo bouton de connexion" width="24px" height="24px" className={classes.googleLogo} />
                Sign in with Google
            </Button>
            <div className={classes.delimiterContainer} /> */}
            <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
                <div>
                    <InputLabel id="email" className={classes.inputLabel}>
                        Email*
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="login_email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                        variant="outlined"
                        placeholder="mail@website.com"
                        className={classes.inputText}
                    />
                </div>
                <div>
                    <InputLabel id="password" className={classes.inputLabel}>
                        Password*
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="login_password"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        variant="outlined"
                        placeholder="Min. 8 character"
                        className={classes.inputText}
                        autoComplete="on"
                    />
                </div>
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
                <Button color="primary" variant="contained" fullWidth type="submit" className={classes.loginButton}>
                    Login
                </Button>
                <Grid
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    container
                    className={classes.notRegisteredYet}
                >
                    <Typography>
                        Not registered yet ?
                    </Typography>
                    <Link href="/register">
                        <Typography className={classes.createAnAccount}>
                            Create an Account
                        </Typography>
                    </Link>
                </Grid>
            </form>
        </Grid>
    )
}

export default withAuth(LoginForm)