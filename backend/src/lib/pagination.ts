import _ from 'lodash'
import qs from 'qs'
import url from 'url'

function Pagination(pageQuery, total) {
    // Select the pagination strategy
    if (pageQuery) {
        if (pageQuery.number != null) {
            _.assign(this, new PaginationPage(pageQuery.number, pageQuery.size, total))
        }

        if (pageQuery.offset != null) {
            _.assign(this, new PaginationOffset(pageQuery.offset, pageQuery.limit, total))
        }
    }
}

Pagination.prototype.getLinks = function (uri) {
    var that = this
    var links: any = {}

    var buildPageQuery = function (offsetNumber, limitSize) {
        var firstParam = that.number ? 'number' : 'offset'
        var secondParam = that.number ? 'size' : 'limit'

        var pagination: any = {}
        pagination.page = {}
        pagination.page[firstParam] = offsetNumber
        pagination.page[secondParam] = limitSize

        return pagination
    }

    links.self = uri
    links.first = paginationLinks(uri, buildPageQuery(this.first, this.limit))
    links.last = paginationLinks(uri, buildPageQuery(this.last, this.limit))
    if (this.prev != null) {
        links.prev = paginationLinks(uri, buildPageQuery(this.prev, this.limit))
    }
    if (this.next != null) {
        links.next = paginationLinks(uri, buildPageQuery(this.next, this.limit))
    }

    return links
}

function PaginationOffset(offset, limit, total) {
    offset = Number(offset)
    limit = Number(limit)
    total = Number(total)

    var lastOffset = total - (total % limit || limit)
    var prevOffset = offset - limit

    this.total = total
    this.offset = offset
    this.limit = limit
    this.first = 0
    this.last = lastOffset > 0 ? lastOffset : 0
    this.prev = prevOffset >= 0 ? prevOffset : null
    this.next = offset + limit < total ? offset + limit : null
}

function PaginationPage(number, size, total) {
    number = Number(number)
    size = Number(size)
    total = Number(total)

    var totalPage = Math.ceil(total / size)

    this.total = total
    this.totalPage = totalPage
    this.number = number
    this.size = size
    this.first = 1
    this.last = totalPage === 0 ? 1 : totalPage
    this.prev = number > 1 ? number - 1 : null
    this.next = number !== totalPage ? number + 1 : null
}

var paginationLinks = function (uri, query) {
    var info = url.parse(uri)
    var queryObj = qs.parse(info.query)

    queryObj = _.merge(queryObj, query)
    info.search =
        '?' +
        qs.stringify(queryObj, {
            encode: false,
        })

    return url.format(info)
}

export default Pagination
