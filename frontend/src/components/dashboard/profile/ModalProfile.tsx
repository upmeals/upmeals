import { Grid, Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ProfileForm from './ProfileForm';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalProfile__container: {
            fontFamily: 'Poppins, sans-serif',
            width: '1250px !important',
        },
        flexContainer: {
            display: 'flex !important',
            flexDirection: 'column !important' as 'column',
            justifyContent: 'flex-start !important',
            alignItems: 'flex-start !important',
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


const ModalProfile = ({ handleClose }: ModalProfileProps) => {
    const classes = useStyles()

    return (
        <Grid
            className={classes.modalProfile__container}
        >
            <Grid
                className={classes.flexContainer}
            >

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