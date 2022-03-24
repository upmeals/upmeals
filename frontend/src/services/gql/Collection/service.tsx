import GQLService from "../GQLService";
import {
    gql,
} from "@apollo/client";
import {
    QueryList,
    QueryGet,
    QueryCreate,
    QueryUpdate,
    QueryDelete,
} from '../../../interfaces/Queries'


export default class GQLCollection extends GQLService {

    // Queries
    list = ({ collection, fields, options }: QueryList) => {
        let { definition, selector, fieldsString, dataString } = this.generateQuery('list', collection, fields, options, undefined, undefined)

        const QUERY_LIST =
            gql`
                    query ${definition} {
                        ${selector}${dataString} {
                            ${fieldsString}
                        }
                    }
                `

        return this.client.query({ query: QUERY_LIST, fetchPolicy: 'network-only' })
    }

    get = ({ collection, id, fields }: QueryGet) => {
        let { definition, selector, fieldsString, dataString } = this.generateQuery('get', collection, fields, undefined, undefined, id)

        const QUERY_GET =
            gql`
                    query ${definition} {
                        ${selector}${dataString} {
                            ${fieldsString}
                        }
                    }
                `

        return this.client.query({ query: QUERY_GET, fetchPolicy: 'network-only' })
    }

    create = ({ collection, item, fields }: QueryCreate) => {
        let { definition, selector, fieldsString, dataString } = this.generateQuery('create', collection, fields, undefined, item, undefined)

        const MUTATION_CREATE =
            gql`
                    mutation ${definition} {
                        ${selector}${dataString} {
                            ${fieldsString}
                        }
                    }
                `

        return this.client.mutate({ mutation: MUTATION_CREATE, fetchPolicy: 'network-only' })
    }

    update = ({ collection, id, item, fields }: QueryUpdate) => {
        let { definition, selector, fieldsString, dataString } = this.generateQuery('update', collection, fields, undefined, item, id)

        const MUTATION_UPDATE =
            gql`
                    mutation ${definition} {
                        ${selector}${dataString} {
                            ${fieldsString}
                        }
                    }
                `

        return this.client.mutate({ mutation: MUTATION_UPDATE, fetchPolicy: 'network-only' })
    }

    delete = ({ collection, id }: QueryDelete) => {
        let { definition, selector, dataString } = this.generateQuery('delete', collection, undefined, undefined, undefined, id)

        const MUTATION_DELETE =
            gql`
                mutation ${definition} {
                    ${selector}${dataString} {
                        id${Array.isArray(id) ? 's' : ''}
                    }
                }
            `

        return this.client.mutate({ mutation: MUTATION_DELETE, fetchPolicy: 'network-only' })
    }

}