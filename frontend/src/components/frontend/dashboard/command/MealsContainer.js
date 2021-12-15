import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Skeleton } from '@mui/material';
import MealCard from './MealCard';
import AddMeal from './AddMeal';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        mealsContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        fakeMealContainer: {
            margin: theme.spacing(0, 4, 1, 0),
        },
        mealContainer: {
            margin: theme.spacing(0, 4, 1, 0),
        },
    })
)


const MealsContainer = ({ handleUpdateSelectedRecipies, selectedRecipies, recipies }) => {
    const classes = useStyles();

    const handleMealRandom = (_, index) => {
        if (selectedRecipies.length < 9 || index !== undefined) {
            let selectedRecipiesIds = selectedRecipies.map((recipe) => recipe.id)
            let unselectedRecipies = recipies.filter((recipe) => !(selectedRecipiesIds.includes(recipe.id)))

            let randomIndex = Math.floor(Math.random() * unselectedRecipies.length)

            if (index === undefined) { // Si index pas set -> ajouter
                let newSelectedRecipes = [...selectedRecipies]
                newSelectedRecipes.push(unselectedRecipies[randomIndex])
                return handleUpdateSelectedRecipies(newSelectedRecipes)
            } else { // Si index set -> remplacer
                let firstPart = (index > 0) ? [...selectedRecipies.slice(0, index)] : []
                let lastPart = (index < 9) ? [...selectedRecipies.slice(index, 9)] : []

                let newSelectedRecipes = [
                    ...firstPart.concat(lastPart)
                ]
                newSelectedRecipes.splice(index, 1, unselectedRecipies[randomIndex])
                return handleUpdateSelectedRecipies(newSelectedRecipes)
            }
        } else {
            return
        }
    }

    // console.log('b', selectedRecipies[0])

    return (
        <>
            {
                !selectedRecipies.length ? (
                    <Grid container className={classes.mealsContainer}>
                        <Grid>
                            <Skeleton variant="rectangular" width={220} height={220} className={classes.fakeMealContainer} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid>
                            <Skeleton variant="rectangular" width={220} height={220} className={classes.fakeMealContainer} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid>
                            <Skeleton variant="rectangular" width={220} height={220} className={classes.fakeMealContainer} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid>
                            <Skeleton variant="rectangular" width={220} height={220} className={classes.fakeMealContainer} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container className={classes.mealsContainer}>
                        {
                            selectedRecipies.map((recipe, index) => {
                                return (
                                    <MealCard key={index} recipe={recipe} index={index} handleMealRandom={handleMealRandom} />
                                )
                            })
                        }
                        {
                            selectedRecipies.length < 9 && (
                                <AddMeal handleMealRandom={handleMealRandom} />
                            )
                        }
                    </Grid>
                )
            }
        </>
    )
}

export default MealsContainer