import { modalPropsVar } from "./vars"
import { modals } from '../../config/routes/frontend'


export const clearModalCurrent = () => {
    localStorage.removeItem('modalProps')
    modalPropsVar({})
}


export const clearModalIfOnce = () => {
    if (localStorage.getItem('modalProps')) {
        let props = JSON.parse(localStorage.getItem('modalProps') as string)
        if (props && props.name) {
            let modalRoute = modals.find((modal) => modal.name === props.name)
            if (modalRoute && modalRoute.once === true) {
                clearModalCurrent()
            }
        }
    }
}


export const setModalCurrent = (modalName: string, props: object, history: any, params: object) => {
    const searchParams = new URLSearchParams()
    searchParams.append('modal', modalName)
    for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, value)
    }
    history.push({ search: searchParams.toString() })

    localStorage.setItem('modalProps', JSON.stringify({ props: {...props}, name: modalName }))

    return modalPropsVar(props)
}


const operations = {
    clearModalCurrent,
    clearModalIfOnce,
    setModalCurrent,
}

export default operations