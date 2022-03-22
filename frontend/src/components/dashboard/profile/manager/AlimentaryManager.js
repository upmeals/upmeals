import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button, Skeleton } from '@mui/material';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        filtersContainer: {
            margin: theme.spacing(0, 0, 5),
            gap: '.5rem',
            [`& button`]: {
                margin: theme.spacing(0, 2, 0, 0),
            }
        },
        activeConstraint: {
            backgroundColor: '#F46E59 !important',
            color: 'white !important',
        }
    })
)

const dietaryRequirements = [
    {
        name: 'light',
        text: 'Light',
    },
    {
        name: 'sugar-free',
        text: 'Sans sucre',
    },
    {
        name: 'salt-free',
        text: 'Sans sel',
    },
    {
        name: 'gluten-free',
        text: 'Sans gluten',
    },
    {
        name: 'diabete',
        text: 'Diabete',
    },
    {
        name: 'cholesterol',
        text: 'Cholesterol',
    },
    {
        name: 'vegetarian',
        text: 'Végétarien',
    },
    {
        name: 'vegan',
        text: 'Vegan',
    },
    {
        name: 'proteinaceous',
        text: 'Protéiné',
    },
]

const AlimentaryManager = ({ loading }) => {
    const classes = useStyles();

    const [isActive, setActive] = React.useState([]);

    const toggleClass = (index) => {
        if (!isActive.includes(index)) {
            setActive([...isActive,index])
        } else {
            setActive(isActive.filter(value => value !== index ))
        }
    }

    return (
        <>
            {
                loading ? (
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Skeleton variant="text" width={80} height={48} style={{ margin: '0px 16px 16px 0px' }} />
                        <Skeleton variant="text" width={70} height={48} style={{ margin: '0px 16px 16px 0px' }} />
                        <Skeleton variant="text" width={80} height={48} style={{ margin: '0px 16px 16px 0px' }} />
                        <Skeleton variant="text" width={70} height={48} style={{ margin: '0px 16px 16px 0px' }} />
                        <Skeleton variant="text" width={80} height={48} style={{ margin: '0px 16px 16px 0px' }} />
                    </Grid>
                ) : (
                    <Grid container className={classes.filtersContainer}>
                        {
                            dietaryRequirements.map((constraint, index) => {
                                return (
                                    <Button 
                                        id="protected_label" 
                                        variant="outlined" 
                                        key={index}
                                        index={index}
                                        className={isActive.includes(index) ? classes.activeConstraint : null}
                                        onClick={ () => toggleClass(index) }
                                    >
                                        {constraint.text}
                                    </Button>
                            )
                            })
                        }
                    </Grid>
                )
            }
        </>
    )
}

export default AlimentaryManager