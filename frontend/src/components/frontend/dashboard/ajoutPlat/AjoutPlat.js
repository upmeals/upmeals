import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import {createStyles, makeStyles} from '@mui/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    card: {
      width: '220px',
      maxWidth: 220,
      borderRadius: '20px',
      cursor: 'pointer',
    },
    cardMedia: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '220px',
      backgroundColor: '#F5F5F4',
    },
    addIcon: {
      width: '1.5em',
      height: '1.5em',
      color: '#707070',
    },
    cardContent: {
      paddingBottom: '12px !important',
      paddingTop: '12px !important',
    },
    typographyCard: {
      textAlign: 'center',
      marginBottom: '0',
    }
  })
)

export default function AjoutPlat() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const classes = useStyles();

  return (
    <>
      <Card onClick={handleOpen} className={classes.card}>
        <CardMedia className={classes.cardMedia}>
          <AddIcon className={classes.addIcon}/>
        </CardMedia>
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="body1" component="div" className={classes.typographyCard}>
            Ajouter un plat
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}