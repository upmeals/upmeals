import GQLCollection from './service'
import { connectGQLQuery } from '../utils'
import { FileDelete, FileGet, FileGetData, FileImport, FileList, FileUpdate, FileUpload } from '../../../interfaces/Queries'
import DirectusList from "./_interfaces/DirectusList";
import DirectusGet from "./_interfaces/DirectusGet";
import DirectusUsersUpdateCurrent from "./_interfaces/DirectusUsersUpdateCurrent";
import DirectusUsersCreate from "./_interfaces/DirectusUsersCreate";
import DirectusUsersUpdate from "./_interfaces/DirectusUsersUpdate";
import DirectusUsersDelete from "./_interfaces/DirectusUsersDelete";


const service = new GQLCollection()


export const gqlSystemGetFile = ({ id }: FileGet) => service.fileGet({ id })
export const gqlSystemGetFileData = ({ id, fields }: FileGetData) => connectGQLQuery(service, "fileGetData", { id, fields })
export const gqlSystemIndexFile = ({ fields, options }: FileList) => connectGQLQuery(service, "fileList", { fields, options })
export const gqlSystemImportFile = ({ url, data }: FileImport) => connectGQLQuery(service, "fileImport", { url, data })
export const gqlSystemUpdateFile = ({ id, file, data }: FileUpdate) => connectGQLQuery(service, "fileUpdate", { id, file, data })
export const gqlSystemDeleteFile = ({ id }: FileDelete) => connectGQLQuery(service, "fileDelete", { id })
export const gqlSystemUploadFile = ({ file, data }: FileUpload) => service.fileUpload({ file, data })

export const directusUsersList = (
    { fields, options }: DirectusList
) => connectGQLQuery(
    service,
    'usersList',
    { fields, options }
)

export const directusUsersGet = (
    { id, fields }: DirectusGet
) => connectGQLQuery(
    service,
    'usersGet',
    { id, fields }
)

export const directusUsersUpdateCurrent = (
    { data, fields }: DirectusUsersUpdateCurrent
) => connectGQLQuery(
    service,
    'usersUpdateCurrent',
    { data, fields }
)

export const directusUsersCreate = (
    { data, fields }: DirectusUsersCreate
) => connectGQLQuery(
    service,
    'usersCreate',
    { data, fields }
)

export const directusUsersUpdate = (
    { id, data, fields }: DirectusUsersUpdate
) => connectGQLQuery(
    service,
    'usersUpdate',
    { id, data, fields }
)

export const directusUsersDelete = (
    { id }: DirectusUsersDelete
) => connectGQLQuery(
    service,
    'usersDelete',
    { id }
)



const exports = {
    gqlSystemGetFile
}


export default exports