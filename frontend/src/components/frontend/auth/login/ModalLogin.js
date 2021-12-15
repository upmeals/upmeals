// import { defineMessages, injectIntl } from 'react-intl';
import { Grid, Modal, Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import LoginForm from './LoginForm';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '35%',
            height: '500px',
            backgroundColor: '#FFFFFF',
        }
    })
)

// Component
const ModalLogin = ({ open, setOpenLogin, handleOpenRegister }) => {
    const classes = useStyles();
    const history = useHistory()
    const handleClose = () => {
        setOpenLogin(false)
        history.push({search:''})
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Modal open={open} onClose={handleClose}>
                <Box className={classes.modalContainer}>
                    <LoginForm 
                        handleOpenRegister={handleOpenRegister}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </Grid>
    )
}

export default ModalLogin