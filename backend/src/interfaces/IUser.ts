export interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    password: string
    token: string
}

export interface IUserInputDTO {
    name: string
    email: string
    password: string
}