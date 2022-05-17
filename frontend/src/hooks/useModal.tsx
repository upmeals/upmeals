import { useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GetAuthIsLoggedIn } from '../store/auth';
import { GetInitIsAppReady } from '../store/init';
import { setModalCurrent } from '../store/modal/operations';



interface modalProps {
    props?: object,
    params?: {
        id?: string | number
    }
}


export const useModal = (name: string) => {
    const history = useHistory()
    const location = useLocation()
    
    const isLoggedIn = GetAuthIsLoggedIn()
    const isAppReady = GetInitIsAppReady()
    
    const isModalOpen = useRef(false)
    
    useEffect(() => {
        if (
            location.search.includes('modal') && 
            location.search.includes(name)
        ) {
            isModalOpen.current = true
        } else {
            isModalOpen.current = false
        }
    }, [isLoggedIn, isAppReady, location, isModalOpen, name])

    const setModal = ({ props = {}, params = {} }: modalProps = {}) => {
        setModalCurrent(
            name,
            props,
            history,
            params
        )
    }

    return { setModal, isModalOpen }
};