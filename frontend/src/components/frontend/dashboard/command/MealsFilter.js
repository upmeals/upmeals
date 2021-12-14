import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button } from '@mui/material';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        filtersContainer: {
            margin: theme.spacing(0, 0, 5),
        }
    })
)


const MealsFilter = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.filtersContainer}>
            <Button>Prix/pers.</Button>
            <Button>Temps</Button>
            <Button>Régime</Button>
            <Button>Origine</Button>
            <Button>Ajouter des préférences</Button>
        </Grid>
    )
}

export default MealsFilter