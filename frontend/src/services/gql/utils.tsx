import _ from 'lodash'


export const defaultErrorCallback = (error: any) => {
    return { error, loading: false }
}


export const defaultCallback = (response: any) => {
    if (response.data === "") {
        return {
            error: "Empty data"
        };
    }
    const data = response.data[Object.keys(response.data)[0]]
    if (_.isUndefined(data)) {
        return {
            error: "Empty data"
        };
    }
    if (response.error) {
        return {
            error: response.error
        }
    }

    return { data, loading: false }
}


export const connectGQLQuery = async (service : any, method : string, args: object, callback : any = defaultCallback, errorCallback : any = defaultCallback): Promise<any> => {
    try {
        const response = await (service)[method](args);

        if (response && response.errors)  {
            return errorCallback(response.errors)
        }

        return callback(response)
    } catch (e) {
        if (errorCallback) {
            return errorCallback(e)
        }
        return { error: e, loading: false }
    }
}