import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';


const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            maxWidth: 220,
            borderRadius: '20px !important',
            margin: theme.spacing(1, 2, 2, 2),
            backgroundColor: "#FFF!important",
            '&:hover': {
                backgroundColor: "#FFF!important"
            }
        },
        rootButton: {
            boxShadow: "none!important",
            "&:hover $focusHighlight": {
                opacity: '0!important'
            }
        },
        focusHighlight: {},
        cardContainer: {
            padding: '0px !important'
        },
        media: {
            height: 220,
            maxWidth: 220,
            borderRadius: '16px 16px 0px 0px !important',
        },
        cardInfos: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            marginTop: 15,
            marginBottom: 10,
            paddingLeft: 16,
            paddingRight: 16,
            minHeight: '43px'
        },
        cardInfoContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '15px!important'
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
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'end',
            minHeight: '43px'
        },
        cardActionItem: {
            fontSize: '11px !important',
            fontWeight: '200',
            borderRadius: '15px!important',
            padding: '6px 0',
            textTransform: 'none!important',
            backgroundColor: '#56BB7F!important',
            color: '#FFF!important',
            '&:hover': {
                backgroundColor: '#52B579!important'
            }
        }
    })
)

const SelectionCard = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea classes={{ root: classes.rootButton, focusHighlight: classes.focusHighlight }}>
                <CardMedia
                    className={classes.media}
                    image='https://via.placeholder.com/220X220'
                />
                <CardContent className={classes.cardContainer}>
                    <Typography className={classes.cardTitle} gutterBottom variant="body1" component="p">
                        Sauté de poulet brocolis cajou
                    </Typography>
                    <Typography className={classes.cardInfoContainer} variant="body2" component="div" >
                        <Typography className={classes.cardInfos} variant="body2" component="div">
                            <Typography className={classes.cardInfosContent} variant="body2" component="p">
                                <AccessTimeOutlinedIcon fontSize="small" className={classes.cardInfosIcon} /> 25mn.
                            </Typography>
                            <Typography className={classes.cardInfosContent} variant="body2" component="p">
                                4,5€/pers.
                            </Typography>
                        </Typography>
                        <Typography className={classes.cardActionContainer} variant="body2" component="div">
                            <Button className={classes.cardActionItem} variant="outline">Choisir</Button>
                        </Typography>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}


export default (SelectionCard)