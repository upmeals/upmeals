// import { defineMessages, injectIntl } from 'react-intl';
import { Grid, Modal, Box, Typography, Skeleton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import SelectionCard from './SelectionCard'

// Component classes
const useStyles = makeStyles(theme =>
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

// Component
const SelectionModal = ({ selectedRecipes, unselectedRecipes, handleMealRandom, handleClose, replaceMealIndex, refreshImage }) => {
    const classes = useStyles();

    console.log(handleMealRandom)

    // let replaceMeal = selectionModalOpen !== false ? parseInt(selectionModalOpen.split('=')[1]) : false

    // useEffect(() => {
    //     if (selectedRecipes.length < replaceMeal || false) {
    //         handleToggleSelection()
    //     }
    //     // eslint-disable-next-line
    // }, [selectedRecipes])

    return (
        <Box className={classes.modalContainer}>
            <Typography variant="h3" className={classes.title}>
                Choisissez un plat et ajoutez le dans votre liste
            </Typography>
            {
                unselectedRecipes.length === 0 ? (
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
                            unselectedRecipes.slice(0, 9).map((recipe, index) => (
                                <SelectionCard recipe={recipe} key={index} index={index} handleMealRandom={handleMealRandom} replaceMeal={replaceMealIndex} refreshImage={refreshImage} />
                            ))
                        }
                    </Grid>
                )
            }
        </Box>
    )
}

export default SelectionModal