import { getToken, getRefreshToken } from '@src/authenticate'
import { ISession, IUser, IUserInputDTO } from '@interfaces/IUser'
import { Service } from 'typedi'
import User from '@src/models/user'

@Service()
export default class AuthService {
    public async Register(userInput: IUserInputDTO): Promise<{
        success: boolean
        user: IUser
        refreshToken: ISession
        token
    }> {
        try {
            let user = await User.register(new User({ email: userInput.email }), userInput.password)

            if (!user) throw new Error('User already exists')

            const token = getToken({ _id: user._id })
            const refreshToken = getRefreshToken({ _id: user._id }) 

            user.refreshToken.push({ refreshToken })
            await user.save((error, user) => {
                if (error) throw new Error(error)
            })

            return { success: true, user, refreshToken, token }
        } catch (error) {
            throw error
        }
    }

    public async Login(userInput: IUser): Promise<{
        success: boolean
        user: IUser
        refreshToken: ISession
        token
    }> {
        try {
            let user = await User.findById(userInput._id)

            if (!user) throw new Error('User not found')

            const token = getToken({ _id: userInput._id })
            const refreshToken = getRefreshToken({ _id: userInput._id })

            user.refreshToken.push({ refreshToken })
            
            await user.save((error, user) => {
                if (error) throw new Error(error)
            })

            return { success: true, user, refreshToken, token }
        } catch (error) {
            throw new Error(error)
        }
    }

    public async refreshToken(
        userInputDTO: IUserInputDTO,
    ): Promise<{ user: IUser; token: string }> {
        try {
            return
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
