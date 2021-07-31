import axios from 'axios';
import config from '../config/';
import _ from 'lodash';



export default class BaseHTTPService {

    constructor(baseURL, headers = {}) {
        const defaultHeaders = {
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
            "Accept-Language": "en",
            "JWT-aud": config().appName,
        };

        this.axios = axios.create({
            baseURL,
            headers: _.defaults(headers, defaultHeaders),
        });
    }


    authenticate = (config) => {
        const token = localStorage.getItem("user.token");
        if (!token) {
            return config;
        }
        return _.merge(config || {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    };


    authDelete = (url, config) =>
        this.axios.delete(url, this.authenticate(config));


    authGet = (url, config) => {
        const source = axios.CancelToken.source();
        const promise = this.axios.get(url, {
            ...this.authenticate(config),
            cancelToken: source.token,
        });
        promise.cancel = source.cancel;
        return promise;
    };


    authPatch = (url, data, config) =>
        this.axios.patch(url, data, this.authenticate(config));


    authPost = (url, data, config) =>
        this.axios.post(url, data, this.authenticate(config));


    authPut = (url, data, config) =>
        this.axios.put(url, data, this.authenticate(config));


    authOptions = (url, config) =>
        this.axios.options(url, this.authenticate(config));

}
