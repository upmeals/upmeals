import { Grid, Link, Button, Avatar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { useModal } from '../../hooks/useModal';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        containerHeader: {
            padding: theme.spacing(2.5, 1),
            margin: theme.spacing(1, 4),
            width: 'calc(100% - 64px) !important',
            height: 82,
            borderBottom: '2px solid #707070',
            position: 'fixed',
        },
        headerLogo: {
            width: '130px',
            height: 'auto',
        },
        headerAvatar: {
            width: '40px',
            height: '40px',
        },
    })
)


const Header = () => {
    const classes = useStyles();

    const { setModal: setModalProfile } = useModal("profile")

    const handleOpenProfileModal = () => {
        setModalProfile()
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.containerHeader}
        >   
            <Link href="/command">
                <img className={classes.headerLogo} src="/logos/upmeals_logo.png" alt="logo upmeals" />
            </Link>
            <Avatar 
                alt="Travis Howard"
                src="/static/images/avatar/1.jpg"
                className={classes.headerAvatar}
            >
                <Button
                    onClick={handleOpenProfileModal}
                >
                    Profile
                </Button>
            </Avatar>
        </Grid>
    )
}


export default Header