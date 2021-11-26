import Grid from '@material-ui/core/Grid'
import React from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';

const SuggestPage = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Header />
            <p>SuggestPage</p>
            <Sidebar />
        </Grid>
    )
}


export default (SuggestPage)