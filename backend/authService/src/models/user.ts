import { IUserModel } from '@interfaces/IUser'
import bcrypt from 'bcryptjs'
import mongoose, { PassportLocalSchema } from 'mongoose'
import validator from 'validator'
import passportLocalMongoose from 'passport-local-mongoose'

const Session = new mongoose.Schema({
    refreshToken: {
        type: String,
        default: '',
    },
})

const User = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid.')
                }
            },
        },
        // password: {
        //     type: String,
        //     required: true,
        //     trim: true,
        //     minlength: 7,
        //     validate(value) {
        //         if (value.toLowerCase().includes('password')) {
        //             throw new Error('Password is insecure.')
        //         }
        //     },
        // },
        authStrategy: {
            type: String,
            default: 'local',
        },
        points: {
            type: Number,
            default: 50,
        },
        refreshToken: {
            type: [Session],
        },
    },
    { timestamps: true },
)

User.methods.toJSON = function () {
    let userObject = this.toObject() as IUserModel

    delete userObject.password
    delete userObject.refreshToken

    return userObject
}

// User.pre<IUserModel>('save', async function (next) {
//     let userObject = this

//     if (userObject.isModified('password')) {
//         userObject.password = await bcrypt.hash(userObject.password, 8)
//     }

//     next()
// })

User.plugin(passportLocalMongoose, {
    usernameField: 'email',
})

export default mongoose.model<IUserModel & mongoose.Document>(
    'User',
    User as PassportLocalSchema,
)
