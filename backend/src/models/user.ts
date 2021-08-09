import { IUserModel } from '@interfaces/IUser'
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
    let userObject = this.toObject() as IUserModel

    delete userObject.password
    delete userObject.token

    return userObject
}

User.pre<IUserModel>('save', async function (next) {
    let userObject = this

    if (userObject.isModified('password')) {
        userObject.password = await bcrypt.hash(userObject.password, 8)
    }

    next()
})

export default mongoose.model<IUserModel & mongoose.Document>('User', User)
