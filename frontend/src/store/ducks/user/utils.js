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





export {
    defaultCallback,
}