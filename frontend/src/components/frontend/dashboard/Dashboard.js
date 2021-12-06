import { Grid } from '@mui/material';
import React from 'react';
import withAuth from '../../hoc/withAuth';
import Sidebar from './Sidebar';
import Header from './Header';


const Dashboard = ({ logoutUser, user }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <Header />
            <Sidebar />
        </Grid>
    )
}


export default withAuth(Dashboard)