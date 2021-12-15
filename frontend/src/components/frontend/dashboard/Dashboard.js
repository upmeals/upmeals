import { Grid } from '@mui/material';
import React from 'react';
import Page from '../../ui/Page'
import DetailPlat from "./detailPlat/DetailPlat";


const Dashboard = () => {
    return (
        <Page>
            <Grid>
              <DetailPlat />
            </Grid>
        </Page>
    )
}


export default Dashboard