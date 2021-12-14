import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button, Skeleton } from '@mui/material';
import FilterTooltip from './FilterTooltip';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        filtersContainer: {
            margin: theme.spacing(0, 0, 5),
            [`& button`]: {
                margin: theme.spacing(0, 2, 0, 0),
            }
        }
    })
)


const MealsFilter = ({ loading }) => {
    const classes = useStyles();

    const [activeFilter, setActiveFilter] = React.useState(null)
    const [filters, setFilters] = React.useState([
        {
            name: 'prix',
            text: 'Prix/pers.',
            textTooltip: 'Prix par personne',
            min: 3,
            max: 50,
            value: [3, 50], // [min, max]
            symbol: '€'
        },
        {
            name: 'temps',
            text: 'Temps',
            textTooltip: 'Temp de préparation',
            min: 5,
            max: 60,
            value: [5, 60], // [min, max]
            symbol: 'm'
        }
    ])

    const handleActiveFilter = (filterName) => {
        setActiveFilter(filterName)
    }

    const handleCloseFilter = () => {
        setActiveFilter(null)
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
                    </Grid>
                ) : (
                    <Grid container className={classes.filtersContainer}>
                        {
                            filters.map((filter, index) => {
                                return (
                                    <FilterTooltip
                                        id="protected_label"
                                        key={index}
                                        index={index}
                                        activeFilter={activeFilter}
                                        setActiveFilter={setActiveFilter}
                                        filters={filters}
                                        setFilters={setFilters}
                                        currentFilter={filter}
                                        open={(filter.name === activeFilter)}
                                        onClose={handleCloseFilter}
                                    >
                                        <Button id="protected_label" variant="outlined" onClick={() => { handleActiveFilter(filter.name) }}>{filter.text}</Button>
                                    </FilterTooltip>
                                )
                            })
                        }
                        {/* <FilterTooltip
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        >
                            <Button variant="outlined" onClick={() => { handleActiveFilter('prix') }}>Prix/pers.</Button>
                        </FilterTooltip>
                        <FilterTooltip
                            activeFilter={activeFilter}
                            setActiveFilter={setActiveFilter}
                        >
                            <Button variant="outlined" onClick={() => { handleActiveFilter('temps') }}>Temps</Button>
                        </FilterTooltip> */}
                    </Grid>
                )
            }
        </>
    )
}

export default MealsFilter