// import { defineMessages, injectIntl } from 'react-intl';
import { Grid, Box, Typography, Skeleton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { Recipe } from '../../../interfaces/Collections';
import SelectionCard from './SelectionCard'
import { Theme } from '@mui/system';


// Component classes
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalContainer: {
            width: '70vw',
            height: '500px',
            minHeight: '85vh',
            padding: theme.spacing(4),
            borderRadius: theme.spacing(2),
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            '&:focus-visible': {
                outline: 'unset',
            },
        },
        cardContainer: {
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            overflow: 'auto',
            '&:focus-visible': {
                outline: 'unset',
            },
        },
        fakeMealContainer: {
            margin: theme.spacing(2, 2),
        },
        title: {
            fontSize: '24px !important',
            margin: `${theme.spacing(1, 0, 4, 3)} !important`,
        },
    })
)


interface SelectionModalProps {
    unselectedRecipes: Recipe[],
    currentRecipe: Recipe,
    mealToReplace: number,
    handleReplaceMeal: any,
    refreshImage: any,
}


// Component
const SelectionModal = ({
    unselectedRecipes,
    currentRecipe,
    handleReplaceMeal,
    mealToReplace,
    refreshImage
}:
    SelectionModalProps
) => {
    const classes = useStyles();

    return (
        <Box className={classes.modalContainer}>
            <Typography variant="h3" className={classes.title}>
                Choisissez un plat et ajoutez le dans votre liste
            </Typography>
            {
                !unselectedRecipes || unselectedRecipes.length === 0 ? (
                    <Grid container className={classes.cardContainer}>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                        <Grid className={classes.fakeMealContainer}>
                            <Skeleton variant="rectangular" width={220} height={220} />
                            <Skeleton variant="text" width={220} />
                            <Skeleton variant="text" width={220} />
                        </Grid>
                    </Grid>
                ) : (
                    <Grid className={classes.cardContainer}>
                        {
                            unselectedRecipes.slice(0, 9).map((recipe, index) => {
                                return (
                                    <SelectionCard
                                        recipe={recipe}
                                        key={index}
                                        mealToReplace={mealToReplace}
                                        handleReplaceMeal={handleReplaceMeal}
                                        currentRecipe={currentRecipe}
                                        refreshImage={refreshImage}
                                    />
                                )
                            })
                        }
                    </Grid>
                )
            }
        </Box>
    )
}

export default SelectionModal