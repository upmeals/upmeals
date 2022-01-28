import { Grid, Link, Button, Avatar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import withAuth from '../hoc/withAuth';
import ModalProfile from './dashboard/profile/ModalProfile';


const useStyles = makeStyles(theme =>
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


const Header = ({ logoutUser }) => {
    const classes = useStyles();
    const history = useHistory()
    const [openProfile, setOpenProfile] = React.useState(false)

    const handleOpenProfile = () => {
        setOpenProfile(true)
        history.push({search:'profile=true'})
    }

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.containerHeader}
        >   
            <Link href="/command" onClick={logoutUser}>
                <img className={classes.headerLogo} src="/logos/upmeals_logo.png" alt="logo upmeals" />
            </Link>

            <Avatar 
                alt="Travis Howard"
                src="/static/images/avatar/1.jpg"
                className={classes.headerAvatar}
            >
                <Button onClick={handleOpenProfile}>
                    Profile
                </Button>
                <ModalProfile
                    handleOpenProfile={handleOpenProfile}
                    open={openProfile}
                    setOpenProfile={setOpenProfile}
                />
            </Avatar>
        </Grid>
    )
}


export default withAuth(Header)