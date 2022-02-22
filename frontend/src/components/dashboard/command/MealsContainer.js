import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Skeleton } from '@mui/material';
import MealCard from './MealCard';
import AddMeal from './AddMeal';
import DetailsMeal from './DetailsMeal';
import { useHistory } from 'react-router-dom';
import SelectionModal from './SelectionModal';
import { setModalCurrent } from '../../../store/modal/operations';

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


const MealsContainer = ({ handleUpdateSelectedRecipes, selectedRecipes, unselectedRecipes, recipes }) => {
    const classes = useStyles();
    const history = useHistory()

    const handleMealRandom = ({ e, index, selected, refreshImage, refreshCurrentImage }) => {
        if (selectedRecipes.length <= 9) {
            let randomIndex = Math.floor(Math.random() * unselectedRecipes.length)
            if (index === undefined) { // Si index pas set -> ajouter
                let newSelectedRecipes = [...selectedRecipes]
                newSelectedRecipes.push(unselectedRecipes[randomIndex])
                return handleUpdateSelectedRecipes(newSelectedRecipes)
            } else { // Si index set -> remplacer
                let firstPart = (index > 0) ? [...selectedRecipes.slice(0, index)] : []
                let lastPart = (index < 9) ? [...selectedRecipes.slice(index, 9)] : []
                let newSelectedRecipes = [
                    ...firstPart.concat(lastPart)
                ]
                if (selected !== undefined) {
                    newSelectedRecipes.splice(index, 1, selected)
                    console.log(selected)
                } else {
                    newSelectedRecipes.splice(index, 1, unselectedRecipes[randomIndex])
                }
                refreshImage(newSelectedRecipes[index].image)
                return handleUpdateSelectedRecipes(newSelectedRecipes)
            }
        } else {
            return
        }
    }

    const handleToggleDetails = ({ e, recipe }) => {
        if (e.target.id !== 'blacklist_onclick_toggle') {
            if (history.location.search === '' && recipe && recipe.id) {
                setModalCurrent(
                    'recipe',
                    null,
                    history,
                    recipe.id
                )
            } else {
                history.push({ search: '' })
            }
        }
    }

    const handleToggleSelection = ({ _, index, refreshImage }) => {
        if (history.location.search === '' && index !== undefined) {
            setModalCurrent(
                'replace-recipe',
                { replaceMealIndex: index, selectedRecipes, unselectedRecipes, handleMealRandom, refreshImage },
                history
            )
        } else {
            history.push({ search: '' })
        }
    }

    return (
        <>
            {
                !selectedRecipes.length ? (
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
                            selectedRecipes.map((recipe, index) => {
                                return (
                                    <MealCard
                                        key={index}
                                        recipe={recipe}
                                        index={index}
                                        handleMealRandom={handleMealRandom}
                                        handleToggleDetails={handleToggleDetails}
                                        handleToggleSelection={handleToggleSelection}
                                    />
                                )
                            })
                        }
                        {
                            selectedRecipes.length < 9 && (
                                <AddMeal
                                    handleMealRandom={handleMealRandom}
                                />
                            )
                        }
                    </Grid>
                )
            }
        </>
    )
}

export default MealsContainer