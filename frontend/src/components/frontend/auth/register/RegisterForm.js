import { Grid, TextField, InputLabel, Button } from '@mui/material';
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
            marginTop: theme.spacing(3),
            width: '100%',
        },
        formControl: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        registerButton: {
            background: '#5138EE !important',
            padding: `${theme.spacing(2, 1)} !important`,
            margin: `${theme.spacing(3, 0)} !important`,
            borderRadius: `32px !important`,
            fontWeight: 'bold !important',
            fontSize: `14px !important`,
            color: 'white !important',
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
            borderRadius: '32px !important',
            [`& fieldset`]: {
                borderRadius: 32,
                borderColor: '#dddddd',
            },
            [`& input`]: {
                padding: theme.spacing(2, 3),
                boxShadow: '0 0 0px 1000px #ffffff inset !important',
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
            margin: theme.spacing(6, 0, 2, 0),
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
                content: `"Sign in with  an Email"`,
                fontFamily: 'Poppins, sans-serif'
            },
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
const RegisterForm = ({ register }) => {
    const classes = useStyles();
    const history = useHistory();

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

            return history.push('/dashboard')
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
            <div className={classes.delimiterContainer} />
            <form onSubmit={formik.handleSubmit} className={classes.formContainer}>
                <div>
                    <InputLabel id="email" className={classes.inputLabel}>
                        Email*
                    </InputLabel>
                    <TextField
                        fullWidth
                        id="register_email"
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
                        id="register_password"
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
                <Button color="primary" variant="contained" fullWidth type="submit" className={classes.registerButton}>
                    register
                </Button>
            </form>
        </Grid>
    )
}

export default withAuth(RegisterForm)