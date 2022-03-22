import { Grid, Link, Button, Avatar } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { Theme } from '@mui/system';
import { useHistory } from 'react-router-dom';


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
    const history = useHistory();

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
                    //onClick={() => { history.push({search:'modal=profile'}) }}
                    onClick={() => { history.push({search:'profile=true'}) }}
                >
                    Profile
                </Button>
            </Avatar>
        </Grid>
    )
}


export default Header