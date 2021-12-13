import { Grid, Typography } from '@mui/material';
import React from 'react';
import Page from '../../../ui/Page';
import useAllRecords from '../../../../hooks/useAllRecords';


const CommandPage = () => {

    const { loading: loadingRecipies, records: recipies } = useAllRecords('recipies');

    // console.log(recipies)

    return (
        <Page>
            <Grid>
                <p>Commander</p>

                {
                    loadingRecipies ? (
                        <p>Loading...</p>
                    ) : (
                        <Grid
                            container
                        >
                            {
                                recipies.map((recipe, index) => {
                                    return (
                                        <Grid
                                            container
                                            key={index}
                                        >
                                            <Typography variant="body2">
                                                {JSON.stringify(recipe)}
                                            </Typography>
                                        </Grid>
                                    )
                                })
                            }
                        </Grid>
                    )
                }
            </Grid>
        </Page>
    )
}


export default CommandPage