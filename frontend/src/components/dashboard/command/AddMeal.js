import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { createStyles, makeStyles } from '@mui/styles';

const useStyles = makeStyles(theme =>
	createStyles({
		root: {
			margin: theme.spacing(1, 0),
			width: '220px',
			maxWidth: 220,
			cursor: 'pointer',
			backgroundColor: "#FFF!important",
            borderRadius: '20px !important',
			'&:hover $cardMedia': {
				background: '#F1F1F0',
				transition: '0.25s !important',
			},
			'&:hover $cardContent': {
				background: '#FBFBFA',
				transition: '0.25s !important',
			}
		},
		cardMedia: {
			display: 'flex !important',
			justifyContent: 'center',
			alignItems: 'center',
			height: '220px',
			backgroundColor: '#F5F5F4',
			transition: '0.25s !important',
		},
		addIcon: {
			width: '1.5em !important',
			height: '1.5em !important',
			color: '#707070',
		},
		cardContent: {
			paddingBottom: '12px !important',
			paddingTop: '12px !important',
			transition: '0.25s !important',
		},
		typographyCard: {
			textAlign: 'center',
			marginBottom: '0',
		}
	})
)

const AddMeal = ({ handleAddMeal }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root} onClick={handleAddMeal}>
			<CardMedia className={classes.cardMedia}>
				<AddIcon className={classes.addIcon} />
			</CardMedia>
			<CardContent className={classes.cardContent}>
				<Typography gutterBottom variant="body1" component="div" className={classes.typographyCard}>
					Ajouter un plat
				</Typography>
			</CardContent>
		</Card>
	);
}

export default AddMeal