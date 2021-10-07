import JSONAPIService from './JSONAPIService'



const todo = {
    id: 2,
    type: 'todos',
}


const todos = [
    {
        id: 1,
        type: 'todos'
    },
    {
        id: 2,
        type: 'todos'
    },
    {
        id: 3,
        type: 'todos'
    }
]



describe('JSONAPIService', () => {
    test('Constructor', () => {
        const service = new JSONAPIService('todos')

        expect(service.resource_path).toBe('todos')
        expect(service.resource_name).toBe('todos')
        expect(service.axios.defaults.baseURL).toBe('http://localhost/todos')
    })

    test('findRelatedRecord function should find a related record', () => {
        const service = new JSONAPIService('todos')
        const result = service.findRelatedRecord(todo, { included: todos })

        expect(result).toEqual(todo)
    })

    test('buildUrlWithOptions function should build url correctly', () => {
        const service = new JSONAPIService('todos')

        const url = '/todos/'
        const options = {
            include: ['users'],
            filters: { name: 'tache' },
            page: { number: 1, size: 10 },
            fields: { todos: ["name", "status", "owner"] },
            sort: ['tache', 'order'],
        }

        const result = service.buildUrlWithOptions(url, options)

        expect(result).toBe('/todos/?fields%5Btodos%5D=name%2Cstatus%2Cowner&filter%5Bname%5D=tache&include=users&page%5Bnumber%5D=1&page%5Bsize%5D=10&sort=tache%2Corder')
    })

    test('describe function should make an option request', () => {
        const service = new JSONAPIService('todos')

        service.authOptions = jest.fn()
        service.describe(true, {})

        expect(service.authOptions).toBeCalledTimes(1)
    })

    test('index function should make a get request', () => {
        const service = new JSONAPIService('todos')

        service.authGet = jest.fn()
        service.index({}, {})

        expect(service.authGet).toBeCalledTimes(1)
    })

    test('get function should make a get request', () => {
        const service = new JSONAPIService('todos')

        service.authGet = jest.fn()
        service.get({}, {})

        expect(service.authGet).toBeCalledTimes(1)
    })

    test('create function should make a post request with correct data', () => {
        const service = new JSONAPIService('todos')

        let attributes = {
            'id': 1,
            'name': 'Tache 1'
        }
        let relationships = {
            user: {
                id: '1',
                type: 'users',
            }
        }

        service.authPost = jest.fn()
        service.create(attributes, relationships)

        let payload = {
            type: service.resource_name,
            attributes,
            relationships: {
                user: {
                    data: {
                        id: '1',
                        type: 'users',
                    }
                }
            }
        }

        expect(service.authPost).toBeCalledWith('/', { data: payload })
    })

    test('update function should make a patch request with correct data', () => {
        const service = new JSONAPIService('todos')

        let attributes = {
            'name': 'Tache 1'
        }
        let relationships = {
            user: {
                id: '1',
                type: 'users',
            }
        }

        service.authPatch = jest.fn()
        service.update(1, attributes, relationships, {})

        let payload = {
            type: service.resource_name,
            id: 1,
            attributes,
            relationships: {
                user: {
                    data: {
                        id: '1',
                        type: 'users',
                    }
                }
            }
        }

        expect(service.authPatch).toBeCalledWith('/1/', { data: payload })
    })

    test('delete function should call a delete request with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authDelete = jest.fn()
        service.delete(1)

        expect(service.authDelete).toBeCalledWith('/1/')
    })

    test('fetch-related function should call a get with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authGet = jest.fn()
        service.fetch_related(1, 'todos', {})

        expect(service.authGet).toBeCalledWith('/1/todos')
    })

    test('add-related function should call a post with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authPost = jest.fn()
        service.add_related(
            1,
            'todos',
            {
                id: '1',
                type: 'users',
            }
        )

        expect(service.authPost).toBeCalledWith("/1/relationships/todos", {"data": {"id": "1", "type": "users"}})
    })

    test('remove-related function should call a delete with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authDelete = jest.fn()
        service.remove_related(
            1,
            'todos',
            {
                id: '1',
                type: 'users',
            }
        )

        expect(service.authDelete).toBeCalledWith("/1/relationships/todos", {"data": {"data": {"id": "1", "type": "users"}}})
    })

    test('rawupload function should call a put with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authPut = jest.fn()
        service.rawUpload(1, '/path', {})

        expect(service.authPut).toBeCalledWith("/1/path", new FormData())
    })

    test('rawpost function should call a post with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authPost = jest.fn()
        service.rawPost(1, '/path', {}, {})

        expect(service.authPost).toBeCalledWith('/1/path', {}, undefined)
    })

    test('rawdelete function should call a delete with correct data', () => {
        const service = new JSONAPIService('todos')

        service.authDelete = jest.fn()
        service.rawDelete(1, 'prefix/', '/suffix', {}, {})

        expect(service.authDelete).toBeCalledWith('/prefix/1/suffix/', {}, undefined)
    })
})