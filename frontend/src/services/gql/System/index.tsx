import GQLCollection from './service'
import { connectGQLQuery } from '../utils'
import { FileDelete, FileGet, FileGetData, FileImport, FileList, FileUpdate, FileUpload } from '../../../interfaces/Queries'


const service = new GQLCollection()


export const gqlSystemGetFile = ({ id } : FileGet) => service.fileGet({ id })
export const gqlSystemGetFileData = ({ id, fields } : FileGetData) => connectGQLQuery(service, "fileGetData", { id, fields })
export const gqlSystemIndexFile = ({ fields, options } : FileList) => connectGQLQuery(service, "fileList", { fields, options })
export const gqlSystemImportFile = ({ url, data } : FileImport) => connectGQLQuery(service, "fileImport", { url, data })
export const gqlSystemUpdateFile = ({ id, file, data } : FileUpdate) => connectGQLQuery(service, "fileUpdate", { id, file, data })
export const gqlSystemDeleteFile = ({ id } : FileDelete) => connectGQLQuery(service, "fileDelete", { id })
export const gqlSystemUploadFile = ({ file, data } : FileUpload) => service.fileUpload({ file, data })


const exports = {
    gqlSystemGetFile
}


export default exports