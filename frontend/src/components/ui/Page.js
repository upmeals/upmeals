import { Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react'
import Sidebar from '../frontend/Sidebar';
import Header from '../frontend/Header';


const Page = ({ children }) => {
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
                {children}
            </Grid>
        </Grid>
    )
}


export default Page