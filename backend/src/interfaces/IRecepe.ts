import { IIngredient } from './IIngredient'

export interface IRecepe {
    author: string
    name: string
    ingredients: Array<IIngredient>
    steps: Array<String>
}
