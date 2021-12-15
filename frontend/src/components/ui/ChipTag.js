import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import {createStyles, makeStyles} from "@mui/styles";

const useStyles = makeStyles(theme =>
  createStyles({
    chipsTags: {
      color: '#F46E58 !important',
      borderColor: '#F46E58 !important',
      borderRadius: '15px !important',
      padding: '20px 10px !important',
    }
  })
)

const ChipTag = ({props}) => {
  const classes = useStyles();

  return (
    <Stack direction="row" spacing={1}>
      <Chip label={props[0]} variant="outlined" className={classes.chipsTags}/>
      <Chip label={props[1]} variant="outlined" className={classes.chipsTags}/>
      <Chip label={props[2]} variant="outlined" className={classes.chipsTags}/>
      <Chip label={props[3]} variant="outlined" className={classes.chipsTags}/>
    </Stack>
  );
}

export default ChipTag