import { Document, PassportLocalModel } from "mongoose";

export interface IUser {
    _id: string
    email: string
    password: string
    refreshToken: string
}

export interface IUserModel extends IUser, Document {
    _id: IUser["_id"]
}

export interface IUserInputDTO {
    email: string
    password: string 
}