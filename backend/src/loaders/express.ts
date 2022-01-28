import config from '@config/index'
import routes from '@routes/index'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import passport from 'passport'

export default ({ app }: { app: express.Application }) => {
    const corsOptions = {
        origin: "https://localhost",
        credentials: true,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
        preflightContinue: true,
    }
    
    console.log(corsOptions)
    app.options('*', cors(corsOptions))
    app.use(cors(corsOptions))

    app.use(cookieParser(config.cookieSecret))

    app.use(passport.initialize())

    app.use(express.json({ type: 'application/vnd.api+json' }))
    app.use('/', routes())

    /// catch 404 and forward to error handler
    app.use((req, res, next) => {
        const err = new Error('Not Found')
        err['status'] = 404
        next(err)
    })

    /// error handlers
    app.use((err, req, res, next) => {
        /**
         * Handle 401 thrown by express-jwt library
         */
        if (err.name === 'UnauthorizedError') {
            return res.status(err.status).send({ message: err.message }).end()
        }
        return next(err)
    })
    app.use((err, req, res, next) => {
        res.status(err.status || 500)
        res.json({
            errors: {
                message: err.message,
            },
        })
    })
}
