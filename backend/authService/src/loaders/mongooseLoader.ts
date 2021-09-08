import mongoose from 'mongoose'
import { Db } from 'mongodb'
import config from '@config/index'

export default async (): Promise<Db> => {
    const connection = await mongoose.connect(config.mongoDb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
    console.log('Connection OK')
    return connection
}
