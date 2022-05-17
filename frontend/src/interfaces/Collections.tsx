// Collections Types
export type Recipe = {
    id?: number,
    title?: string,
    image: File,
    description?: string,
    price?: number,
    preparation_time?: number,
    ingredients?: [object],
    steps?: [object],
    status?: string,
    sort?: number,
    user_created?: string,
    user_updated?: string,
    date_created?: Date,
    date_updated?: Date,
}

export type Ingredient = {
    id?: number,
    name?: string,
}

export type User = {
    id?: number,
    first_name?: string,
    last_name?: string,
    email?: string,
    location?: string,
    title?: string,
    description?: string,
    language?: string,
    status?: string,
    token?: string,
    last_access?: string,
    last_page?: string,
    tfa_secret?: string,
}

export type Role = {
    id?: number,
    name?: string,
    description?: string,
    enforce_tfa?: Boolean,
    admin_access?: Boolean,
    app_access?: Boolean,
}


// System types
export type File = {
    id: string,
    type: string,
    modified_on: string,
}