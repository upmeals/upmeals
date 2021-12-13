import React, {useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function AjoutPlat() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card onClick={handleOpen} sx={{
        width: '220px',
        maxWidth: 220,
        borderRadius: '20px',
        cursor: 'pointer',
      }}>
        <CardMedia sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '140px',
          backgroundColor: '#F5F5F4',
        }}>
          <AddIcon sx={{
            width: '2em',
            height: '2em',
            color: '#707070',
          }}/>
        </CardMedia>
        <CardContent sx={{
          paddingBottom: '12px !important',
          paddingTop: '12px !important',
        }}>
          <Typography gutterBottom variant="h5" component="div" sx={{
            textAlign: 'center',
            marginBottom: '0',
          }}>
            Ajouter un plat
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}