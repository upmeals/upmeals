import GQLCollection from './service'
import { connectGQLQuery } from '../utils'
import {
    QueryList,
    QueryGet,
    QueryCreate,
    QueryUpdate,
    QueryDelete,
} from '../../../interfaces/Queries'


const service = new GQLCollection()


export const gqlCollectionIndex = ({ collection, fields, options }: QueryList) => connectGQLQuery(service, "list", { collection, fields, options }) 
export const gqlCollectionGet = ({ collection, id, fields }: QueryGet) => connectGQLQuery(service, "get", { collection, id, fields })
export const gqlCollectionCreate = ({ collection, item, fields }: QueryCreate) => connectGQLQuery(service, "create", { collection, item, fields })
export const gqlCollectionUpdate = ({ collection, id, item, fields }: QueryUpdate) => connectGQLQuery(service, "update", { collection, id, item, fields })
export const gqlCollectionDelete = ({ collection, id }: QueryDelete) => connectGQLQuery(service, "delete", { collection, id })


const exports = {
    gqlCollectionIndex,
    gqlCollectionGet,
    gqlCollectionCreate,
    gqlCollectionUpdate,
    gqlCollectionDelete
}


export default exports