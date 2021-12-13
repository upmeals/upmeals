var JSONAPISerializer = require('json-api-serializer')

var userSerializer = require('@serializers/userSerializer')
var ingredientSerializer = require('@serializers/ingredientSerializer')
var recipeSerializer = require('@serializers/recipeSerializer')

var Serializer = new JSONAPISerializer()

// User
Serializer.register('users', userSerializer)

// Ingredient
Serializer.register('ingredients', ingredientSerializer)

// recipe
Serializer.register('recipies', recipeSerializer)

export default Serializer
