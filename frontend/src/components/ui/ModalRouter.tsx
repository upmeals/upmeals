import React, { useEffect } from 'react'
import { Modal, Box, Grid } from '@mui/material';
import { useLocation, useHistory } from 'react-router-dom';
import { modals } from '../../config/routes/frontend'
import { Modal as ModalInterface } from '../../interfaces/Modal'
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';
import { GetAuthIsLoggedIn } from '../../store/auth';
import { GetInitIsAppReady } from '../../store/init';
import { GetModalProps } from '../../store/modal';
import { clearModalCurrent } from '../../store/modal/operations';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modalContainer: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            borderRadius: 20,
            overflow: 'hidden',
            border: 'none !important',
            '&:focus-visible': {
                outline: 'unset',
            },
        },
        modalHeader: {
            padding: theme.spacing(0, 0, 1, 0),
        },
        modalCloseIcon: {
            cursor: 'pointer',
            width: '1.5em !important',
            height: '1.5em !important',
        }
    })
)


const ModalRouter = () => {
    const location = useLocation()
    const history = useHistory()
    const classes = useStyles()

    const isLoggedIn = GetAuthIsLoggedIn()
    const isAppReady = GetInitIsAppReady()
    const modalProps = GetModalProps()
    
    const [modal, setModal] = React.useState<undefined | ModalInterface>(undefined)

    useEffect(() => {
        let urlParams = new URLSearchParams(location.search)
        if (urlParams.has('modal')) {
            let modalName = urlParams.get('modal')
            let modalRoute = modals.find((modal) => modal.name === modalName)

            if (modalRoute !== undefined) { // Si la route existe bel et bien
                if (modalRoute.isProtected === true && isAppReady && !isLoggedIn) { // Si l'utilisateur doit être login
                    handleClose()
                }

                if (modalRoute.isProtected === false && isAppReady && isLoggedIn) { // Si l'utilisateur doit être logout
                    handleClose()
                }

                if (modalRoute.props && modalRoute.props === true && Object.keys(modalProps).length === 0) { // Si les props doivent être présents mais qu'ils ne le sont pas
                    handleClose()
                }

                setModal(modalRoute)
            }
        } else if (modal !== undefined) { // si la modal existe mais qu'il n'y a aucun param dans l'url
            handleClose()
        }
    }, [location, modal, isAppReady, isLoggedIn]) // eslint-disable-line react-hooks/exhaustive-deps

    
    const handleClose = () => {
        let urlParams = new URLSearchParams(location.search)
        urlParams.delete('modal')
        if (urlParams.has('id')) {
            urlParams.delete('id')
        }
        history.push({ search: urlParams.toString() })
        clearModalCurrent()
        setModal(undefined)
    }


    return (
        <>
            {
                modal ? (
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                    >
                        <Modal
                            open={modal !== undefined}
                            onClose={handleClose}
                        >
                            <Box
                                className={classes.modalContainer}
                            >
                                <modal.component
                                    handleClose={handleClose}
                                    {...modalProps}
                                />
                            </Box>
                        </Modal>
                    </Grid>
                ) : (
                    null
                )
            }
        </>
    )
}



export default ModalRouter