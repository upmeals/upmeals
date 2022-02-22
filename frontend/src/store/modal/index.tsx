import { useQuery } from "@apollo/client"
import { MODAL_PROPS } from "./types"



export function GetModalProps () {
    const { data } = useQuery(MODAL_PROPS);

    if (data && data.modalProps && Object.keys(data.modalProps).length === 0) {
        let storedObject = localStorage.getItem('modalProps')
        if (storedObject) {
            return JSON.parse(storedObject)
        }
    }

    return data.modalProps
}


const exports = {
    GetModalProps
}


export default exports