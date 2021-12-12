import { Grid } from '@mui/material';
import React from 'react';
import Sidebar from '../Sidebar'
import MealCard from './MealCard'

const ListingPage = () => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="space-around"
            alignItems="flex-start"
            spacing={1}
        >
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <MealCard />
            <Sidebar />
        </Grid>
    )
}


export default (ListingPage)