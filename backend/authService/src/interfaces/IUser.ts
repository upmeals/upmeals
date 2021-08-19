import { Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    refreshToken: Array<ISession>
}

export interface ISession {
    refreshToken: string
}

export interface IUserInputDTO {
    email: string
    password: string
}
