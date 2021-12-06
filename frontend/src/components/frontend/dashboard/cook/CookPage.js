import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const CookPage = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Header />
            <p>CookPage</p>
            <Sidebar />
        </Grid>
    )
}


export default (CookPage)