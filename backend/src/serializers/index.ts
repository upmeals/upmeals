var JSONAPISerializer = require('json-api-serializer')

var userSerializer = require('@serializers/userSerializer')
var ingredientSerializer = require('@serializers/ingredientSerializer')
var recipeSerializer = require('@serializers/recipeSerializer')

var Serializer = new JSONAPISerializer()

// User
Serializer.register('people', userSerializer)

// Ingredient
Serializer.register('ingredient', ingredientSerializer)

// recipe
Serializer.register('recipe', recipeSerializer)

export default Serializer
