import Record from './Record'



const createRecord = (rawData, state) => {
    switch(rawData.type) {
        case "users":
            return new Record(rawData, state); // User
        default:
            return new Record(rawData, state)
    }
}



export const Factory = {
    createRecord,
}