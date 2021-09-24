import config from '@config/index'
// import Group from '@models/group'
import mongoose from 'mongoose'

export default async () => {
    const connection = await mongoose.connect(config.mongoDb, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })

    // let admin = new Group.model({
    //     name: 'Admin',
    //     perms: [],
    // })

    // let user = new Group.model({
    //     name: 'User',
    //     perms: [],
    // })

    // await Group.model.create(admin)
    // await Group.model.create(user)

    // console.log(Group.model.find())

    console.log('Connection OK')
}
