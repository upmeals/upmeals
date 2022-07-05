import React, { useEffect } from 'react'
import { Typography, Grid, Button } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import Page from '../../ui/Page';
import { GetMeals } from '../../../store/init';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


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
        },
        button: {
            margin: `${theme.spacing(0, 4, 8, 4)} !important`,
            backgroundColor: theme.palette.primary.main,
        }
    })
)



const RecapPage = () => {
    const classes = useStyles()

    const history = useHistory()

    const meals = GetMeals()

    const [ingredients, setIngredients] = React.useState<any[]>([])

    useEffect(() => {
        if (meals?.length) {
            let newIngredients: any[] = []

            meals.forEach((meal: any) => {
                newIngredients.push(...meal.ingredients)
            });

            let groupedNewIngredients = Object.values(
                _.groupBy(newIngredients, 'ingredient.name')
            ).map(
                (value) => {
                    let newValue = {
                        ingredient: value[0].ingredient,
                        unit: value[0].unit,
                        value: value.reduce((acc, curr) => acc + curr.value, 0)
                    }
                    return newValue
                }
            )

            setIngredients(groupedNewIngredients)
        } else {
            history.push('/command')
        }
    }, [meals]) // eslint-disable-line

    const printDocument = () => {
        const input = document.getElementById('capture');
        html2canvas(input as HTMLElement)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'JPEG', 0, 0, 100, 100);
                pdf.save("download.pdf");
            })
            ;
    }

    return (
        <Page>
            <Grid
                id="capture"
                style={{
                    marginTop: '10px',
                    marginLeft: '25px',
                    marginBottom: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    width: '300px',
                    height: '300px',
                }}
            >
                {
                    ingredients && ingredients.length ? (
                        ingredients.map((ingredient: any, index: number) => (
                            <Typography className={classes.cardTitle} gutterBottom variant="body1" component="p" key={index}>
                                • {ingredient.value} {ingredient.unit.slug} - {ingredient.ingredient.name}
                            </Typography>
                        ))
                    ) : (
                        <Typography>
                            Il n'y a pas de recettes dans votre panier
                        </Typography>
                    )
                }
            </Grid>
            <Button variant="outlined" className={classes.button} onClick={() => printDocument()}>
                <Typography>
                    Télécharger la liste de courses
                </Typography>
            </Button>
        </Page >
    )
}


export default RecapPage