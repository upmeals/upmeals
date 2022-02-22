import { isAppReadyVar } from "./vars"


export const setInitIsAppReady = (value : boolean) => {
    isAppReadyVar(value)
}


const operations = {
    setInitIsAppReady,
}

export default operations