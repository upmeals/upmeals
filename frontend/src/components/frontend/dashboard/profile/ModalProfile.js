// import { defineMessages, injectIntl } from 'react-intl';
import { Grid, Modal, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import ProfilForm from './ProfileForm';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: '500px',
            backgroundColor: '#FFFFFF',
        },
        closeIcon: {
            marginTop: '1rem',
            marginRight: '1rem',
            position: 'absolute',
            top: '0',
            right: '0',
            cursor: 'pointer',
        }
    })
)

// Component
const ModalProfile = ({ open, setOpenProfile, handleOpenProfile }) => {
    const classes = useStyles();
    const history = useHistory()


    const handleClose = () => {
        setOpenProfile(false)
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
                    <ProfilForm 
                        handleOpenProfile={handleOpenProfile}
                        handleClose={handleClose}
                    />
                    <CloseIcon 
                        onClick={handleClose} 
                        className={classes.closeIcon}
                    />
                </Box>
            </Modal>
        </Grid>
    )
}

export default ModalProfile