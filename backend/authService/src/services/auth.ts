import { Service, Inject } from 'typedi'
import config from '@config/index'
import { randomBytes } from 'crypto'
import { IUser, IUserInputDTO } from '@interfaces/IUser'

@Service()
export default class AuthService {
    constructor(@Inject('userModel') private userModel: Models.UserModel) {}

    public async Register(
        userInputDTO: IUserInputDTO,
    ): Promise<{ user: IUser; token: string }> {
        try {

            return 
        } catch (e) {
            console.error(e)
            throw e
        }
    }
}
