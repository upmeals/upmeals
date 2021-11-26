// import { defineMessages, injectIntl } from 'react-intl';
import createStyles from '@material-ui/core/styles/createStyles';
//import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
//import LoginForm from './LoginForm';
import { Typography } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
// import withAuth from '../../hoc/withAuth';
import { useHistory } from 'react-router-dom';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        modalContainer: {
            width: '100%',
            height: '100vh',
            background: 'rgba(0,0,0,0.16)',
        },
        modalContainer__modal: {
            width: '40%',
            height: '80vh',
            margin: 'auto',
            backgroundColor: '#FFFFFF',
        },
        loginSectionTitle: {
            fontWeight: 700,
            fontSize: 28,
            margin: theme.spacing(5, 0, 2, 0),
        }
    })
)

// Component
const ModalLogin = ({ open, setOpenLogin }) => {
    const classes = useStyles();
    const history = useHistory()
    const handleClose = () => {
        setOpenLogin(false)
        history.push({search:''})
    }

    return (
        <Modal open={open} onClose={handleClose}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Text in a modal
            </Typography>
        </Modal>
    )
    {/*<Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            className={classes.modalContainer}
        >
            <Grid className={classes.modalContainer__modal}>
                <Typography variant="h3" className={classes.loginSectionTitle}>
                    ModalLogin
                </Typography>
            </Grid>
    <LoginForm />*/}
}

export default ModalLogin