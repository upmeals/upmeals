import { IIngredient } from './IIngredient'

export interface IRecepe {
    title: string
    description: string
    author: string
    ingredients: Array<IIngredient>
    steps: Array<String>
}
