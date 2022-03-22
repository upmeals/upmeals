import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button, Skeleton } from '@mui/material';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        filtersContainer: {
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

const ustensilesRequirements = [
    {
        name: 'four',
        text: 'Four',
    },
    {
        name: 'micro-onde',
        text: 'Micro-onde',
    },
    {
        name: 'auto-cuiseur',
        text: 'Auto-cuiseur',
    },
    {
        name: 'plaques',
        text: 'Plaques',
    },
    {
        name: 'friteuse',
        text: 'Friteuse',
    },
    {
        name: 'robot-mixeur',
        text: 'Robot-mixeur',
    },
    {
        name: 'mixeur',
        text: 'Mixeur',
    },
]

const UstensilsManager = ({ loading }) => {
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
                            ustensilesRequirements.map((ustensil, index) => {
                                return (
                                    <Button 
                                        id="protected_label" 
                                        variant="outlined" 
                                        key={index}
                                        index={index}
                                        className={isActive.includes(index) ? classes.activeConstraint : null}
                                        onClick={ () => toggleClass(index) }
                                    >
                                        {ustensil.text}
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

export default UstensilsManager