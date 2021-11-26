module.exports = {
    id: '_id',
    blacklist: ['__v'],
    links: {
        self: function (data) {
            return '/recepies/' + data._id
        },
    },
    relationships: {
        author: {
            type: 'user',
            links: {
                self: function (data) {
                    return '/recepies/' + data._id + '/relationships/author'
                },
                related: function (data) {
                    return '/recepies/' + data._id + '/author'
                },
            },
        },
        ingredient: {
            type: 'ingredient',
            links: {
                self: function (data) {
                    return '/recepies/' + data._id + '/relationships/ingredient'
                },
                related: function (data) {
                    return '/recepies/' + data._id + '/ingredient'
                },
            },
        },
    },
    topLevelMeta: {
        total: function (extraOptions) {
            return extraOptions.total
        },
        totalPage: function (extraOptions) {
            return extraOptions.totalPage
        },
        count: function (extraOptions) {
            return extraOptions.count
        },
        offset: function (extraOptions) {
            return extraOptions.offset
        },
        limit: function (extraOptions) {
            return extraOptions.limit
        },
        number: function (extraOptions) {
            return extraOptions.number
        },
        size: function (extraOptions) {
            return extraOptions.size
        },
    },
    topLevelLinks: {
        self: function (extraOptions) {
            return extraOptions.self
        },
        first: function (extraOptions) {
            return extraOptions.first
        },
        last: function (extraOptions) {
            return extraOptions.last
        },
        prev: function (extraOptions) {
            return extraOptions.prev
        },
        next: function (extraOptions) {
            return extraOptions.next
        },
    },
}
