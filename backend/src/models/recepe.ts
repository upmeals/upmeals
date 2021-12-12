import { IRecepe } from '@interfaces/IRecepe'
import mongoose from 'mongoose'

const Recepe = new mongoose.Schema(
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

export default mongoose.model<IRecepe & mongoose.Document>('Recepe', Recepe)
