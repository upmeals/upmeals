// Query Types
export type QueryList = {
    collection: string,
    fields?: string,
    options?: Options,
}

export type QueryGet = {
    collection: string,
    id: number | string,
    fields?: string,
}

export type QueryCreate = {
    collection: string,
    item: object | Array<object>,
    fields?: string,
}

export type QueryUpdate = {
    collection: string,
    id: number | Array<number> | string | Array<string>,
    item: object,
    fields?: string,
}

export type QueryDelete = {
    collection: string,
    id: number | Array<number> | string | Array<string>,
}


// Auth
export type QueryLogin = {
    email: string,
    password: string,
    otp: string,
}

export type QueryRegister = {
    email: string,
    password: string
}

export type QueryRequestPasswordReset = {
    email: string,
}

export type QueryApplyPasswordReset = {
    token: string,
    password: string,
}

export type GenerateTfa = {
    password: string,
}

export type EnableTfa = {
    otp: string,
    secret: string,
}

export type DisableTfa = {
    otp: string,
}


// System
// File
export type FileGet = {
    id: string,
}

export type FileGetData = {
    id: string,
    fields?: string,
}

export type FileList = {
    fields?: string,
    options?: Options
}

export type FileUpload = {
    file: object | Array<object>,
    data?: object | Array<object>,
}

export type FileImport = {
    url: string,
    data?: object,
}

export type FileUpdate = {
    id: string | Array<string>,
    file?: object,
    data?: object | Array<object>,
}

export type FileDelete = {
    id: string | Array<string>,
}


// Utils
export type Options = {
    filter?: object, // https://docs.directus.io/reference/query/#filter
    search?: string, // https://docs.directus.io/reference/query/#search
    sort?: Array<string>, // https://docs.directus.io/reference/query/#sort
    limit?: number, // https://docs.directus.io/reference/query/#limit
    offset?: number, // https://docs.directus.io/reference/query/#offset
    page?: number, // https://docs.directus.io/reference/query/#page
}