import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Link from '@material-ui/core/Link';
import Typography  from '@material-ui/core/Typography';
// import icons
import ListOutlinedIcon from '@material-ui/icons/ListOutlined';
import EmojiObjectsOutlinedIcon from '@material-ui/icons/EmojiObjectsOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import LocalDiningOutlinedIcon from '@material-ui/icons/LocalDiningOutlined';
import FastfoodOutlinedIcon from '@material-ui/icons/FastfoodOutlined';

const useStyles = makeStyles(theme =>
    createStyles({
        sidebarIcons: {
            width: '107px',
            height: 'calc(18vh - 6.5px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F5F5F4',
            flexDirection: 'column',
            color: '#252626',
            textAlign: 'center',

            "&:hover": {
                backgroundColor: '#FFFFFF',
                textDecoration: 'none',
            }
        },

        sidebarIcons__icon: {
            width: '2rem',
            height: '2rem',
            color: '#252626',
            display: 'flex',
            flexDirection: 'column',
        }
    })
)


const Sidebar = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="column"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Link href="/listing" className={classes.sidebarIcons}>
                <ListOutlinedIcon className={classes.sidebarIcons__icon} />
                <Typography variant="body">
                    Listing
                </Typography>
            </Link>

            <Link href="/suggest" className={classes.sidebarIcons}>
                <EmojiObjectsOutlinedIcon className={classes.sidebarIcons__icon} />
                <Typography variant="body">
                    Suggestions
                </Typography>
            </Link>

            <Link href="/wishlist" className={classes.sidebarIcons}>
                <FavoriteBorderOutlinedIcon className={classes.sidebarIcons__icon} />
                <Typography variant="body">
                    Wishlist
                </Typography>
            </Link>

            <Link href="/recipe" className={classes.sidebarIcons}>
                <LocalDiningOutlinedIcon className={classes.sidebarIcons__icon} />
                <Typography variant="body">
                    Ajouter une recette
                </Typography>
            </Link>

            <Link href="/cook" className={classes.sidebarIcons}>
                <FastfoodOutlinedIcon className={classes.sidebarIcons__icon} />
                <Typography variant="body">
                    Cook now
                </Typography>
            </Link>
        </Grid>
    )
}


export default Sidebar