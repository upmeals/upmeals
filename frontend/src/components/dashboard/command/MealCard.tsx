import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { useImage } from '../../../hooks/useImage';
import { Theme } from '@mui/system';
import { Recipe } from '../../../interfaces/Collections';


const useStyles = makeStyles((theme: Theme) =>
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


interface MealCardProps {
    index: number,
    recipe: Recipe,
    handleReplaceMeal: any,
    handleOpenSelectionModal: any,
    handleOpenDetailsModal: any,
}


const MealCard = ({ index, recipe, handleReplaceMeal, handleOpenSelectionModal, handleOpenDetailsModal } : MealCardProps) => {
    const classes = useStyles();
    const { src, refreshImage } = useImage({
        image: (recipe && recipe.image) ? (recipe.image) : (undefined),
        key: 'small'
    })

    return (
        <>
            <Card className={classes.root} onClick={(e) => { handleOpenDetailsModal({ e, recipe }) }}>
                <Grid>
                    <img
                        className={classes.media}
                        src={src}
                        alt={recipe.title}
                    />
                    <CardContent className={classes.cardContainer}>
                        <Typography className={classes.cardTitle} gutterBottom variant="body1" component="p">
                            {recipe.title}
                        </Typography>
                        <Typography className={classes.cardInfos} variant="body2" component="div">
                            <Typography className={classes.cardInfosContent} variant="body2" component="p">
                                <AccessTimeOutlinedIcon fontSize="small" className={classes.cardInfosIcon} /> {recipe.preparation_time}mn.
                            </Typography>
                            <Typography className={classes.cardInfosContent} variant="body2" component="p">
                                {recipe.price}€/pers.
                            </Typography>
                        </Typography>
                        <Typography className={classes.cardActionContainer} variant="body2" component="div">
                            <Button
                                id="blacklist_onclick_toggle"
                                fullWidth
                                className={classes.cardActionItem}
                                variant="text"
                                onClick={
                                    (e) => {
                                        handleReplaceMeal({ e, index, refreshImage })
                                    }
                                }
                            >
                                Remplacer aléatoirement
                            </Button>
                            <Button
                                id="blacklist_onclick_toggle"
                                fullWidth
                                className={classes.cardActionItem}
                                variant="text"
                                onClick={
                                    (e) => { 
                                        handleOpenSelectionModal({ index, refreshImage }) 
                                    }
                                }
                            >
                                Remplacer en recherchant un plat
                            </Button>
                        </Typography>
                    </CardContent>
                </Grid>
            </Card>
        </>
    )
}


export default (MealCard)