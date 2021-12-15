// import { defineMessages, injectIntl } from 'react-intl';
import { Grid, Modal, Box, Typography, Skeleton } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import React, { useEffect } from 'react';
import SelectionCard from './SelectionCard'

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            borderRadius: theme.spacing(2),
            height: '500px',
            minHeight: '85vh',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            padding: theme.spacing(2),
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
const SelectionModal = ({ selectionModalOpen, handleToggleSelection, selectedRecipies, unselectedRecipies, handleMealRandom }) => {
    const classes = useStyles();

    let replaceMeal = selectionModalOpen !== false ? parseInt(selectionModalOpen.split('=')[1]) : false

    useEffect(() => {
        if (selectedRecipies.length < replaceMeal || false) {
            handleToggleSelection()
        }
    // eslint-disable-next-line
    }, [selectedRecipies])

    return (
        <Modal
            open={selectionModalOpen !== false}
            onClose={handleToggleSelection}
        >
            <Box className={classes.modalContainer}>
                <Typography variant="h3" className={classes.title}>
                    Choisissez un plat et ajoutez le dans votre liste
                </Typography>
                {
                    unselectedRecipies.length === 0 ? (
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
                                unselectedRecipies.slice(0, 9).map((recipe, index) => (
                                    <SelectionCard recipe={recipe} key={index} index={index} handleMealRandom={handleMealRandom} replaceMeal={replaceMeal} />
                                ))
                            }
                        </Grid>
                    )
                }
            </Box>
        </Modal>
    )
}

export default SelectionModal