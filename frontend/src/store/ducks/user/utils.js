import _ from 'lodash'
import { Factory } from "../../../models";


const defaultCallback = (response) => {
    if (response.data === "") {
        return response;
    }
    const data = _.get(response, "data.data");
    if (_.isUndefined(data)) {
        return null;
    }
    return data;
};


const defaultUser = {
    email: ''
}
// const formatUser = (_, action) => {
//     let user = defaultUser

//     if (action && action.payload && action.payload.user) {
//         Object.entries(action.payload.user).forEach(([key, value]) => {
//             if (Object.keys(user).includes(key)) {
//                 return user[key] = value
//             }
//         })
//     }

//     return user
// }


const logInUserIf = (_, action) => {
    if (action && action.payload && action.payload.token) {
        localStorage.token = action.payload.token

        return true
    } else {
        return false
    }
}


export {
    defaultCallback,
    defaultUser,
    logInUserIf,
}