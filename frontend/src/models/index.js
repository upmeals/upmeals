import Record from './Record'



const createRecord = (rawData, state) => {
    switch(rawData.type) {
        default:
            return new Record(rawData, state)
    }
}



export const Factory = {
    createRecord,
}