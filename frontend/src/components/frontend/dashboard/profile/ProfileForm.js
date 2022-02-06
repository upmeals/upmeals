import { Grid, Typography, TextField, InputLabel, Checkbox, Link, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
//import { deepOrange, grey } from '@mui/material/colors';
import React from 'react';
import withAuth from '../../../hoc/withAuth';
import useAllRecords from '../../../../hooks/useAllRecords';
import { useHistory } from 'react-router-dom';
import AlimentaryManager from '../command/AlimentaryManager';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        notchedOutline: { 
            borderColor: '#B3B6B7 !important',
        },
        modalProfile: {
            padding: '1rem',
        },
    })
)

// Component
const ProfileForm = ({ }) => {
    const classes = useStyles();
    const history = useHistory();
    
    const { loading: loadingConstraints } = useAllRecords('constraints');

    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            className={classes.modalProfile}
        >
    
         <Grid
            container
            direction="row"
            justifyContent="space-between"
            marginTop="2rem"
            marginBottom="2rem"
         >  
            {/* Section AvatarManager  */}
            <div>section AvatarManager</div>

            {/* Section PreferencesManager  */}
            <div>section PreferencesManager</div>
         </Grid>

         <Grid
            container
            justifyContent="flex-start"
            className={classes.sectionAlimentaryManager}
         >
            {/* Section AlimentaryManager  */}
            <Typography gutterBottom variant="body1" component="p">
                Contraintes alimentaires
            </Typography>

            {/* component filters  */}
            <AlimentaryManager
                loading={loadingConstraints}
            />
         </Grid>
         
        </Grid>
    )
}

export default withAuth(ProfileForm)