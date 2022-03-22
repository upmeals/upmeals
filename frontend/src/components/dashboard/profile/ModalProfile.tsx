import { Grid, Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ProfileForm from './ProfileForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeIcon: {
            marginTop: '1rem',
            marginRight: '1rem',
            position: 'absolute',
            bottom: '14rem',
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