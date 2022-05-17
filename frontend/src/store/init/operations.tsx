import { isAppReadyVar, mealsVar } from "./vars"


export const setInitIsAppReady = (value : boolean) => {
    isAppReadyVar(value)
}

export const setMeals = (value : Array<any>) => {
    mealsVar(value)
}


const operations = {
    setInitIsAppReady,
}

export default operations