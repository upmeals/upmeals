// import Grid from '@material-ui/core/Grid'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AccessTimeOutlinedIcon from '@material-ui/icons/AccessTimeOutlined';
import EuroOutlinedIcon from '@material-ui/icons/EuroOutlined';


const useStyles = makeStyles({
    root: {
      maxWidth: 220,
      borderRadius: 20,
      margin: "10px 0",
      backgroundColor: "#FFF!important",
      '&:hover':{
        backgroundColor: "#FFF!important"
      }
    },
    rootButton: {
        boxShadow: "none!important",
        "&:hover $focusHighlight": {
            opacity: 0
        }      
    },
    focusHighlight: {

    },
    cardContainer:{
        padding: 0
    },
    media: {
      height: 140,
      borderRadius: 20
    },
    cardInfos: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 10,
        paddingLeft: 16,
        paddingRight: 16
    },
    cardTitle: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 16,
        textAlign: 'center'
    },
    cardInfosContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardInfosIcon: {
        marginRight: 5
    },
    cardActionContainer: {
        width: '100%'
    },
    cardActionItem: {
        fontSize: 11,
        fontWeight: 'normal',
        textTransform: 'none',
        '&:hover': {
            background: '#FFF'
        },
        '&:nth-child(odd)':{
            backgroundColor: "#F5F5F4"
        }
    }

  });
  
const MealCard = () => {

    const classes = useStyles();
    return (
        <Card className={classes.root}>
        <CardActionArea classes={{root: classes.rootButton,focusHighlight: classes.focusHighlight}}>
            <CardMedia
            className={classes.media}
            image="https://via.placeholder.com/220"
            title="Rostis de pomme de terre"
            />
            <CardContent className={classes.cardContainer}>
                <Typography className={classes.cardTitle} gutterBottom variant="body1" component="p">
                    Rostis & saumon fumé
                </Typography>
                <Typography className={classes.cardInfos} variant="body2" component="div">
                <Typography className={classes.cardInfosContent} variant="body2" component="p">
                        <AccessTimeOutlinedIcon fontSize="small" className={classes.cardInfosIcon} /> 45 mn. 
                </Typography>
                <Typography className={classes.cardInfosContent} variant="body2" component="p">
                        <EuroOutlinedIcon fontSize="small" className={classes.cardInfosIcon} /> 8,13/pers. 
                </Typography>
                </Typography>
                <Typography className={classes.cardActionContainer} variant="body2" component="div">
                    <Button fullWidth className={classes.cardActionItem} variant="texte">Remplacer aléatoirement</Button>
                    <Button fullWidth className={classes.cardActionItem} variant="texte">Remplacer en recherchant un plat…</Button>
                    <Button fullWidth className={classes.cardActionItem} variant="texte">Remplacer par un plat de ma collection…</Button>
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>   
    )
}


export default (MealCard)