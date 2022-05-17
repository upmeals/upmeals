import * as React from 'react';
import { styled, alpha, Box } from '@mui/system';
import SliderUnstyled from '@mui/base/SliderUnstyled';
import { Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useState } from 'react';

const StyledSlider = styled(SliderUnstyled)(
  ({ theme }) => `
  color: ${theme.palette.mode === 'light' ? '#000' : '#90caf9'};
  height: 4px;
  width: 100%;
  padding: 13px 0;
  display: inline-block;
  position: relative;
  cursor: pointer;
  touch-action: none;
  -webkit-tap-highlight-color: transparent;
  opacity: 0.75;
  &:hover {
    opacity: 1;
  }

  & .MuiSlider-rail {
    display: block;
    position: absolute;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
    opacity: 0.38;
  }

  & .MuiSlider-track {
    display: block;
    position: absolute;
    height: 4px;
    border-radius: 2px;
    background-color: currentColor;
  }

  & .MuiSlider-thumb {
    position: absolute;
    width: 14px;
    height: 14px;
    margin-left: -6px;
    margin-top: -5px;
    box-sizing: border-box;
    border-radius: 50%;
    outline: 0;
    border: 2px solid currentColor;
    background-color: #fff;

    :hover,
    &.Mui-focusVisible {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
        0.15,
      )};
    }

    &.Mui-active {
      box-shadow: 0 0 0 0.25rem ${alpha(
        theme.palette.mode === 'light' ? '#1976d2' : '#90caf9',
        0.3,
      )};
    }
  }
`,
);

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        containerSlider: {
            display: 'flex',
            flexDirection: 'row'
        },
        containerSliderValue: {
            backgroundColor: '#F5F5F5',
            width: '90px',
            textAlign: 'center',
            padding: '5px 0',
        },
        SliderPrimary: {
            marginRight: '10px!important',
        }
    })
)

export default function SliderCustom({defaultValue,min,max, suffix}) {
    const classes = useStyles();
    const [slider, setSlider] = useState(defaultValue);
  return (
    <Box sx={{ width: '100%' }} className={classes.containerSlider}>
      <StyledSlider className={classes.SliderPrimary} value={slider} min={min} max={max} onChange={e =>setSlider(e.target.value)} />
      <Typography className={classes.containerSliderValue} component="div" variant="body2">
          <Typography component="p" variant="body2">
            {slider ? `${slider} ${suffix}` : "10"}
          </Typography>
      </Typography>
    </Box>
  );
}
