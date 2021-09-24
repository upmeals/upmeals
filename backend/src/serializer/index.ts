var JSONAPISerializer = require('json-api-serializer')

var userSerializer = require('@serializer/userSerializer')
var Serializer = new JSONAPISerializer()

// User
Serializer.register('user', userSerializer)

export default Serializer
