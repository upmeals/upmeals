import { ISession } from '@interfaces/ISession'
import { Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    password: string
    refreshToken: Array<ISession>
    salt?: string
    hash?: string
    group: string
}

export interface IUserInputDTO {
    email: string
    password: string
}
