import { Grid, Typography, Link } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import EmojiObjectsOutlinedIcon from '@mui/icons-material/EmojiObjectsOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import BlenderOutlinedIcon from '@mui/icons-material/BlenderOutlined';
import React from 'react';


const useStyles = makeStyles(theme =>
    createStyles({
        sidebarContainer: {
            height: 'calc(100vh - 97px)',
            backgroundColor: '#F5F5F4',
            position: 'fixed',
            marginTop: 97,
        },
        sidebarIcons: {
            width: '107px',
            height: 'calc(18vh - 7px)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F4F6F7',
            flexDirection: 'column',
            color: '#252626 !important',
            textAlign: 'center',
            textDecoration: 'none !important',
            "&:hover": {
                backgroundColor: '#FBFCFC !important',
                textDecoration: 'none !important',
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
            <Grid className={classes.sidebarContainer}>
                <Link href="/command" className={classes.sidebarIcons}>
                    <ShoppingCartOutlinedIcon className={classes.sidebarIcons__icon} />
                    <Typography variant="body2">
                        Commander
                    </Typography>
                </Link>

                <Link href="/ideas" className={classes.sidebarIcons}>
                    <EmojiObjectsOutlinedIcon className={classes.sidebarIcons__icon} />
                    <Typography variant="body2">
                        Idées
                    </Typography>
                </Link>

                <Link href="/favorites" className={classes.sidebarIcons}>
                    <FavoriteBorderOutlinedIcon className={classes.sidebarIcons__icon} />
                    <Typography variant="body2">
                        Favoris
                    </Typography>
                </Link>

                <Link href="/create" className={classes.sidebarIcons}>
                    <AddCircleOutlineOutlinedIcon className={classes.sidebarIcons__icon} />
                    <Typography variant="body2">
                        Créer
                    </Typography>
                </Link>

                <Link href="/cook" className={classes.sidebarIcons}>
                    <BlenderOutlinedIcon className={classes.sidebarIcons__icon} />
                    <Typography variant="body2">
                        Cuisiner
                    </Typography>
                </Link>
            </Grid>
    )
}


export default Sidebar