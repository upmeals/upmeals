import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Typography, Skeleton } from '@mui/material';

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


const MealsContainer = ({ selectedRecipies }) => {
    const classes = useStyles();

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
                                    <Grid key={index} className={classes.mealContainer}>
                                        <Typography variant="body2">
                                            {recipe.attributes.title}
                                        </Typography>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                )
            }
        </>
    )
}

export default MealsContainer