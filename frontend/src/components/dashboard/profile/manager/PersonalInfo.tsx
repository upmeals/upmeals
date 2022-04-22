import React from 'react';
import { GetAuthCurrentUser } from '../../../../store/auth';
import { Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { directusUsersUpdateCurrent } from '../../../../services/gql/System';

// CSS class
const useStyles = makeStyles((theme: Theme) =>
  createStyles({})
)

const PersonalInfo = (): JSX.Element => {
  const classes = useStyles();

  let currentUser = GetAuthCurrentUser();

  const handleUpdateCurrentUser = async () => {
    await directusUsersUpdateCurrent({data: { first_name: 'test' }});
  };

  return (
    <>
      <h4>Mon adresse</h4>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <div>
            <h4>Civilité</h4>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <FormControlLabel value="female" control={<Radio />} label="Mme" />
                <FormControlLabel value="male" control={<Radio />} label="M." />
              </RadioGroup>
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <h4>Nom / Prénom</h4>
            <input type="text"/>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <h4>N° et nom de rue</h4>
            <input type="text"/>
          </div>
        </Grid>
      </Grid>
    </>
  )
}

export default PersonalInfo;