import { Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';


// Component classes
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            fontSize: '28px !important',
            width: 'auto',
            fontFamily: 'poppins, sans-serif',
            fontWeight: 400,
            margin: 0,
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 0,
            marginBottom: '40px',
        },
        subtitle: {
            fontSize: '16px !important',
            width: 'auto',
            fontFamily: 'poppins, sans-serif',
            fontWeight: 400,
            margin: 0,
            color: "#707070"
        },
    })
)

interface TitleProps {
    title: string,
    subtitle: string,
}


const DynamicTitle = ({title, subtitle} : TitleProps) => {
    const classes = useStyles();

    return (
        <Grid 
            className={classes.titleContainer}
            direction='column'
            container
            alignItems='flex-start'
        >
            <h1 className={classes.title}>
                {title}
            </h1>
            <p className={classes.subtitle}>
                {subtitle}
            </p>
        </Grid>
    )
}

export default DynamicTitle