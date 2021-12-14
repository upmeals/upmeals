import { Grid } from '@mui/material';
import React from 'react';
import Page from '../../../ui/Page'
import MealCard from './MealCard';


const CommandPage = () => {
    return (
        <Page>
            <Grid>
                <p>Commander</p>
                <MealCard />
            </Grid>
        </Page>
    )
}


export default CommandPage