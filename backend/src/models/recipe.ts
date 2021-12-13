import { IRecipe } from '@interfaces/IRecipe'
import mongoose from 'mongoose'

const Recipe = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            lowercase: true,
        },
        description: {
            type: String,
            required: true,
            lowercase: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        ingredients: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredients',
            },
        ],
        steps: {
            type: Array,
        },
    },
    { timestamps: true },
)

export default mongoose.model<IRecipe & mongoose.Document>('recipe', Recipe)
