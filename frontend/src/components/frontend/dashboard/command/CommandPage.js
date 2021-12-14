import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from '../../../ui/Page';
import useAllRecords from '../../../../hooks/useAllRecords';
import { createStyles, makeStyles } from '@mui/styles';
import DynamicTitle from './DynamicTitle';
import MealsContainer from './MealsContainer';
import MealsFilter from './MealsFilter';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        commandContainer: {
            padding: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
    })
)


const CommandPage = () => {
    const classes = useStyles();

    const { loading: loadingRecipies, records: recipies } = useAllRecords('recipies');

    const [selectedRecipies, setSelectedRecipies] = useState([]);
    const [nbrMeals, setNbrMeals] = useState(4);
    const [nbrPersons, setNbrPersons] = useState(1);

    useEffect(() => {
        if (recipies.length && !loadingRecipies) {
            setSelectedRecipies(recipies.slice(0, nbrMeals))
        }

    }, [loadingRecipies, nbrMeals, nbrPersons]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Page>
            <Grid container className={classes.commandContainer}>
                <DynamicTitle
                    nbrMeals={nbrMeals}
                    nbrPersons={nbrPersons}
                    setNbrMeals={setNbrMeals}
                    setNbrPersons={setNbrPersons}
                    loading={loadingRecipies}
                />
                <MealsFilter

                />
                <MealsContainer 
                    selectedRecipies={selectedRecipies}
                />
            </Grid>
        </Page>
    )
}


export default CommandPage