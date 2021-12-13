import JSONAPIMongoParser from 'json-api-mongo-parser'

var jsonApiMongoParser = new JSONAPIMongoParser({
    users: {},
    ingredients: {
        relationships: {
            recipies: {
                type: 'recipies',
                options: {
                    lean: true,
                },
            },
        },
    },
    recepies: {
        relationships: {
            author: {
                type: 'users',
                options: {
                    lean: true,
                },
            },
            ingredients: {
                type: 'ingredients',
                options: {
                    lean: true,
                },
            },
        },
    },
})

export default jsonApiMongoParser
