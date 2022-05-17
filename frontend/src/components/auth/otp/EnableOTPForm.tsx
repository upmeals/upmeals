import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup'
import { Typography, Button, TextField, Grid } from '@mui/material';
import QRCode from 'react-qr-code'
import { GetAuthOtp } from '../../../store/auth';
import { gqlAuthEnableTfa, gqlAuthGetCurrentUser } from '../../../services/gql/Auth';
import { SnackbarKey, useSnackbar } from 'notistack';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        enableOTPFormContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start !important',
            alignItems: 'center !important',
            flexDirection: 'column !important' as any,
            flexWrap: 'wrap',
        },
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
        formSecret: {
            margin: '16px 0px 0px 0px !important',
        },
        textFieldContainer: {
            width: '100%',
            margin: theme.spacing(2, 0, 2, 0) + '!important',
        },
        buttonContainer: {
            width: '125px',
            marginTop: '8px !important',
            marginLeft: '16px !important',
        },
    })
)


const validationSchema = yup.object({
    otp: yup
        .string()
        .required("L'OTP est requis.")
})


interface EnableOTPFormProps {
    handleClose: any,
}


const EnableOTPForm = ({ handleClose }: EnableOTPFormProps) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const classes = useStyles()

    const otp = GetAuthOtp()

    useEffect(() => {
        if (otp.secret === '' || otp.otpauth_url === '') {
            handleClose()
        }
    }, [otp, handleClose])


    const notifySuccess = () => {
        return enqueueSnackbar("L'OTP est bien activé !", {
            variant: 'success',
            autoHideDuration: 3000,
            action
        })
    }

    const notifyError = () => {
        return enqueueSnackbar("Il y a eu une erreur lors de l'activation de l'OTP", {
            variant: 'error',
            autoHideDuration: 3000,
            action
        })
    }


    const action = (key: SnackbarKey | undefined) => (
        <>
            <Button
                variant="contained"
                color="primary"
                onClick={() => { closeSnackbar(key) }}
            >
                Close
            </Button>
        </>
    )


    return (
        <Grid container className={classes.enableOTPFormContainer}>
            <Typography className={classes.formTitle}>Scan the code in your authenticator app to finish setting up 2FA</Typography>
            <QRCode value={otp.otpauth_url} />
            <Typography className={classes.formSecret}>{otp.secret}</Typography>
            <Formik
                initialValues={{
                    otp: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    let response = await gqlAuthEnableTfa({ otp: values.otp, secret: otp.secret })

                    if (response && response.data === true) {
                        await gqlAuthGetCurrentUser()
                        notifySuccess()
                        handleClose()
                    } else {
                        notifyError()
                        handleClose()
                    }
                }}
            >
                {
                    (formikProps: FormikProps<FormikValues>) => (
                        <>
                            <form className={classes.formContainer} onSubmit={formikProps.handleSubmit} >
                                <TextField
                                    id="otp"
                                    name="otp"
                                    label="One-Time Password"
                                    type="text"
                                    autoComplete="otp"
                                    className={classes.textFieldContainer}
                                    value={formikProps.values.otp}
                                    onChange={formikProps.handleChange}
                                    error={formikProps.touched.otp && Boolean(formikProps.errors.otp)}
                                    helperText={formikProps.touched.otp && formikProps.errors.otp}
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
                                        Done
                                    </Button>
                                </Grid>
                            </form>
                        </>
                    )
                }
            </Formik>
        </Grid>
    )
}



export default EnableOTPForm