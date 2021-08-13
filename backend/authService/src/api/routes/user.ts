import express from 'express'
import User from '@models/user'
import { Router, Request, Response, NextFunction } from 'express'

const router = express.Router()
const { getToken, COOKIE_OPTIONS, getRefreshToken } = require('@src/authenticate')

const route = Router()

export default (app: Router) => {
    // TODO : REMOVE THIS FOR MICROS
    app.use('/users', route)
    // END

    route.post('/signup', (req, res, next) => {
        // Verify that first name is not empty
        if (!req.body.email) {
            res.statusCode = 500
            res.send({
                name: 'FirstNameError',
                message: 'The email is required',
            })
        } else {
            User.register(
                new User({ email: req.body.email }),
                req.body.password,
                (err, user) => {
                    if (err) {
                        res.statusCode = 500
                        res.send(err)
                    } else {
                        const token = getToken({ _id: user._id })
                        const refreshToken = getRefreshToken({ _id: user._id })
                        user.refreshToken.push({ refreshToken })
                        user.save((err, user) => {
                            if (err) {
                                res.statusCode = 500
                                res.send(err)
                            } else {
                                res.cookie(
                                    'refreshToken',
                                    refreshToken,
                                    COOKIE_OPTIONS,
                                )
                                res.send({ success: true, token })
                            }
                        })
                    }
                },
            )
        }
    })
}
