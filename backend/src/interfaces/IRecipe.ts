import { IIngredient } from './IIngredient'

export interface IRecipe {
    title: string
    description: string
    author: string
    ingredients: Array<IIngredient>
    steps: Array<String>
}
