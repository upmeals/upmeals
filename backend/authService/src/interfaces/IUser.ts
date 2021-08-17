import { Document } from "mongoose";
import { StringDecoder } from "string_decoder";

export interface IUser extends Document {
    _id: string
    email: string
    password: string
    refreshToken: Array<ISession>
}

export interface ISession extends Document {
    _id: string
    refreshToken: StringDecoder
}

export interface IUserInputDTO {
    email: string
    password: string 
}