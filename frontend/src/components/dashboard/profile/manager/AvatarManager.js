import React, { useEffect } from 'react';
import { createStyles, makeStyles } from '@mui/styles';
import { Grid, Button } from '@mui/material';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        inputProfileName: {
            minWidth: 0,
            fontSize: '1,5rem',
            fontWeight: 700,
            lineHeight: 1.5,
            border: 'none',
            borderRadius: '8px',
            padding: '6px 6px',
            }
    })
)

const AvatarManager = () => {
    const classes = useStyles();

    const [name, setName] = React.useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    useEffect(() => {
        setName('');
    }, []);

    return (
        <Grid
        >
            Bonjour,
            <input
                className={classes.inputProfileName}
                type="text"
                placeholder="Renseignez votre prénom"
                value={name}
                onChange={handleChange}
            />
            <Button 
                className={classes.formBtn} 
                variant="contained" 
                type="submit"
                color="primary"
                onClick={() => setName(name)}
            >
                Enregistrer
            </Button>
        </Grid>
    )
}

export default AvatarManager