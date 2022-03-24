import React from 'react'
import { Typography, Grid } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
    })
)


interface ModelComponentProps {
    example: string
}



const ModelComponent = ({ example } : ModelComponentProps) => {
    const classes = useStyles()

    return (
        <Grid container>
            <Typography>Component Model</Typography>
        </Grid >
    )
}


export default ModelComponent