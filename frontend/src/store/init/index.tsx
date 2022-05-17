import { useQuery } from "@apollo/client"
import { IS_APP_READY, MEALS } from "./types"



export function GetInitIsAppReady () {
    const { data } = useQuery(IS_APP_READY);
    return data.isAppReady
}

export function GetMeals () {
    const { data } = useQuery(MEALS);
    return data.meals
}


const exports = {
    GetInitIsAppReady,
}


export default exports