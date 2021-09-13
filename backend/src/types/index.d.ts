import { IUser } from '@interfaces/IUser'
import { Document, Model } from 'mongoose'

declare global {
    namespace Express {
        export interface Request {}
    }

    namespace Models {
        export type UserModel = Model<IUser & Document> 
    }
}
