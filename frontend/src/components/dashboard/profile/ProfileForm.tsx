import { TextField, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React from 'react';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup';
import { gqlAuthLogin } from '../../../services/gql/Auth';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'wrap',
            padding: theme.spacing(4),
            minWidth: 400,
            boxSizing: 'border-box !important' as any,
        },
        textFieldContainer: {
            width: '100%',
            margin: theme.spacing(0, 0, 2, 0) + '!important',
        },
        buttonContainer: {
            width: '100%',
        }
    })
)


const validationSchemaBasic = yup.object({
    email: yup
        .string()
        .email("L'email est invalide.")
        .required("L'email est requis."),
    password: yup
        .string()
        .min(8, "Le mot de passe doit avoir au minimum 8 caractères.")
        .required("Le mot de passe est requis.")
})

const validationSchemaOtp = yup.object({
    email: yup
        .string()
        .email("L'email est invalide.")
        .required("L'email est requis."),
    password: yup
        .string()
        .min(8, "Le mot de passe doit avoir au minimum 8 caractères.")
        .required("Le mot de passe est requis."),
    otp: yup
        .string()
        .required("L'OTP est requis.")
})


const LoginForm = () => {
    const classes = useStyles()
    const history = useHistory()

    const [isOtpNecessary, setIsOtpNecessary] = React.useState(false)

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                otp: '',
            }}
            validationSchema={isOtpNecessary ? validationSchemaOtp : validationSchemaBasic}
            onSubmit={async (values) => {
                let response = await gqlAuthLogin({
                    email: values.email,
                    password: values.password,
                    otp: values.otp
                })

                if (response && response.error) {
                    if (response.error === 'otp_missing') {
                        setIsOtpNecessary(true)
                    }
                } else {
                    history.push('/command')
                }
            }}
        >
            {
                (formikProps: FormikProps<FormikValues>) => (
                    <form className={classes.formContainer} onSubmit={formikProps.handleSubmit} >
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            className={classes.textFieldContainer}
                            value={formikProps.values.email}
                            onChange={formikProps.handleChange}
                            error={formikProps.touched.email && Boolean(formikProps.errors.email)}
                            helperText={formikProps.touched.email && formikProps.errors.email}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            className={classes.textFieldContainer}
                            value={formikProps.values.password}
                            onChange={formikProps.handleChange}
                            error={formikProps.touched.password && Boolean(formikProps.errors.password)}
                            helperText={formikProps.touched.password && formikProps.errors.password}
                        />
                        {
                            isOtpNecessary && (
                                <TextField
                                    id="otp"
                                    name="otp"
                                    label="One-Time Password"
                                    type="otp"
                                    className={classes.textFieldContainer}
                                    value={formikProps.values.otp}
                                    onChange={formikProps.handleChange}
                                    error={formikProps.touched.otp && Boolean(formikProps.errors.otp)}
                                    helperText={formikProps.touched.otp && formikProps.errors.otp}
                                />
                            )
                        }
                        <Button className={classes.buttonContainer} color="primary" variant="contained" type="submit">
                            Sign In
                        </Button>
                    </form>
                )
            }
        </Formik>
    )
}


export default LoginForm