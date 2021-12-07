import { Grid, Link, Button, Avatar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import withAuth from '../hoc/withAuth';


const useStyles = makeStyles(theme =>
    createStyles({
        containerHeader: {
            height: '70px',
            marginTop: '1.75rem',
            paddingBottom: '1.75rem',
            padding: theme.spacing(0, 4),
            borderBottom: '2px solid #000000',
        },
        headerLogo: {
            width: '115px',
            height: 'auto',
        }
    })
)


const Header = ({ logoutUser }) => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={classes.containerHeader}
        >   
            <Link href="/dashboard" onClick={logoutUser}>
                <img className={classes.headerLogo} src="https://upmeals.io/images/logo.svg" alt="logo upmeals" />
            </Link>

            <Avatar 
                alt="Travis Howard"
                src="/static/images/avatar/1.jpg"
                className={classes.headerAvatar}
            >
                <Button>
                    Profile
                </Button>
            </Avatar>
        </Grid>
    )
}


export default withAuth(Header)