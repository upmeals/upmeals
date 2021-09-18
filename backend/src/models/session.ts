import { ISession } from '@src/interfaces/ISession'
import mongoose from 'mongoose'

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: '',
    },
})

export default {
    schema: Session,
    model: mongoose.model<ISession & mongoose.Document>('Session', Session)
}
