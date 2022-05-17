import React from 'react'
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup'
import { Typography, Button, TextField, Grid } from '@mui/material';
import { gqlAuthGenerateTfa } from '../../../services/gql/Auth';
import { useHistory } from 'react-router-dom';
import { setAuthOtp } from '../../../store/auth/operations';



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
        formTitle: {
            margin: '0px 0px 16px 0px !important',
        },
        textFieldContainer: {
            width: '100%',
            margin: theme.spacing(0, 0, 2, 0) + '!important',
        },
        buttonContainer: {
            width: '125px',
            marginTop: '8px !important',
            marginLeft: '16px !important',
        }
    })
)


const validationSchema = yup.object({
    password: yup
        .string()
        .min(8, "Le mot de passe doit avoir au minimum 8 caractères.")
        .required("Le mot de passe est requis.")
})


interface GenerateOTPFormProps {
    handleClose: any,
}


const GenerateOTPForm = ({ handleClose }: GenerateOTPFormProps) => {
    const classes = useStyles()
    const history = useHistory()

    return (
        <Formik
            initialValues={{
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
                let response = await gqlAuthGenerateTfa({ 
                    password: values.password 
                })

                if (response.data && response.data.otpauth_url) {
                    setAuthOtp({ 
                        otpauth_url: response.data.otpauth_url, 
                        secret: response.data.secret 
                    })
                    history.push({ search: '?modal=enableotp' })
                } else {
                    handleClose()
                }
            }}
        >
            {
                (formikProps: FormikProps<FormikValues>) => (
                    <>
                        <Typography className={classes.formTitle}>Enter your password to enable Two-Factor Authentication</Typography>
                        <form className={classes.formContainer} onSubmit={formikProps.handleSubmit} >
                            <TextField
                                id="password"
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="password"
                                className={classes.textFieldContainer}
                                value={formikProps.values.password}
                                onChange={formikProps.handleChange}
                                error={formikProps.touched.password && Boolean(formikProps.errors.password)}
                                helperText={formikProps.touched.password && formikProps.errors.password}
                            />
                            <Grid
                                container
                                display="flex"
                                justifyContent="flex-end"
                                alignItems="flex-start"
                                flexDirection="row"
                            >
                                <Button className={classes.buttonContainer} color="secondary" variant="contained" onClick={handleClose}>
                                    Cancel
                                </Button>
                                <Button className={classes.buttonContainer} color="primary" variant="contained" type="submit">
                                    Next
                                </Button>
                            </Grid>
                        </form>
                    </>
                )
            }
        </Formik>
    )
}



export default GenerateOTPForm