import { TextField, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React from 'react';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup'
import { useHistory } from 'react-router-dom';
import { gqlAuthRequestPasswordReset } from '../../../services/gql/Auth';
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
    email: yup
        .string()
        .email("L'email est invalide.")
        .required("L'email est requis."),
})


const ForgotPasswordForm = () => {
    const classes = useStyles()
    const history = useHistory()
    
    const isLoggedIn = GetAuthIsLoggedIn()

    return (
        <Formik
            initialValues={{
                email: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                await gqlAuthRequestPasswordReset({ email: values.email })

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
                            id="email"
                            name="email"
                            label="Email"
                            className={classes.textFieldContainer}
                            value={formikProps.values.email}
                            onChange={formikProps.handleChange}
                            error={formikProps.touched.email && Boolean(formikProps.errors.email)}
                            helperText={formikProps.touched.email && formikProps.errors.email}
                        />
                        <Button className={classes.buttonContainer} color="primary" variant="contained" type="submit">
                            Request password change
                        </Button>
                    </form>
                )
            }
        </Formik>
    )
}


export default ForgotPasswordForm