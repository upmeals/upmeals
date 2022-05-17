import { Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import AlimentaryManager from './manager/AlimentaryManager';
import UstensilsManager from './manager/UstensilsManager';
import PreferencesManager from './manager/PreferencesManager';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        notchedOutline: {
            borderColor: '#B3B6B7 !important',
        },
        modalProfile: {
            padding: '1rem',
            display: 'flex !important',
            flexDirection: 'column !important',
            justifyContent: 'flex-start !important',
            alignItems: 'flex-start !important',
        },
    })
)

// Component
const ProfileForm = () => {
    const classes = useStyles();

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
            >
                {/* Section AvatarManager  */}
                <div>section AvatarManager</div>

                {/* Section PreferencesManager  */}
                <PreferencesManager />
            </Grid>

            <Grid>
                <h4>Contraintes Alimentaires</h4>
                <AlimentaryManager />
            </Grid>

            <Grid>
                <h4>Ustensiles</h4>
                <UstensilsManager />
            </Grid>

        </Grid>
    )
}

export default (ProfileForm) 