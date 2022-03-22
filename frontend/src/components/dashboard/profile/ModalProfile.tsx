import { Grid, Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ProfileForm from './ProfileForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalProfile__container: {
            fontFamily: 'Poppins, sans-serif',
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
        className={classes.modalProfile__container}
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