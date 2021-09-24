import { IGroup } from '@interfaces/IGroup'
import mongoose from 'mongoose'

const Group = new mongoose.Schema({
    name: {
        type: String,
        default: '',
    },
    perms: {
        type: Array,
        default: [],
    },
})

export default {
    schema: Group,
    model: mongoose.model<IGroup & mongoose.Document>('Group', Group)
}
