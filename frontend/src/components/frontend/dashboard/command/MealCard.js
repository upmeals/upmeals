import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            maxWidth: 220,
            borderRadius: '20px !important',
            margin: theme.spacing(1, 4, 4, 0),
            backgroundColor: '#FFFFFF !important',
            cursor: 'pointer',
            outline: 0,
            border: 0,
            '&:hover $cardContainer': {
                background: '#FBFBFA',
                transition: '0.25s !important',
            },
        },
        cardContainer: {
            padding: '0px !important',
            transition: '0.25s !important',
        },
        media: {
            height: 220,
            maxWidth: 220,
            borderRadius: '16px 16px 0px 0px !important',
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
            padding: theme.spacing(1),
            textAlign: 'center',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            textTransform: 'capitalize',
        },
        cardInfosContent: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontWeight: '200 !important',
            fontSize: '15px !important',
        },
        cardInfosIcon: {
            marginRight: 5,
            fontSize: '15px !important',
        },
        cardActionContainer: {
            margin: '16px 0px 0px 0px !important',
            width: '100%'
        },
        cardActionItem: {
            fontSize: '11px !important',
            fontWeight: '200',
            borderRadius: 0,
            padding: '6px 0',
            textTransform: 'none',
            '&:hover': {
                backgroundColor: 'lightgrey!important'
            },
            '&:nth-child(odd)': {
                backgroundColor: "#F5F5F4"
            }
        }
    })
)

const MealCard = ({ recipe, index, handleMealRandom, handleToggleDetails }) => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root} onClick={(e) => { handleToggleDetails({ e, recipe }) }}>
                <Grid>
                    <CardMedia
                        className={classes.media}
                        image={`/images/meals/${index + 1}.svg`}
                        title={recipe.attributes.title}
                    />
                    <CardContent className={classes.cardContainer}>
                        <Typography className={classes.cardTitle} gutterBottom variant="body1" component="p">
                            {recipe.attributes.title}
                        </Typography>
                        <Typography className={classes.cardInfos} variant="body2" component="div">
                            <Typography className={classes.cardInfosContent} variant="body2" component="p">
                                <AccessTimeOutlinedIcon fontSize="small" className={classes.cardInfosIcon} /> 25mn.
                            </Typography>
                            <Typography className={classes.cardInfosContent} variant="body2" component="p">
                                4,5€/pers.
                            </Typography>
                        </Typography>
                        <Typography className={classes.cardActionContainer} variant="body2" component="div">
                            <Button id="blacklist_onclick_toggle" fullWidth className={classes.cardActionItem} variant="text" onClick={() => { handleMealRandom(null, index) }}>Remplacer aléatoirement</Button>
                            <Button id="blacklist_onclick_toggle" fullWidth className={classes.cardActionItem} variant="text">Remplacer en recherchant un plat</Button>
                        </Typography>
                    </CardContent>
                </Grid>
            </Card>
        </>
    )
}


export default (MealCard)