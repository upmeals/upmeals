// import { defineMessages, injectIntl } from 'react-intl';
import { Grid, Modal, Box } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import React from 'react'; 
import { useHistory } from 'react-router-dom';
import SelectionCard from './SelectionCard'

// Component classes
const useStyles = makeStyles(theme =>
    createStyles({
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '70%',
            height: '500px',
            backgroundColor: '#FFFFFF',
            borderRadius: '20px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexWrap: 'wrap',
            overflow: 'auto',
        }

    })
)

// Component
const ModalSelectionPlat = () => {
    const classes = useStyles();
    const history = useHistory()

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true);
        history.push({search:'?addMeal=true'})
    }
    const handleClose = () => {
        setOpen(false);
        history.push({search:''})
    }
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
        >
            <Button onClick={handleOpen}>Ajouter un plat</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.modalContainer}>
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                    <SelectionCard />
                </Box>
            </Modal>
        </Grid>
    )
}

export default ModalSelectionPlat