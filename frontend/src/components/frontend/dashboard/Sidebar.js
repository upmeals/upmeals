import { Grid, Typography, Link } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { ListOutlinedIcon, EmojiObjectsOutlinedIcon, FavoriteBorderOutlinedIcon, LocalDiningOutlinedIcon, FastfoodOutlinedIcon } from '@mui/icons-material'
import React from 'react';


const useStyles = makeStyles(theme =>
    createStyles({
        sidebarContainer: {
            height: 'calc(100vh - 98px)',
        },
        sidebarContainer__height: {
            height: '100vh',
            backgroundColor: '#F5F5F4',
        },
        sidebarIcons: {
            width: '107px',
            height: 'calc(18vh - 7px)',
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
            className={classes.sidebarContainer}
        >
            <Grid className={classes.sidebarContainer__height}>
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
        </Grid>
    )
}


export default Sidebar