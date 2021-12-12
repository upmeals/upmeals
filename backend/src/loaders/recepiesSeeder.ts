import { IIngredient } from '@interfaces/IIngredient'
import { IRecepe } from '@interfaces/IRecepe'
import Ingredient from '@models/ingredient'
import Recepe from '@models/recepe'
import user from '@models/user'
import faker from 'faker'
import _ from 'lodash'

export default async () => {

    const insertedIngredient = await Ingredient.find()

    // make a bunch of recepies
    let recepies: Array<IRecepe> = []
    for (let r = 0; r < 100; r++) {
        const numberOfIngredient = generateRandomInt(3, 10)
        const numberOfSteps = generateRandomInt(1, 10)

        let recepeIngredients: Array<IIngredient> = []
        for (let i = 0; i < numberOfIngredient; i++) {
            recepeIngredients.push(_.sample(insertedIngredient)._id)
        }

        let recepeSteps: Array<any> = []
        for (let i = 0; i < numberOfSteps; i++) {
            recepeSteps.push(faker.lorem.sentence())
        }

        let newRecepies = {
            title: faker.lorem.words(7),
            description: faker.commerce.productDescription(),
            author: (await user.findOne({}))._id,
            ingredients: recepeIngredients,
            steps: recepeSteps,
        }
        recepies.push(newRecepies)
    }

    Recepe.insertMany(recepies)
    console.log('Recepies seeded!')
}

function generateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
