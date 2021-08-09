import { Document } from "mongoose";

export interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    token: string
}

export interface IUserModel extends IUser, Document {
    _id: IUser["_id"]
}

export interface IUserInputDTO {
    name: string
    email: string
    password: string
}