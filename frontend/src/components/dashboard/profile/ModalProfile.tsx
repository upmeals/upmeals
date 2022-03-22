import { Grid, Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ProfileForm from './ProfileForm';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeIcon: {
            marginTop: '1rem',
            marginRight: '1rem',
            position: 'relative',
            bottom: '5rem',
            float: 'right',
            cursor: 'pointer',
        }
    })
)


interface ModalProfileProps {
    handleClose: any,
}


const ModalProfile = ({handleClose}: ModalProfileProps) => {
    const classes = useStyles()

    return (
        <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
    >
        <Grid>
            <Box>
                <ProfileForm 
                />
                <CloseIcon 
                    onClick={handleClose} 
                    className={classes.closeIcon}
                />
            </Box>
        </Grid>
    </Grid>
    )
}


export default (ModalProfile)