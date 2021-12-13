import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from '../../../ui/Page';
import useAllRecords from '../../../../hooks/useAllRecords';


const CommandPage = () => {
    const { loading: loadingRecipies, records: recipies } = useAllRecords('recipies');

    const [selectedRecipies, setSelectedRecipies] = useState([])
    
    useEffect(() => {
        if (recipies.length && !loadingRecipies) {
            const numberOfPlates = Math.floor(Math.random() * 5) + 4
            const shuffled = recipies.sort(() => 0.5 - Math.random());
            setSelectedRecipies(shuffled.slice(0, numberOfPlates));
        }
    
    }, [loadingRecipies]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Page>
            <Grid>
                <p>Commander</p>

                {
                    !selectedRecipies.length ? (
                        <p>Loading...</p>
                    ) : (
                        <Grid>
                            {
                                selectedRecipies.map((recipe, index) => {
                                    return (
                                        <Grid key={index}>
                                            <Typography variant="body2">
                                                {recipe.attributes.title}
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