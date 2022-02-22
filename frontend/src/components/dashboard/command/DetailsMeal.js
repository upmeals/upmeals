import * as React from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ChipTag from "../../ui/ChipTag";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import withRecord from '../../hoc/withRecord'
import { useImage } from '../../../hooks/useImage';

const useStyles = makeStyles(theme =>
	createStyles({
		boxStyle: {
			width: '70vw',
			maxWidth: '1000px',
			height: '800px',
			minHeight: '85vh',
			backgroundColor: 'white',
			boxShadow: 24,
			p: 4,
			overflowY: 'scroll',
			border: 'none !important',
			'&:focus-visible': {
				outline: 'unset',
			},
		},
		imgContainer: {
			height: 430,
			position: 'relative',
			backgroundPosition: 'center',
			backgroundSize: 'cover',
		},
		imgDetail: {
			height: 430,
			position: 'relative',
		},
		arrowIcon: {
			position: 'absolute',
			top: '30px',
			left: '30px',
			width: '2em !important',
			height: '2em !important',
			color: 'white',
			cursor: 'pointer',
			zIndex: '20 !important',
			background: '#F46E59',
			borderRadius: 15,
			transition: '0.25s !important',
			'&:hover': {
				transition: '0.25s !important',
				background: '#E3614C',
			}
		},
		iconsAddContainer: {
			display: 'flex',
			flexDirection: 'column',
			position: 'absolute',
			right: '20px',
			top: '45%',
			color: 'white !important',
			backgroundColor: '#56BB7F !important',
			borderRadius: '10px',
			padding: '5px',
			cursor: 'pointer'
		},
		iconsHeartContainer: {
			display: 'flex',
			flexDirection: 'column',
			position: 'absolute',
			right: '20px',
			top: '55%',
			color: 'white !important',
			backgroundColor: '#F46E58 !important',
			borderRadius: '10px',
			padding: '5px',
			cursor: 'pointer'
		},
		typographyContainer: {
			padding: 40,
		},
		typographyTitle: {
			fontSize: "30px !important",
			fontWeight: "300 !important"
		},
		chipsTagsContainer: {
			margin: theme.spacing(4, 0)
		}
	})
)

const DetailsMeal = ({ record: recipe, loading, handleClose }) => {
	const classes = useStyles();
	const { src } = useImage({
		image: (recipe && recipe.image) ? (recipe.image) : (undefined),
	})

	const [isIconAddClick, setIsIconAddClick] = React.useState(false);
	const [isIconHeartClick, setIsIconHeartClick] = React.useState(false);

	const propsTags = ['3,29€/pers', '15mn.', '4 pers.', '....'];

	return (
		<>
			{
				!loading ? (
					<Box className={classes.boxStyle}>
						<div
							className={classes.imgContainer}
							style={{
								backgroundImage: `url(${src})`,
							}}
						>
							<ArrowLeftIcon onClick={handleClose} className={classes.arrowIcon} />
							<div className={classes.iconsAddContainer} onClick={() => setIsIconAddClick(!isIconAddClick)}>
								{isIconAddClick
									? <RemoveIcon />
									: <AddIcon />
								}
							</div>
							<div className={classes.iconsHeartContainer} onClick={() => setIsIconHeartClick(!isIconHeartClick)}>
								{isIconHeartClick
									? <FavoriteIcon />
									: <FavoriteBorderIcon />
								}
							</div>
						</div>
						<div className={classes.typographyContainer}>
							<Typography id="modal-modal-title" variant="h5" component="h2" className={classes.typographyTitle}>
								{recipe.title.charAt(0).toUpperCase() + recipe.title.slice(1)}
							</Typography>
							<div className={classes.chipsTagsContainer}>
								<ChipTag props={propsTags} />
							</div>
							<Typography id="modal-modal-description" sx={{ mt: 2 }}>
								{recipe.description.charAt(0).toUpperCase() + recipe.description.slice(1)}
							</Typography>
						</div>
					</Box>
				) : (
					<p>Loading...</p>
				)
			}
		</>
	);
}

export default withRecord('recipes')(DetailsMeal)