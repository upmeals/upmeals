import { TextField, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React from 'react';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup'
import { useHistory } from 'react-router-dom';
import { gqlAuthApplyPasswordReset } from '../../../services/gql/Auth';
import { GetAuthIsLoggedIn } from '../../../store/auth';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'wrap',
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


const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, "Le mot de passe doit avoir au minimum 8 caractères.")
        .required("Le mot de passe est requis."),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Les mots de passes doivent être les mêmes.')
})


interface ResetPasswordFormProps {
    token: string | null
}


const ResetPasswordForm = ({ token } : ResetPasswordFormProps) => {
    const classes = useStyles()
    const history = useHistory()
    
    const isLoggedIn = GetAuthIsLoggedIn()

    return (
        <Formik
            initialValues={{
                password: '',
                confirm_password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                await gqlAuthApplyPasswordReset({
                    token: token as string,
                    password: values.password
                })

                if (isLoggedIn) {
                    history.push('/command')
                } else {
                    history.push('/login')
                }
            }}
        >
            {
                (formikProps: FormikProps<FormikValues>) => (
                    <form className={classes.formContainer} onSubmit={formikProps.handleSubmit} >
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
                        <TextField
                            id="confirm_password"
                            name="confirm_password"
                            label="Confirm password"
                            type="password"
                            className={classes.textFieldContainer}
                            value={formikProps.values.confirm_password}
                            onChange={formikProps.handleChange}
                            error={formikProps.touched.confirm_password && Boolean(formikProps.errors.confirm_password)}
                            helperText={formikProps.touched.confirm_password && formikProps.errors.confirm_password}
                        />
                        <Button className={classes.buttonContainer} color="primary" variant="contained" type="submit">
                            Sign In
                        </Button>
                    </form>
                )
            }
        </Formik>
    )
}


export default ResetPasswordForm