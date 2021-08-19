import { Document, Model, PassportLocalSchema } from 'mongoose'
import { IUser } from '@interfaces/IUser'

declare global {
    namespace Express {
        export interface Request {
        }
    }

    namespace Models {
        export type UserModel = Model<IUser & Document> 
    }
}
