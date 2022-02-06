import { Grid, Typography, TextField, InputLabel, Checkbox, Link, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
//import { deepOrange, grey } from '@mui/material/colors';
import React from 'react';
import { useFormik } from 'formik';
import withAuth from '../../../hoc/withAuth';
import { useHistory } from 'react-router-dom';


// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        notchedOutline: { 
            borderColor: '#B3B6B7 !important',
        },

    })
)

// Component
const ProfileForm = ({ }) => {
    const classes = useStyles();
    const history = useHistory();
    
    const formik = useFormik({
        onSubmit: async (values) => {
            return history.push('')
        }
    });

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
        >
            
        </Grid>
    )
}

export default withAuth(ProfileForm)