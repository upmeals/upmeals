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
    const [unselectedRecipies, setUnselectedRecipies] = useState([]);
    const [nbrMeals, setNbrMeals] = useState(4);
    const [nbrPersons, setNbrPersons] = useState(1);

    const handleUpdateSelectedRecipies = (newSelectedRecipies) => {
        let newSelectedRecipiesIds = newSelectedRecipies.map((recipe) => recipe.id)
        let newUnselectedRecipies = recipies.filter((recipe) => !(newSelectedRecipiesIds.includes(recipe.id)))
        setUnselectedRecipies(newUnselectedRecipies)
        setSelectedRecipies(newSelectedRecipies)
        setNbrMeals(newSelectedRecipies.length)
    }

    useEffect(() => {
        // Premier load
        if (recipies.length && !loadingRecipies && selectedRecipies.length === 0) {
            let newSelectedRecipes = recipies.slice(0, nbrMeals)
            let newSelectedRecipiesIds = newSelectedRecipes.map((recipe) => recipe.id)
            let newUnselectedRecipies = recipies.filter((recipe) => !(newSelectedRecipiesIds.includes(recipe.id)))
            setSelectedRecipies(newSelectedRecipes)
            setUnselectedRecipies(newUnselectedRecipies)
            // Si le nbrMeals change après le premier load il faut calculer correctement l'array
        } else if (recipies.length && !loadingRecipies && selectedRecipies.length > 0) {
            if (nbrMeals < selectedRecipies.length) {
                let newSelectedRecipes = selectedRecipies.slice(0, nbrMeals)
                let newSelectedRecipiesIds = newSelectedRecipes.map((recipe) => recipe.id)
                let newUnselectedRecipies = recipies.filter((recipe) => !(newSelectedRecipiesIds.includes(recipe.id)))
                setSelectedRecipies(newSelectedRecipes)
                setUnselectedRecipies(newUnselectedRecipies)
            } else {
                let newSelectedRecipes = [
                    ...selectedRecipies,
                    ...unselectedRecipies.slice(0, (nbrMeals - selectedRecipies.length))
                ]
                let newSelectedRecipiesIds = newSelectedRecipes.map((recipe) => recipe.id)
                let newUnselectedRecipies = recipies.filter((recipe) => !(newSelectedRecipiesIds.includes(recipe.id)))
                setSelectedRecipies(newSelectedRecipes)
                setUnselectedRecipies(newUnselectedRecipies)
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
                    unselectedRecipies={unselectedRecipies}
                    recipies={recipies}
                />
            </Grid>
        </Page>
    )
}


export default CommandPage