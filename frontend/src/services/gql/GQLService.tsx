import capitalize from "../../utils/capitalize";
import {
    ApolloClient,
    HttpLink,
    ApolloLink,
    concat
} from "@apollo/client";
import {
    Options,
} from '../../interfaces/Queries'
import { schemas } from './schemas'
import { cache, typeDefs } from "../../store";


export default class GQLService {
    client: any;


    // Constructor & core
    constructor(headers = {}) {
        const httpLink = new HttpLink({ uri: process.env.REACT_APP_BACKEND_DOMAIN + '/graphql', credentials: 'include' });

        const authMiddleware = new ApolloLink((operation, forward) => {
            const formattedHeaders = {
                ...headers,
                authorization: localStorage.getItem('accessToken') ? ('Bearer ' + localStorage.getItem('accessToken')) : undefined as string | undefined
            }
            if (formattedHeaders.authorization === undefined) {
                delete formattedHeaders.authorization
            }
            operation.setContext(() => ({
                headers: formattedHeaders
            }));
            return forward(operation);
        })

        this.client = new ApolloClient({
            cache: cache,
            link: concat(authMiddleware, httpLink),
            typeDefs
        })
    }

    buildOptions = (collection: string, options: Options | undefined) => {
        if (collection && options && options !== {}) {
            // No options
            let optionsString = ''

            // Build options
            for (const [key, value] of Object.entries(options)) {
                optionsString += key + ':' + JSON.stringify(value).replace(/"(\w+)"\s*:/g, '$1:') + ',';
            }

            // Return correct string with options
            return (optionsString !== '') ? `${optionsString.slice(0, -1)}` : ''
        } else {
            return ''
        }
    }


    // Generate Query
    generateQuery = (
        type: string,
        collection: string,
        fields: string | undefined,
        options: Options | undefined,
        data: object | Array<object> | undefined,
        id: number | Array<number> | string | Array<string> | undefined,
    ) => {
        let single = !(Array.isArray(id) || Array.isArray(data))
        let definition = this.generateDefinition(type, collection, single)
        let selector = this.generateSelector(type, collection, single)
        let fieldsString = this.generateFields(collection, fields)
        let dataString = this.generateData(collection, options, data, id)

        return { definition, selector, fieldsString, dataString }
    }

    generateDefinition = (type: string, collection: string, single: Boolean) => {
        return capitalize(type) + capitalize(collection) + ((single) ? '' : 's')
    }

    generateSelector = (type: string, collection: string, single: Boolean) => {
        if (type === 'list') {
            return collection
        } else if (type === 'get') {
            return collection + '_by_id'
        } else {
            return type + '_' + collection + '_item' + ((single) ? '' : 's')
        }
    }

    generateData = (
        collection: string,
        options: Options | undefined,
        data: object | Array<object> | undefined,
        id: number | Array<number> | string | Array<string> | undefined
    ) => {
        let dataString = ''
        let isIdArray = Array.isArray(id)

        // Build Ids
        if (id !== undefined) {
            if (!isIdArray) {
                if (typeof id === 'string') {
                    dataString += 'id:"' + id + '"'
                } else {
                    dataString += 'id:' + id
                }
            } else if (Array.isArray(id)) {
                if (typeof id[0] === 'string') {
                    dataString += 'ids:["' + id.join('","') + '"]'
                } else {
                    dataString += 'ids:[' + id.toString() + ']'
                }
            }
        }

        // Build Data
        if (data) {
            dataString += (dataString.length > 1) ? (',') : ('')
            dataString += 'data:' + JSON.stringify(data).replace(/"(\w+)"\s*:/g, '$1:');
        }

        // Build Options
        let optionsString = this.buildOptions(collection, options)
        dataString += ((optionsString.length && dataString.length > 1) ? (',' + optionsString) : (optionsString))

        return ((dataString + ')').length > 1) ? ('(' + dataString + ')') : (dataString)
    }

    generateFields = (collection: string, fields: string | undefined) => {
        if (collection && fields) {
            return fields
        } else {
            return `${(schemas as any)[collection].map((field: string) => ('\n' + field))}`
        }
    }
}