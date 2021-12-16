import { Grid, Typography, Skeleton } from '@mui/material';
import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        title: {
            fontSize: '28px !important',
            margin: `${theme.spacing(1, 1, 0, 0)} !important`,
            width: 'auto',
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            margin: `${theme.spacing(0, 0, 4, 0)} !important`,
        },
        selectInput: {
            width: 60,
            height: 40,
            margin: theme.spacing(0.75, 1, 0, 0.25),
        }
    })
)


const DynamicTitle = ({ nbrMeals, nbrPersons, setNbrMeals, setNbrPersons, loading }) => {
    const classes = useStyles();

    return (
        <>
            {
                loading ? (
                    <Skeleton variant="text" width={500} height={64} />
                ) : (
                    <Grid className={classes.titleContainer}>
                        {
                            'Préparons votre liste de course de'.split(' ').map((word, index) => (
                                <Typography key={index} className={classes.title} variant="body1">
                                    {word}
                                </Typography>
                            ))
                        }
                        <FormControl>
                            <Select
                                id="number-meals-select"
                                value={nbrMeals}
                                onChange={(e) => { setNbrMeals(e.target.value) }}
                                className={classes.selectInput}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={6}>6</MenuItem>
                                <MenuItem value={7}>7</MenuItem>
                                <MenuItem value={8}>8</MenuItem>
                                <MenuItem value={9}>9</MenuItem>
                            </Select>
                        </FormControl>
                        {
                            'repas pour'.split(' ').map((word, index) => (
                                <Typography key={index} className={classes.title} variant="body1">
                                    {word}
                                </Typography>
                            ))
                        }
                        <FormControl>
                            <Select
                                id="number-meals-select"
                                value={nbrPersons}
                                onChange={(e) => { setNbrPersons(e.target.value) }}
                                className={classes.selectInput}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                            </Select>
                        </FormControl>
                        <Typography className={classes.title} variant="body1">
                            personne{nbrPersons > 1 ? 's' : ''}
                        </Typography>
                    </Grid>
                )
            }
        </>
    )
}

export default DynamicTitle