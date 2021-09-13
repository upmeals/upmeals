import config from '@config/index'
import { ISession } from '@interfaces/ISession'
import { IUser, IUserInputDTO } from '@interfaces/IUser'
import User from '@models/user'
import { getRefreshToken, getToken } from '@src/authenticate'
import jwt from 'jsonwebtoken'
import { Service } from 'typedi'

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

            if (!user) throw 'User already exists'

            const token = getToken({ _id: user._id })
            const refreshToken = getRefreshToken({ _id: user._id })

            user.refreshToken.push({ refreshToken })
            await user.save((error, user) => {
                if (error) throw error
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

            if (!user) throw 'User not found'

            const token = getToken({ _id: userInput._id })
            const refreshToken = getRefreshToken({ _id: userInput._id })

            user.refreshToken.push({ refreshToken })

            await user.save((error, user) => {
                if (error) throw error
            })

            return { success: true, user, refreshToken, token }
        } catch (error) {
            throw new Error(error)
        }
    }

    public async RefreshToken(
        refreshTokenCookie: ISession,
    ): Promise<{ success: boolean; refreshToken: ISession; token: string }> {
        try {
            if (!refreshTokenCookie) throw 'Unauthorized'

            const payload = jwt.verify(refreshTokenCookie, config.refreshToken.secret)
            const userId = payload['_id']

            let user = await User.findOne({ _id: userId })
            if (!user) throw 'User not found'

            // Find the refresh token against the user record in database
            const tokenIndex = user.refreshToken.findIndex(
                (item) => (item.refreshToken as any) === refreshTokenCookie,
            )

            if (tokenIndex === -1) throw 'Unauthorized'

            const token: string = getToken({ _id: userId })
            // If the refresh token exists, then create new one and replace it.
            const newRefreshToken: ISession = getRefreshToken({
                _id: userId,
            })
            user.refreshToken[tokenIndex] = {
                refreshToken: newRefreshToken as any,
            }

            await user.save((err, user) => {
                if (err) throw err
            })

            return { success: true, refreshToken: newRefreshToken, token }
        } catch (error) {
            throw new Error(error)
        }
    }

    public async Logout(
        refreshTokenCookie: ISession,
        userId: IUser,
    ): Promise<{ success: boolean }> {
        try {
            let user = await User.findById(userId)

            if (!user) throw 'User not found'

            const tokenIndex = user.refreshToken.findIndex(
                (item) => (item.refreshToken as any) === refreshTokenCookie,
            )
            if (tokenIndex !== -1) {
                user.refreshToken = user.refreshToken.filter(
                    (obj) => obj['_id'] !== user.refreshToken[tokenIndex]['_id'],
                )
            }
            await user.save((err, user) => {
                if (err) throw err
            })

            return { success: true }
        } catch (error) {
            throw new Error(error)
        }
    }
}
