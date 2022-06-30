import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import { createStyles, makeStyles } from '@mui/styles';

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        '@media screen and (max-width:600px)':{
            BoxModal: {
                width: '80%!important',
                margin: '0 auto!important'
            }
        },
        BtnModal: {
            backgroundColor: '#56BB7E!important',
            padding: '8px 21px!important',
            borderRadius: '20px'
        },
        BtnModalOutlined: {
            padding: '8px 21px!important',
            borderRadius: '20px',
            border: '1px solid #56BB7E!important',
            color: '#56BB7E!important',
            '&:hover': {
                backgroundColor: 'rgba(86, 187, 126, 0.06)!important',
            }
        },
        TextFieldModal: {
            margin: '0 0 45px!important',
            background: '#F5F5F4!important',
            border: 'none',
            outline: 'none',
            padding: '15px!important',
            minWidth: '60%!important',
            '&:hover':{
                border: 'none',
            }
        },
        input: {
            border: 'none',
            outline: 'none',
        }
    })
)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '20px',
  p: 4,
  display: 'flex !important',
  flexDirection: 'column !important',
  justifyContent: 'center !important',
  alignItems: 'center !important'
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const classes = useStyles();

  return (
    <div>
      <Button onClick={handleOpen} className={classes.BtnModal} variant="contained" >Créer une Liste</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className={classes.BoxModal}>
        <TextField variant="standard" disableUnderline={false} className={classes.TextFieldModal} InputProps={{className: classes.input, disableUnderline: 'true'}} placeholder="Nom de la Collection" />
        <Button className={classes.BtnModalOutlined} variant="outlined" >Créer une Liste</Button>
        </Box>
      </Modal>
    </div>
  );
}
