import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const WishlistPage = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Header />
            <p>WishlistPage</p>
            <Sidebar />
        </Grid>
    )
}


export default (WishlistPage)