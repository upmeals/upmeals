// import React, { useState } from 'react';
// import { GetAuthCurrentUser } from '../../../../store/auth';
import { Grid, TextField } from '@mui/material';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
// import { createStyles, makeStyles } from '@mui/styles';
// import { Theme } from '@mui/system';
// import { directusUsersUpdateCurrent } from '../../../../services/gql/System';
import {Field, Formik, FormikProps, FormikValues } from 'formik';
// import { useHistory } from 'react-router-dom';

// CSS class
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({})
// )

const PersonalInfo = (): JSX.Element => {
  // const classes = useStyles();

  // const [name, setName] = useState('');
  // const [adress, setAdress] = useState('');

  // const submitValue = () => {
  //   const valueDetails = {
  //     'name': name,
  //     'adresse': adress
  //   }
  //   console.log(valueDetails);
  // }

  // let currentUser = GetAuthCurrentUser();

  // const handleUpdateCurrentUser = async () => {
  //   await directusUsersUpdateCurrent({data: { first_name: 'test' }});
  // };

  return (
    <>
      <h4>Mon adresse</h4>
      <Grid container spacing={2}>
        <Formik
          initialValues={{
            first_name: '',
            location: '',
            picked: '',
            // numero_et_nom_rue: '',
          }}
          onSubmit={ async (values, { setSubmitting }) => {

            // let response = await directusUsersUpdateCurrent({
            //   data: {
            //     first_name: values.first_name,
            //     // last_name: values.last_name,
            //     location: values.location,
            //     civility: JSON.stringify(values.picked),
            //     // numero_et_nom_rue: values.numero_et_nom_rue,
            //   }
            // });

            // if (response && response.error) {
            //     if (response.error === 'otp_missing') {
            //         setIsOtpNecessary(true)
            //     }
            // } else {
            //     history.push('/command')
            // }

            // if (response) {
            //   console.log(response);
            //   history.push('/command');
            // }
          }}
        >
          {
            (formikProps: FormikProps<FormikValues>) => (
              <form onSubmit={formikProps.handleSubmit}>
                <Grid container>
                  <Grid item xs={6}>
                    <div>
                      <h4>Civilité</h4>
                      {/*<FormControl>*/}
                      {/*  <RadioGroup*/}
                      {/*    row*/}
                      {/*    aria-labelledby="demo-row-radio-buttons-group-label"*/}
                      {/*    name="row-radio-buttons-group"*/}
                      {/*  >*/}
                      {/*    <FormControlLabel*/}
                      {/*      value="female"*/}
                      {/*      control={<Radio />}*/}
                      {/*      label="Mme" />*/}
                      {/*    <FormControlLabel value="male" control={<Radio />} label="M." />*/}
                      {/*  </RadioGroup>*/}
                      {/*</FormControl>*/}
                      <div id="my-radio-group">Picked</div>
                      <div role="group" aria-labelledby="my-radio-group">
                        <label>
                          <Field type="radio" name="picked" value={formikProps.values.picked} onChange={formikProps.handleChange}/>
                          Mme
                        </label>
                        <label>
                          <Field type="radio" name="picked" value={formikProps.values.picked} onChange={formikProps.handleChange}/>
                          M.
                        </label>
                      </div>
                    </div>
                  </Grid>
                  <Grid>
                    <div>
                      <h4>Prénom</h4>
                      <TextField
                        id="first_name"
                        name="first_name"
                        label="Prénom"
                        value={formikProps.values.first_name}
                        onChange={formikProps.handleChange}
                      />
                    </div>
                  </Grid>
                  <Grid>
                    <div>
                      <h4>N° et nom de rue</h4>
                      <TextField
                        id="location"
                        name="location"
                        label="N° et nom de rue"
                        value={formikProps.values.location}
                        onChange={formikProps.handleChange}
                      />
                    </div>
                  </Grid>
                  <Button variant="contained" type="submit">Send</Button>
                </Grid>
              </form>
            )
          }
        </Formik>
      </Grid>
    </>
  )
}

export default PersonalInfo;