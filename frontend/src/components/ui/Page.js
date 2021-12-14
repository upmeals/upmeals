import { Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react'
import Sidebar from '../frontend/Sidebar';
import Header from '../frontend/Header';

const useStyles = makeStyles(theme =>
    createStyles({
        contentContainer: {
            position: 'fixed',
            width: 'calc(100% - 107px)',
            height: 'calc(100vh - 97px)',
            marginTop: 97,
            marginLeft: 107,
            overflowY: 'scroll',
        },
    })
)

const Page = ({ children }) => {
    const classes = useStyles()

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Grid
                container
            >
                <Header />
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Sidebar />
                <Grid className={classes.contentContainer}>
                    {children}
                </Grid>
            </Grid>
        </Grid>
    )
}


export default Page