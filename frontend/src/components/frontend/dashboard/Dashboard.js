import { Grid } from '@mui/material';
import React from 'react';
import Page from '../../ui/Page'
import AjoutPlat from "./ajoutPlat/AjoutPlat";


const Dashboard = () => {
    return (
        <Page>
            <Grid>
              <AjoutPlat />
            </Grid>
        </Page>
    )
}


export default Dashboard