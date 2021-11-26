import Grid from '@material-ui/core/Grid'
import React from 'react';
import Button from '@material-ui/core/Button'
import withAuth from '../../hoc/withAuth';
import Sidebar from './Sidebar';


const Dashboard = ({ logoutUser, user }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
        >
            <p>Dashboard Utilisateur</p>
            <Button variant="contained" color="secondary" onClick={logoutUser}>
                Logout
            </Button>

            <Sidebar />

        </Grid>
    )
}


export default withAuth(Dashboard)