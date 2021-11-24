import createStyles from '@material-ui/core/styles/createStyles';
import Grid from '@material-ui/core/Grid'
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import Link from '@material-ui/core/Link';
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
            height: 'calc(20vh - 10px)',
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
            <Link href="#" className={classes.sidebarIcons}>
                <ListOutlinedIcon className={classes.sidebarIcons__icon} />
                <p>Listing</p>
            </Link>

            <Link href="#" className={classes.sidebarIcons}>
                <EmojiObjectsOutlinedIcon className={classes.sidebarIcons__icon} />
                <p>Suggestions</p>
            </Link>

            <Link href="#" className={classes.sidebarIcons}>
                <FavoriteBorderOutlinedIcon className={classes.sidebarIcons__icon} />
                <p>Wishlist</p>
            </Link>

            <Link href="#" className={classes.sidebarIcons}>
                <LocalDiningOutlinedIcon className={classes.sidebarIcons__icon} />
                <p>Ajouter une recette</p>
            </Link>

            <Link href="#" className={classes.sidebarIcons}>
                <FastfoodOutlinedIcon className={classes.sidebarIcons__icon} />
                <p>Cook now</p>
            </Link>
        </Grid>
    )
}


export default (Sidebar)