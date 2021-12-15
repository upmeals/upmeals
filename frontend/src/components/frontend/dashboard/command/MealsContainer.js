import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Skeleton } from '@mui/material';
import MealCard from './MealCard';
import AddMeal from './AddMeal';
import DetailsMeal from './DetailsMeal';
import { useHistory } from 'react-router-dom';
import SelectionModal from './SelectionModal';

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


const MealsContainer = ({ handleUpdateSelectedRecipies, selectedRecipies, unselectedRecipies, recipies }) => {
    const classes = useStyles();
    const history = useHistory()

    const [detailsModalOpen, setDetailsModalOpen] = React.useState(false)
    const [selectionModalOpen, setSelectionModalOpen] = React.useState(false)

    const handleMealRandom = ({ e, index, selected }) => {
        if (selectedRecipies.length <= 9) {
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
                if (selected !== undefined) {
                    newSelectedRecipes.splice(index, 1, selected)
                } else {
                    newSelectedRecipes.splice(index, 1, unselectedRecipies[randomIndex])
                }
                return handleUpdateSelectedRecipies(newSelectedRecipes)
            }
        } else {
            return
        }
    }

    const handleToggleDetails = ({ e, recipe }) => {
        if (e.target.id !== 'blacklist_onclick_toggle') {
            if (history.location.search === '' && recipe && recipe.id) {
                history.push({ search: 'id=' + recipe.id })
            } else {
                history.push({ search: '' })
            }
        }
    }

    const handleToggleSelection = ({ _, index }) => {
        if (history.location.search === '' && index !== undefined) {
            history.push({ search: `?replaceMeal=${index}` })
        } else {
            history.push({ search: '' })
        }
    }

    useEffect(() => {
        if (history.location.search !== '' && history.location.search.includes('?id=')) {
            setDetailsModalOpen(history.location.search.split('?id=')[1])
        } else if (history.location.search !== '' && history.location.search.includes('?replaceMeal=')) {
            setSelectionModalOpen(history.location.search)
        } else if (history.location.search === '') {
            setDetailsModalOpen(false)
            setSelectionModalOpen(false)
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
                            selectedRecipies.length < 9 && (
                                <AddMeal
                                    handleMealRandom={handleMealRandom}
                                />
                            )
                        }
                    </Grid>
                )
            }
            <DetailsMeal
                detailsModalOpen={detailsModalOpen}
                handleToggleDetails={handleToggleDetails}
            />
            <SelectionModal
                selectedRecipies={selectedRecipies}
                unselectedRecipies={unselectedRecipies}
                selectionModalOpen={selectionModalOpen}
                handleToggleSelection={handleToggleSelection}
                handleMealRandom={handleMealRandom}
            />
        </>
    )
}

export default MealsContainer