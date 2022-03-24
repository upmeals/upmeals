import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Skeleton } from '@mui/material';
import MealCard from './MealCard';
import AddMeal from './AddMeal';
import { Theme } from '@mui/system';
import { Recipe } from '../../../interfaces/Collections';
import { useModal } from '../../../hooks/useModal';

// Component classes
const useStyles = makeStyles((theme: Theme) =>
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


interface MealsContainerProps {
    unselectedRecipes: Recipe[],
    selectedRecipes: Recipe[],
    handleUpdateSelectedRecipes: any,
    recipes: Recipe[],
}

interface handleReplaceMealInterface {
    e: any,
    index: number,
    refreshImage: any,
    mealToAppend?: Recipe,
    refreshAppendImage?: any
}

interface handleOpenDetailsInterface {
    e: any,
    recipe: Recipe,
}

interface handleOpenSelectionInterface {
    index: number,
    refreshImage: any,
}


const MealsContainer = ({ handleUpdateSelectedRecipes, selectedRecipes, unselectedRecipes, recipes }: MealsContainerProps) => {
    const classes = useStyles();


    const { setModal: setSelectionModal, isModalOpen: isSelectionModalOpen } = useModal('replace-recipe')
    const { setModal: setDetailsModal } = useModal('recipe')


    const handleAddMeal = () => {
        let randomIndex = Math.floor(Math.random() * unselectedRecipes.length)
        let newSelectedRecipes = [...selectedRecipes]
        newSelectedRecipes.push(unselectedRecipes[randomIndex])

        return handleUpdateSelectedRecipes(newSelectedRecipes)
    }


    const handleReplaceMeal = ({ e, index, refreshImage, mealToAppend, refreshAppendImage }: handleReplaceMealInterface) => {
        // replace specific
        if (mealToAppend !== undefined && refreshAppendImage !== undefined) {
            let newSelectedRecipes = [...selectedRecipes]
            newSelectedRecipes.splice(index, 1, mealToAppend)

            refreshImage(newSelectedRecipes[index].image)
            
            let { newUnselectedRecipes } = handleUpdateSelectedRecipes(newSelectedRecipes)

            if (isSelectionModalOpen.current) {
                setSelectionModal({
                    props: {
                        mealToReplace: index,
                        unselectedRecipes: newUnselectedRecipes,
                        currentRecipe: newSelectedRecipes[index],
                        handleReplaceMeal,
                        setSelectionModal,
                        refreshImage
                    }
                })
            }
        } else {
            // replace random
            let randomIndex = Math.floor(Math.random() * unselectedRecipes.length)
            let newSelectedRecipes = [...selectedRecipes]
    
            newSelectedRecipes.splice(index, 1, unselectedRecipes[randomIndex])
    
            refreshImage(newSelectedRecipes[index].image)
    
            return handleUpdateSelectedRecipes(newSelectedRecipes)
        }
    }


    const handleOpenSelectionModal = ({ index, refreshImage } : handleOpenSelectionInterface) => {
        setSelectionModal({
            props: {
                mealToReplace: index,
                unselectedRecipes,
                currentRecipe: selectedRecipes[index],
                handleReplaceMeal,
                setSelectionModal,
                refreshImage
            }
        })
    }

    const handleOpenDetailsModal = ({ e, recipe } : handleOpenDetailsInterface) => {
        if (e.target && e.target.id !== 'blacklist_onclick_toggle') {
            setDetailsModal({
                params: {
                    id: recipe.id
                }
            })
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
                                        handleReplaceMeal={handleReplaceMeal}
                                        handleOpenDetailsModal={handleOpenDetailsModal}
                                        handleOpenSelectionModal={handleOpenSelectionModal}
                                    />
                                )
                            })
                        }
                        {
                            selectedRecipes.length < 9 && (
                                <AddMeal
                                    handleAddMeal={handleAddMeal}
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