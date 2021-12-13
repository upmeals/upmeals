import { IIngredient } from '@interfaces/IIngredient'
import Ingredient from '@models/ingredient'
import faker from 'faker'

export default async () => {
    // make a bunch of ingredients
    let ingredients: Array<IIngredient> = []
    for (let i = 0; i < 5000; i++) {
        const name = faker.lorem.word()
        ingredients.push({ name })
    }

    await Ingredient.insertMany(ingredients)

    console.log('Ingredients seeded!')
}
