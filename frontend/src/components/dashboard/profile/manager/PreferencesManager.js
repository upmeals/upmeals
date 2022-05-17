import { Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import SliderCustom from './SliderCustom';
// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        notchedOutline: {
            borderColor: '#B3B6B7 !important',
        },
        containerSliderGlobal: {
            width: '70% !important',
        },
        containerContent: {
            padding: '10px 0 0 0 !important',
            '&:first-child': {
                padding: '0!important',
            }
        }
    })
)

// Component
const PreferencesManager = () => {
    const classes = useStyles();

    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            className={classes.containerSliderGlobal}
        >
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.containerContent}>
                <Grid item xs={6}>
                    <Typography variant="body2" component="p">
                        Nombre de personnes dans mon foyer:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <SliderCustom defaultValue={"2"} min={0} max={10} suffix={'pers.'} />
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.containerContent}>
                <Grid item xs={6}>
                    <Typography variant="body2" component="p">
                        Budget maximum par repas par personne:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <SliderCustom defaultValue={"12"} min={5} max={50} suffix={'€'} />
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.containerContent}>
                <Grid item xs={6}>
                    <Typography variant="body2" component="p">
                        Temps maxium de préparation par repas:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <SliderCustom defaultValue={"20"} min={5} max={60} suffix={'min'} />
                </Grid>
            </Grid>
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                className={classes.containerContent}>
                <Grid item xs={6}>
                    <Typography variant="body2" component="p">
                        Calories maximum par repas par personne:
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <SliderCustom defaultValue={"400"} min={50} max={1000} suffix={'kcal'} />
                </Grid>
            </Grid>
        </Grid>
    )
}

export default (PreferencesManager) 