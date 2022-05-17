import React, { useEffect } from 'react'
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { Formik, FormikValues, FormikProps } from 'formik';
import * as yup from 'yup'
import { Typography, Button, TextField, Grid } from '@mui/material';
import { gqlAuthDisableTfa, gqlAuthGetCurrentUser } from '../../../services/gql/Auth';
import { SnackbarKey, useSnackbar } from 'notistack';
import { GetAuthCurrentUser } from '../../../store/auth';
import { GetInitIsAppReady } from '../../../store/init';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        enableOTPFormContainer: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start !important',
            alignItems: 'flex-start !important',
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
            margin: '0px 0px 8px 0px !important',
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


interface DisableOTPFormProps {
    handleClose: any,
}


const DisableOTPForm = ({ handleClose }: DisableOTPFormProps) => {
    const classes = useStyles()
    
    const currentUser = GetAuthCurrentUser()
    const isAppReady = GetInitIsAppReady()

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    useEffect(() => {
        if (isAppReady && currentUser && currentUser.tfa_secret === null) {
            handleClose()
        }
    }, [currentUser, isAppReady, handleClose])


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

    const handleSuccess = () => {
        return enqueueSnackbar("L'OTP est bien désactivé !", {
            variant: 'success',
            autoHideDuration: 3000,
            action
        })
    }

    const handleError = () => {
        return enqueueSnackbar("Il y a eu une erreur lors de la désactivation de l'OTP", {
            variant: 'error',
            autoHideDuration: 3000,
            action
        })
    }

    return (
        <Grid container className={classes.enableOTPFormContainer}>
            <Typography className={classes.formTitle}>Enter your OTP to disable TFA</Typography>
            <Formik
                initialValues={{
                    otp: '',
                }}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    let response = await gqlAuthDisableTfa({ otp: values.otp })

                    if (response && response.data === true) {
                        await gqlAuthGetCurrentUser()
                        handleSuccess()
                        handleClose()
                    } else {
                        handleError()
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



export default DisableOTPForm