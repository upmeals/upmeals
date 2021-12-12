var JSONAPISerializer = require('json-api-serializer')

var userSerializer = require('@serializers/userSerializer')
var ingredientSerializer = require('@serializers/ingredientSerializer')
var recepeSerializer = require('@serializers/recepeSerializer')

var Serializer = new JSONAPISerializer()

// User
Serializer.register('people', userSerializer)

// Ingredient
Serializer.register('ingredient', ingredientSerializer)

// Recepe
Serializer.register('recepe', recepeSerializer)

export default Serializer
