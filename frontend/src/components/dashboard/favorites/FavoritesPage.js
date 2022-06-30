import { Grid } from '@mui/material';
import React from 'react';
import Page from '../../ui/Page'
import ModalAddCollection from './ModalAddCollection';

const FavoritesPage = () => {
    return (
        <Page>
            <Grid>
                <p>Favoris</p>
                <ModalAddCollection />
            </Grid>
        </Page>
    )
}


export default FavoritesPage