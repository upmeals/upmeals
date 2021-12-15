import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Skeleton } from '@mui/material';
import MealCard from './MealCard';
import AddMeal from './AddMeal';
import DetailsMeal from './DetailsMeal';
import { useHistory } from 'react-router-dom';

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
    const history = useHistory()

    const [detailsModalOpen, setDetailsModalOpen] = React.useState(false)

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

    const handleToggleDetails = ({ e, recipe }) => {
        if (e.target.id !== 'blacklist_onclick_toggle') {
            if (history.location.search === '' && recipe && recipe.id) {
                history.push({search:'id=' + recipe.id})
            } else {
                history.push({search:''})
            }
        }
    }

    useEffect(() => {
        console.log(history.location.search, history.location.search.includes('?id='), history.location.search.split('?id=')[1])
        if (history.location.search !== '' && history.location.search.includes('?id=')) {
            setDetailsModalOpen(history.location.search.split('?id=')[1])
        } else if (history.location.search === '') {
            setDetailsModalOpen(false)
        }
    }, [history.location.search])

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
                                    <MealCard key={index} recipe={recipe} index={index} handleMealRandom={handleMealRandom} handleToggleDetails={handleToggleDetails} />
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
            <DetailsMeal detailsModalOpen={detailsModalOpen} handleToggleDetails={handleToggleDetails} />
        </>
    )
}

export default MealsContainer