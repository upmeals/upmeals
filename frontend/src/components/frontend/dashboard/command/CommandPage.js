import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from '../../../ui/Page';
import useAllRecords from '../../../../hooks/useAllRecords';
import { createStyles, makeStyles } from '@mui/styles';
import DynamicTitle from './DynamicTitle';
import MealsContainer from './MealsContainer';
import MealsFilter from './MealsFilter';
import ModalSelectionPlat from '../selectionPlat/ModalSelectionPlat';
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

    const handleUpdateSelectedRecipies = (newSelectedRecipies) => {
        setSelectedRecipies(newSelectedRecipies)
        setNbrMeals(newSelectedRecipies.length)
    }

    useEffect(() => {
        // Premier load
        if (recipies.length && !loadingRecipies && selectedRecipies.length === 0) {
            setSelectedRecipies(recipies.slice(0, nbrMeals))
        // Si le nbrMeals change après le premier load il faut calculer correctement l'array
        } else if (recipies.length && !loadingRecipies && selectedRecipies.length > 0) {
            let selectedRecipiesIds = selectedRecipies.map((recipe) => recipe.id)
            if (nbrMeals < selectedRecipies.length) {
                setSelectedRecipies(selectedRecipies.slice(0, nbrMeals))
            } else {
                let unselectedRecipies = recipies.filter((recipe) => !(selectedRecipiesIds.includes(recipe.id)))
                setSelectedRecipies(
                    [
                        ...selectedRecipies,
                        ...unselectedRecipies.slice(0, (nbrMeals - selectedRecipies.length))
                    ]
                )
            }
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
                    loading={loadingRecipies}
                />
                <MealsContainer
                    handleUpdateSelectedRecipies={handleUpdateSelectedRecipies}
                    selectedRecipies={selectedRecipies}
                    recipies={recipies}
                />
            </Grid>
            <ModalSelectionPlat />
        </Page>
    )
}


export default CommandPage