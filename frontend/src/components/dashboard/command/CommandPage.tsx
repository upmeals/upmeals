import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Page from '../../ui/Page';
import useAllRecords from '../../../hooks/useAllRecords';
import { createStyles, makeStyles } from '@mui/styles';
import DynamicTitle from './DynamicTitle';
import MealsContainer from './MealsContainer';
import MealsFilter from './MealsFilter';
import { Theme } from '@mui/system';
import { Recipe } from '../../../interfaces/Collections'


// Component classes
const useStyles = makeStyles((theme: Theme) =>
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

    const { loading: loadingrecipes, records: recipes } : { loading: boolean, records: Recipe[] | [] } = useAllRecords(
        10, 
        { 
            collection: 'recipes' 
        }
    );

    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[] | []>([]);
    const [unselectedRecipes, setUnselectedRecipes] = useState<Recipe[] | []>([]);
    const [nbrMeals, setNbrMeals] = useState<number>(4);
    const [nbrPersons, setNbrPersons] = useState<number>(1);

    const handleUpdateSelectedRecipes = (newSelectedRecipes : (Recipe[] | [])) => {
        let newSelectedRecipesIds = newSelectedRecipes.map((recipe) => recipe.id)
        let newUnselectedRecipes = recipes.filter((recipe) => !(newSelectedRecipesIds.includes(recipe.id)))
        setUnselectedRecipes(newUnselectedRecipes)
        setSelectedRecipes(newSelectedRecipes)
        setNbrMeals(newSelectedRecipes.length)
    }

    useEffect(() => {
        // Premier load
        if (recipes.length && !loadingrecipes && selectedRecipes.length === 0) {
            let newSelectedRecipes = recipes.slice(0, nbrMeals)
            let newSelectedRecipesIds = newSelectedRecipes.map((recipe) => recipe.id)
            let newUnselectedRecipes = recipes.filter((recipe) => !(newSelectedRecipesIds.includes(recipe.id)))
            setSelectedRecipes(newSelectedRecipes)
            setUnselectedRecipes(newUnselectedRecipes)
            // Si le nbrMeals change après le premier load il faut calculer correctement l'array
        } else if (recipes.length && !loadingrecipes && selectedRecipes.length > 0) {
            if (nbrMeals < selectedRecipes.length) {
                let newSelectedRecipes = selectedRecipes.slice(0, nbrMeals)
                let newSelectedRecipesIds = newSelectedRecipes.map((recipe) => recipe.id)
                let newUnselectedRecipes = recipes.filter((recipe) => !(newSelectedRecipesIds.includes(recipe.id)))
                setSelectedRecipes(newSelectedRecipes)
                setUnselectedRecipes(newUnselectedRecipes)
            } else {
                let newSelectedRecipes = [
                    ...selectedRecipes,
                    ...unselectedRecipes.slice(0, (nbrMeals - selectedRecipes.length))
                ]
                let newSelectedRecipesIds = newSelectedRecipes.map((recipe) => recipe.id)
                let newUnselectedRecipes = recipes.filter((recipe) => !(newSelectedRecipesIds.includes(recipe.id)))
                setSelectedRecipes(newSelectedRecipes)
                setUnselectedRecipes(newUnselectedRecipes)
            }
        }
    }, [loadingrecipes, nbrMeals, nbrPersons]) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Page>
            <Grid container className={classes.commandContainer}>
                <DynamicTitle
                    nbrMeals={nbrMeals}
                    nbrPersons={nbrPersons}
                    setNbrMeals={setNbrMeals}
                    setNbrPersons={setNbrPersons}
                    loading={loadingrecipes}
                />
                <MealsFilter
                    loading={loadingrecipes}
                />
                <MealsContainer
                    handleUpdateSelectedRecipes={handleUpdateSelectedRecipes}
                    selectedRecipes={selectedRecipes}
                    unselectedRecipes={unselectedRecipes}
                    recipes={recipes}
                />
            </Grid>
        </Page>
    )
}


export default CommandPage