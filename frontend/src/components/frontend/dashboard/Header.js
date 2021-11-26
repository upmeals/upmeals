import Grid from '@material-ui/core/Grid'
import React from 'react';
import withAuth from '../../hoc/withAuth';
import makeStyles from '@material-ui/core/styles/makeStyles';
import createStyles from '@material-ui/core/styles/createStyles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme =>
    createStyles({
        containerHeader: {
            height: '13vh',
            marginRight: '4rem',
            marginLeft: '4rem',
            marginTop: '1.75rem',
            paddingBottom: '1.75rem',
            borderBottom: '2px solid #707070',
        },
        headerLogo: {
            width: '12vw',
            height: 'auto',
        },
        headerAvatar: {
            width: '60px',
            height: '60px',
        }
    })
)


const Header = ({ logoutUser, user }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.containerHeader}
        >   
            <Link href="/dashboard">
                <img className={classes.headerLogo} src="https://upmeals.io/images/logo.svg" alt="logo upmeals" />
            </Link>

            <Avatar 
                alt="Travis Howard"
                src="/static/images/avatar/1.jpg"
                className={classes.headerAvatar}
            >
                <Button onClick={logoutUser}>
                    Profile
                </Button>
            </Avatar>
        </Grid>
    )
}


export default withAuth(Header)