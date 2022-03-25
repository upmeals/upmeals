import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button, Skeleton } from '@mui/material';
import { GetAuthCurrentUser } from '../../../../store/auth';
import { directusUsersUpdate } from '../../../../services/gql/System';

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

const UstensilsManager = () => {
    const classes = useStyles();

    const user = GetAuthCurrentUser()

    const [ustensils, setUstensils] = React.useState([]);
    const [ready, setReady] = React.useState(false);

    const handleToggleUstensils = async (ustensilName) => {
        let newUstensils = []
        if (ustensils.includes(ustensilName)) {
            newUstensils = ustensils.filter((ustensil) => (ustensil !== ustensilName))
        } else {
            newUstensils = [...ustensils, ustensilName]
        }
        await directusUsersUpdate({ id: user.id, data: { ustensils: newUstensils } })
        setUstensils(newUstensils)
    }

    useEffect(() => {
        if (user && user.ustensils) {
            setUstensils(user.ustensils)
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
                            ustensilesRequirements.map((ustensil, index) => {
                                return (
                                    <Button 
                                        id="protected_label" 
                                        variant="outlined" 
                                        key={index}
                                        index={index}
                                        className={ustensils.includes(ustensil.name) ? classes.activeConstraint : null}
                                        onClick={ () => handleToggleUstensils(ustensil.name) }
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