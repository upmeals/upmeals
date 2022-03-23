import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button, Skeleton } from '@mui/material';
import { directusUsersUpdate } from '../../../../services/gql/System';
import { GetAuthCurrentUser } from '../../../../store/auth';

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

const AlimentaryManager = () => {
    const classes = useStyles();

    const user = GetAuthCurrentUser()

    const [constraints, setConstraints] = React.useState([]);
    const [ready, setReady] = React.useState(false);

    const handleToggleConstraint = async (constraintName) => {
        let newConstraints = []
        if (constraints.includes(constraintName)) {
            newConstraints = constraints.filter((constraint) => (constraint !== constraintName))
        } else {
            newConstraints = [...constraints, constraintName]
        }
        await directusUsersUpdate({ id: user.id, data: { constraints: newConstraints } })
        setConstraints(newConstraints)
    }

    useEffect(() => {
        if (user && user.constraints) {
            setConstraints(user.constraints)
            setReady(true)
        }
    }, [user])

    return (
        <>
            {
                !ready ? (
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
                                        className={constraints.includes(constraint.name) ? classes.activeConstraint : null}
                                        onClick={() => handleToggleConstraint(constraint.name)}

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