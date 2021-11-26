import { IIngredient } from '@interfaces/IIngredient'
import mongoose from 'mongoose'

const Ingredient = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
    },
    { timestamps: false },
)

export default mongoose.model<IIngredient & mongoose.Document>('Ingredient', Ingredient)
