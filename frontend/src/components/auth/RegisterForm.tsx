import { TextField, Button, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import React from 'react';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup'
import { gqlAuthRegister } from '../../services/gql/Auth';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        textFieldContainer: {
            width: '100%',
            margin: theme.spacing(0, 0, 2, 0) + '!important',
        },
        buttonContainer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        formBtn: {
            width: '45%',
            height: '52px',
            borderRadius: '6px !important',
        },
        formBtnSecondary: {
            width: '45%',
            height: '52px',
            borderRadius: '6px !important',
            opacity: '.8',
        }
    })
)


const validationSchema = yup.object({
    email: yup
        .string()
        .email("L'email est invalide.")
        .required("L'email est requis."),
    password: yup
        .string()
        .min(8, "Le mot de passe doit avoir au minimum 8 caractères.")
        .required("Le mot de passe est requis."),
    confirm_password: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Les mots de passes doivent être les mêmes.')
})


const RegisterForm = () => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirm_password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                if (values.password === values.confirm_password) {
                    await gqlAuthRegister({
                        email: values.email,
                        password: values.password
                    })

                    history.push('/command')
                }
            }}
        >
            {
                (formikProps: FormikProps<FormikValues>) => (
                    <form onSubmit={formikProps.handleSubmit} >
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
                        <Grid className={classes.buttonContainer}>
                            <Button
                                className={classes.formBtn}
                                variant="contained"
                                color="primary"
                                type='submit'
                            >
                                Submit
                            </Button>
                            <Button 
                                onClick={() => { history.push('/')}}
                                className={classes.formBtnSecondary} 
                                color="primary" 
                                variant="contained"
                            >
                                Signed up ?
                            </Button>
                        </Grid>
                    </form>
                )
            }
        </Formik>
    )
}


export default RegisterForm