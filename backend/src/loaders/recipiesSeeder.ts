import { IIngredient } from '@interfaces/IIngredient'
import { IRecipe } from '@interfaces/IRecipe'
import Ingredient from '@models/ingredient'
import Recipe from '@models/recipe'
import user from '@models/user'
import faker from 'faker'
import _ from 'lodash'

export default async () => {
    const insertedIngredient = await Ingredient.find()

    // make a bunch of recipies
    let recipies: Array<IRecipe> = []
    for (let r = 0; r < 100; r++) {
        const numberOfIngredient = generateRandomInt(3, 10)
        const numberOfSteps = generateRandomInt(1, 10)

        let recipeIngredients: Array<IIngredient> = []
        for (let i = 0; i < numberOfIngredient; i++) {
            recipeIngredients.push(_.sample(insertedIngredient)._id)
        }

        let recipeSteps: Array<any> = []
        for (let i = 0; i < numberOfSteps; i++) {
            recipeSteps.push(faker.lorem.sentence())
        }

        let newRecipies = {
            title: faker.lorem.words(7),
            description: faker.commerce.productDescription(),
            author: (await user.findOne({}))._id,
            ingredients: recipeIngredients,
            steps: recipeSteps,
        }
        recipies.push(newRecipies)
    }

    Recipe.insertMany(recipies)
    console.log('recipies seeded!')
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
