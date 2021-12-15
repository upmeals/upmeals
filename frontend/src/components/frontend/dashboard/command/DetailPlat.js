import * as React from 'react';
import { createStyles, makeStyles } from "@mui/styles";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CardMedia from '@mui/material/CardMedia';
import ChipTag from "../../../ui/ChipTag";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

const useStyles = makeStyles(theme =>
	createStyles({
		boxStyle: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: 'translate(-50%, -50%)',
			width: 1390,
			backgroundColor: 'white',
			borderRadius: 20,
			boxShadow: 24,
			p: 4,
		},
		imgContainer: {
			height: 430,
			position: 'relative',
		},
		imgDetail: {
			height: 430,
			position: 'relative',
			borderRadius: '15px 15px 0px 0px',
		},
		arrowIcon: {
			position: 'absolute',
			top: '30px',
			left: '30px',
			width: '2em !important',
			height: '2em !important',
			color: '#6C6C6C',
			cursor: 'pointer',
			zIndex: '20 !important',
			background: 'white',
			borderRadius: 15,
			transition: '0.25s',
			'&:hover': {
				background: '#fbfbfb',
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

const DetailPlat = () => {
	const [open, setOpen] = React.useState(false);
	const [isIconAddClick, setIsIconAddClick] = React.useState(false);
	const [isIconHeartClick, setIsIconHeartClick] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const classes = useStyles();
	const propsTags = ['3,29€/pers', '15mn.', '4 pers.', '....'];

	return (
		<div>
			<Button onClick={handleOpen}>Open modal</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={classes.boxStyle}>
					<div className={classes.imgContainer}>
						<CardMedia className={classes.imgDetail}
							component="img"
							image="/images/meals/6.svg"
							alt="plat gastronomie"
						/>
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
							Sauté de poulet brocolis cajou
						</Typography>
						<div className={classes.chipsTagsContainer}>
							<ChipTag props={propsTags} />
						</div>
						<Typography id="modal-modal-description" sx={{ mt: 2 }}>
							Huic Arabia est conserta, ex alio latere Nabataeis contigua; opima varietate conmerciorum castrisque oppleta validis et castellis, quae ad repellendos gentium vicinarum
							excursus sollicitudo pervigil veterum per oportunos saltus erexit et cautos. haec quoque civitates habet inter oppida quaedam ingentes Bostram et Gerasam atque Philadelphiam
							murorum firmitate cautissimas. hanc provinciae inposito nomine rectoreque adtributo obtemperare legibus nostris Traianus conpulit imperator incolarum tumore saepe contunso
							cum glorioso marte Mediam urgeret et Parthos. Tantum autem cuique tribuendum, primum quantum ipse efficere possis, deinde etiam quantum ille quem diligas atque adiuves,
							sustinere. Non enim neque tu possis, quamvis excellas, omnes tuos ad honores amplissimos perducere, ut Scipio P. Rupilium potuit consulem efficere, fratrem eius L. non potuit.
							Quod si etiam possis quidvis deferre ad alterum, videndum est tamen, quid ille possit sustinere.
						</Typography>
					</div>
				</Box>
			</Modal>
		</div>
	);
}

export default DetailPlat