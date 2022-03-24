import React from 'react'
import { Typography, Grid, Link } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import ForgotPasswordForm from './ForgotPasswordForm';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        requestPageContainer: {
            height: '100vh',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            overflowY: 'hidden',
        },
        requestPageHeader: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
        },
        requestPageLogo: {
            color: '#0053F2 !important',
            margin: theme.spacing(2, 1),
        },
        requestPageTitle: {
            marginTop: '2px !important',
            fontWeight: '700 !important',
            fontSize: '24px !important',
        },
        miniHeaderContainer: {
            position: 'absolute',
            top: 0,
            height: 100,
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'row',
        },
        requestContainer: {
            marginTop: '100px',
            height: 'calc(100vh - 200px)',
            width: '500px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column !important' as any,
        },
        requestTitle: {
            fontWeight: '700 !important',
            fontSize: '54px !important',
            marginBottom: theme.spacing(4) + '!important',
            textAlign: 'left',
        },
        formContainer: {
            width: '100%',
            marginBottom: theme.spacing(4),
        },
        requestLink: {
            color: 'black !important',
            textDecorationColor: 'black !important',
            marginLeft: theme.spacing(1) + '!important',
            transition: '0.2s',
            '&:hover': {
                textDecorationColor: 'grey !important',
                color: 'grey !important',
            }
        },
        leftSideContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
        },
        rightSideContainer: {
            position: 'relative',
            height: '100vh',
            background: '#0053F2',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        },
        discoverContainer: {
            width: '500px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column !important' as any,
        },
        discoverTitle: {
            color: 'white !important',
            fontWeight: '500 !important',
            margin: theme.spacing(0, 0, 4, 0) + '!important',
        },
        discoverContent: {
            color: 'white !important',
            fontWeight: '500 !important',
        },
        rightImageOne: {
            zIndex: 2,
            position: 'absolute',
            bottom: '75px',
            left: '-75px',
        },
        rightImageTwo: {
            zIndex: 2,
            position: 'absolute',
            top: '15px',
            right: '60px',
        },
        rectangle1: {
            position: 'absolute',
            top: '25px',
            left: '-40px',
            width: '130px',
            filter: 'invert(76%) sepia(72%) saturate(1559%) hue-rotate(337deg) brightness(103%) contrast(114%)',
        },
        rectangle2: {
            position: 'absolute',
            top: '40px',
            left: '110px',
            width: '70px',
            filter: 'invert(76%) sepia(95%) saturate(295%) hue-rotate(341deg) brightness(101%) contrast(101%)',
        },
        rectangle3: {
            position: 'absolute',
            bottom: '35px',
            left: '-25px',
            width: '150px',
            filter: 'invert(76%) sepia(26%) saturate(789%) hue-rotate(191deg) brightness(104%) contrast(101%)',
        },
        rectangle4: {
            position: 'absolute',
            bottom: '65px',
            left: '145px',
            width: '60px',
            filter: 'invert(76%) sepia(26%) saturate(789%) hue-rotate(191deg) brightness(104%) contrast(101%)',
        },
        rectangle5: {
            position: 'absolute',
            top: '90px',
            right: '35px',
            width: '170px',
            filter: 'invert(17%) sepia(79%) saturate(3181%) hue-rotate(212deg) brightness(59%) contrast(115%)',
        },
        rectangle6: {
            position: 'absolute',
            top: '-60px',
            right: '20px',
            width: '70px',
            filter: 'invert(17%) sepia(79%) saturate(3181%) hue-rotate(212deg) brightness(59%) contrast(115%)',
        },
        rectangle7: {
            position: 'absolute',
            bottom: '175px',
            right: '150px',
            width: '70px',
            filter: 'invert(17%) sepia(79%) saturate(3181%) hue-rotate(212deg) brightness(59%) contrast(115%)',
        },
        rectangle8: {
            position: 'absolute',
            bottom: '-150px',
            right: '150px',
            width: '180px',
            filter: 'invert(17%) sepia(79%) saturate(3181%) hue-rotate(212deg) brightness(59%) contrast(115%)',
        },
        rectangle9: {
            position: 'absolute',
            bottom: '40px',
            right: '25px',
            width: '100px',
            filter: 'invert(17%) sepia(79%) saturate(3181%) hue-rotate(212deg) brightness(59%) contrast(115%)',
        },
    })
)


const ForgotPasswordPage = () => {
    const classes = useStyles()

    return (
        <Grid container className={classes.requestPageContainer}>
            <Grid item lg={6} className={classes.leftSideContainer}>
                <Grid className={classes.miniHeaderContainer}>
                    <Link href="/" underline="none" className={classes.requestPageHeader}>
                        <img src="./images/logo.svg" alt="logo" width="42px" height="42px" className={classes.requestPageLogo} />
                        <Typography variant="h2" className={classes.requestPageTitle} >
                            TodoManager
                        </Typography>
                    </Link>
                </Grid>
                <Grid className={classes.requestContainer}>
                    <Typography variant="h1" className={classes.requestTitle}>Password change</Typography>
                    <Grid className={classes.formContainer}>
                        <ForgotPasswordForm />
                    </Grid>
                    <Typography variant="body1">
                        No account yet?
                        <Link href="/register" className={classes.requestLink}>Sign Up</Link>
                    </Typography>
                </Grid>
            </Grid>
            <Grid item lg={6} className={classes.rightSideContainer}>
                <img src="./images/auth/auth1.png" alt="task" className={classes.rightImageOne} />
                <img src="./images/auth/auth2.png" alt="task" className={classes.rightImageTwo} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle1} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle2} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle3} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle4} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle5} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle6} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle7} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle8} />
                <img src="./images/auth/rectangle.svg" alt="rectangle" className={classes.rectangle9} />
                <Grid className={classes.discoverContainer}>
                    <Typography className={classes.discoverTitle} variant="h2">
                        Explore your daily tasks
                    </Typography>
                    <Typography className={classes.discoverContent} variant="body1">
                        Discover more about yourself and your tasks by using this simple app. Be more productive lorem ipsum dolor ipsal and become a legend by being there.
                    </Typography>
                </Grid>
            </Grid>
        </Grid >
    )
}


export default ForgotPasswordPage