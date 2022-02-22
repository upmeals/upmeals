import { modalPropsVar } from "./vars"


export const clearModalCurrent = () => {
    localStorage.removeItem('modalProps')
    modalPropsVar({})
}


export const setModalCurrent = (modalName: string, props: object, history: any, withRecordId?: string ) => {
    if (history.location.search === '') {
        history.push({ search: '?modal=' + modalName + (withRecordId ? ('&id=' + withRecordId) : '') })
    } else {
        history.push({ search: history.location.search + '&modal=' + modalName })
    }

    localStorage.setItem('modalProps', JSON.stringify({ ...props, withRecordId, name: modalName }))
    
    return modalPropsVar(props)
}


const operations = {
    setModalCurrent
}

export default operations