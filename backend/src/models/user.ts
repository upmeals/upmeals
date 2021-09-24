import { IUser } from '@interfaces/IUser'
import Session from '@models/session'
import mongoose, { PassportLocalSchema } from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
import validator from 'validator'

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid.')
                }
            },
        },
        authStrategy: {
            type: String,
            default: 'local',
        },
        refreshToken: {
            type: [Session.schema],
        },
        group: {
            type: String,
            ref: 'Group',
            foreignField: 'name',
            default: 'User',
        },
    },
    { timestamps: true },
)

User.methods.toJSON = function () {
    let userObject = this.toObject() as IUser

    // delete userObject.password
    delete userObject.refreshToken
    delete userObject.salt
    delete userObject.hash

    return userObject
}

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
    usernameUnique: true,
})

export default mongoose.model<IUser & mongoose.Document>('User', User as PassportLocalSchema)
