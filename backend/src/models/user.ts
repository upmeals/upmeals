import { IUser } from '@interfaces/IUser'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import validator from 'validator'

const User = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Please enter a firstname'],
            trim: true,
        },
        lastName: {
            type: String,
            required: [true, 'Please enter a lastname'],
            trim: true,
        },
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
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 7,
            validate(value) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password is insecure.')
                }
            },
        },
        token: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
)

User.methods.toJSON = function () {
    let userObject = this.toObject()

    // TODO : PO TRE BO

    Reflect.deleteProperty(userObject, 'password')
    Reflect.deleteProperty(userObject, 'token')

    //

    return userObject
}

User.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    // TODO : PO TRE BO

    let userObject = this.toObject()

    Reflect.set(
        userObject,
        'password',
        await bcrypt.hash(Reflect.get(userObject, 'password'), 8),
    )

    // 

    next()
})

export default mongoose.model<IUser & mongoose.Document>('User', User)
