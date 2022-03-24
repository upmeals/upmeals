import { useQuery } from "@apollo/client"
import { IS_APP_READY } from "./types"



export function GetInitIsAppReady () {
    const { data } = useQuery(IS_APP_READY);
    return data.isAppReady
}


const exports = {
    GetInitIsAppReady,
}


export default exports