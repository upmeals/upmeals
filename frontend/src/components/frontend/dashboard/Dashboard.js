import { Grid } from '@mui/material';
import React from 'react';
import Page from '../../ui/Page'
import AjoutPlat from "./ajoutPlat/AjoutPlat";
import MealCard from './command/MealCard';


const Dashboard = () => {
    return (
        <Page>
            <Grid>
                <AjoutPlat />
                <MealCard
                    recipe={
                        {
                            attributes: {
                                title: 'titre'
                            }
                        }
                    }
                    index={1}
                />
            </Grid>
        </Page>
    )
}


export default Dashboard