// Collections Schemas
export const getCollectionFields = (relation : Array<string>) => {
    return relation.map(field => field)
}



export const filesSchema = [
    'id',
    'type',
    'modified_on',
]

export const rolesSchema = [
    'id',
    'name',
    'description',
    'enforce_tfa', 
    'admin_access', 
    'app_access',
]

export const usersSchema = [
    'id',
    'first_name',
    'last_name',
    'email',
    'location',
    'title',
    'description',
    'language',
    'status',
    'token',
    'last_access',
    'last_page',
    'tfa_secret',
]

export const recipesSchema = [
    'id',
    'title',
    `image { ${getCollectionFields(filesSchema)} }`,
    'description',
    'status',
    'sort',
    `user_created { ${getCollectionFields(usersSchema)} }`,
    `user_updated { ${getCollectionFields(usersSchema)} }`,
    'date_created',
    'date_updated'
]



// Export
export const schemas = {
    recipes: [...recipesSchema],
    users: [...usersSchema],
    files: [...filesSchema],
}