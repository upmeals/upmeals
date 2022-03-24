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
import _ from 'lodash';


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
    const { loading: loadingRecipes, records: recipes }: { loading: boolean, records: Recipe[] | [] } = useAllRecords(
        10,
        {
            collection: 'recipes'
        }
    );


    const [selectedRecipes, setSelectedRecipes] = useState<Recipe[] | []>([]);
    const [unselectedRecipes, setUnselectedRecipes] = useState<Recipe[] | []>([]);
    const [nbrMeals, setNbrMeals] = useState<number>(4);
    const [nbrPersons, setNbrPersons] = useState<number>(1);


    useEffect(() => {
        // First load -> Si les recipes sont bien fetch mais qu'aucune recette n'est selectionnée
        if (recipes.length && !loadingRecipes && selectedRecipes.length === 0) {
            // get x random unique ids in recipes
            let randomRecipeIds =
                _.shuffle(Array.from(Array((recipes.length > nbrMeals) ? recipes.length : nbrMeals).keys())) 
                    .slice(0, (recipes.length > nbrMeals) ? nbrMeals : recipes.length) 

            handleUpdateSelectedRecipes(randomRecipeIds.map(id => recipes[id]))
        } else if (recipes.length && !loadingRecipes && selectedRecipes.length > 0) { // nbrMeals changed
            if (selectedRecipes.length < nbrMeals) {
                let newSelectedRecipes = [
                    ...selectedRecipes,
                    ...unselectedRecipes.slice(0, (nbrMeals - selectedRecipes.length))
                ]
                handleUpdateSelectedRecipes(newSelectedRecipes)
            } else {
                let newSelectedRecipes = [
                    ...selectedRecipes.slice(0, nbrMeals),
                ]
                handleUpdateSelectedRecipes(newSelectedRecipes)
            }
        }
    }, [loadingRecipes, nbrMeals, nbrPersons]) // eslint-disable-line react-hooks/exhaustive-deps


    const handleUpdateSelectedRecipes = (newSelectedRecipes: (Recipe[] | [])) => {
        const selectedIds = newSelectedRecipes.map((recipe) => recipe.id)

        let newUnselectedRecipes = recipes.filter((recipe) => !(selectedIds.includes(recipe.id)))

        setSelectedRecipes(newSelectedRecipes)
        setUnselectedRecipes(newUnselectedRecipes)
        setNbrMeals(newSelectedRecipes.length)

        return { newSelectedRecipes, newUnselectedRecipes, newNbrMeals: newSelectedRecipes.length }
    }

    return (
        <Page>
            <Grid container className={classes.commandContainer}>
                <DynamicTitle
                    nbrMeals={nbrMeals}
                    nbrPersons={nbrPersons}
                    setNbrMeals={setNbrMeals}
                    setNbrPersons={setNbrPersons}
                    loading={loadingRecipes}
                />
                <MealsFilter
                    loading={loadingRecipes}
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