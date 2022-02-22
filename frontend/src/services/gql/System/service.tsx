import GQLService from "../GQLService";
import {
    gql,
} from "@apollo/client";
import axios from 'axios'
import {
    FileDelete,
    FileGet,
    FileGetData,
    FileImport,
    FileList,
    FileUpdate,
    FileUpload
} from '../../../interfaces/Queries'
import { buildFormData } from "./utils";


export default class GQLCollection extends GQLService {

    // Queries for files
    fileGet = ({ id }: FileGet) => {
        return process.env.REACT_APP_BACKEND_DOMAIN + '/assets/' + id
    }

    fileGetData = ({ id, fields }: FileGetData) => {
        let { definition, selector, fieldsString, dataString } = this.generateQuery('get', 'files', fields, undefined, undefined, id)

        const QUERY_GET_FILE =
            gql`
                query ${definition} {
                    ${selector}${dataString} {
                        ${fieldsString}
                    }
                }
            `

        return this.client.query({ query: QUERY_GET_FILE, fetchPolicy: 'network-only', context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

    fileList = ({ fields, options }: FileList) => {
        let { definition, selector, fieldsString, dataString } = this.generateQuery('list', 'files', fields, options, undefined, undefined)

        const QUERY_LIST_FILE =
            gql`
                query ${definition} {
                    ${selector}${dataString} {
                        ${fieldsString}
                    }
                }
            `

        return this.client.query({ query: QUERY_LIST_FILE, fetchPolicy: 'network-only', context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

    fileUpload = ({ file, data }: FileUpload) => {
        let formData = buildFormData({ file, data })

        return axios.post(`${process.env.REACT_APP_BACKEND_DOMAIN}/files`, formData)
    }

    fileImport = ({ url, data }: FileImport) => {
        const MUTATION_IMPORT_FILE =
            gql`
                mutation MutationImportFile {
                    import_file(url: "${url}" ${data ? `, data: ${JSON.stringify(data).replace(/"(\w+)"\s*:/g, '$1:')}` : ''}) {
                        id
                    }
                }
            `

        return this.client.mutate({ mutation: MUTATION_IMPORT_FILE, fetchPolicy: 'network-only', context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

    fileUpdate = ({ id, file, data }: FileUpdate) => {
        let formData = buildFormData({ file, data })

        return axios.patch(`${process.env.REACT_APP_BACKEND_DOMAIN}/files/${id}`, formData)
    }

    fileDelete = ({ id }: FileDelete) => {
        let { definition, selector, dataString } = this.generateQuery('delete', 'files', undefined, undefined, undefined, id)

        const MUTATION_DELETE_FILE =
            gql`
                mutation ${definition} {
                    ${selector}${dataString} {
                        id${Array.isArray(id) ? 's' : ''}
                    }
                }
            `

        return this.client.mutate({ mutation: MUTATION_DELETE_FILE, fetchPolicy: 'network-only', context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

}