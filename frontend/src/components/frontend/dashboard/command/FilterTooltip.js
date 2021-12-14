import React from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Tooltip, Typography, Slider, ClickAwayListener } from '@mui/material';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        tooltipContainer: {
            padding: theme.spacing(1),
            color: 'black',
            width: 200,
        },
        sliderContainer: {
            margin: theme.spacing(1, 1),
            width: 'calc(100% - 16px) !important',
        }
    })
)


const FilterTooltip = ({ index, filters, setFilters, currentFilter, open, onClose, children }) => {
    const classes = useStyles();

    const [value, setValue] = React.useState(currentFilter.value)

    const handleChange = (_, activeThumb) => {
        setValue(activeThumb)
    };

    const handleChangeCommit = () => {
        let newFilters = filters
        newFilters[index] = {
            ...currentFilter,
            value
        }
        setFilters(filters)
    }

    const handleOnClose = (e) => {
        if (e.target.id !== 'protected_label') {
            onClose()
        }

        return
    }

    const marks = []
    for (let index = 0; index < 5; index++) {
        const space = (currentFilter.max - currentFilter.min) / 4
        const v = Math.floor(currentFilter.max - space * index)

        marks.push({
            value: v,
            label: `${v}${currentFilter.symbol}`
        })
    }

    return (
        <div>
            <ClickAwayListener
                onClickAway={handleOnClose}
            >
                <div id="protected_label">
                    <Tooltip
                        id="protected_label"
                        PopperProps={{
                            disablePortal: true,
                        }}
                        disableFocusListener
                        disableHoverListener
                        disableTouchListener
                        open={open}
                        onClose={onClose}
                        placement="bottom-start"
                        title={
                            <Grid className={classes.tooltipContainer} id="protected_label">
                                <Typography variant="body2" id="protected_label">
                                    {currentFilter.textTooltip}
                                </Typography>
                                <Grid id="protected_label">
                                    <Slider
                                        id="protected_label"
                                        className={classes.sliderContainer}
                                        value={value}
                                        onChange={handleChange}
                                        onChangeCommitted={handleChangeCommit}
                                        valueLabelDisplay="auto"
                                        disableSwap
                                        step={1}
                                        max={currentFilter.max}
                                        min={currentFilter.min}
                                        marks={marks}
                                    />
                                </Grid>
                            </Grid>
                        }
                    >
                        {children}
                    </Tooltip>
                </div>
            </ClickAwayListener>
        </div>
    )
}

export default FilterTooltip