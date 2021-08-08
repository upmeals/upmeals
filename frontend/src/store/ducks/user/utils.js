import _ from 'lodash'
import { Factory } from "../../../models";



const defaultCallback = (response) => {
    if (response.data === "") {
        return response;
    }
    
    return response
};
