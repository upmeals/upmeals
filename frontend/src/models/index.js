import Record from './Record'
// import User from './User'


const createRecord = (rawData, state) => {
    switch(rawData.type) {
        // case "users":
        //     return new User(rawData, state); // User
        default:
            return new Record(rawData, state)
    }
}



export const Factory = {
    createRecord,
}