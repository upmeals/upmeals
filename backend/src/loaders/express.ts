import config from '@config/index'
import routes from '@routes/index'
import cookieParser from 'cookie-parser'
import express from 'express'
import passport from 'passport'

export default ({ app }: { app: express.Application }) => {
    // const corsOptions = {
    //     origin: function (origin, callback) {
    //         if (!origin || config.whitelistedDomains.indexOf(origin) !== -1) {
    //             callback(null, true)
    //         } else {
    //             callback(new Error('Not allowed by CORS'))
    //         }
    //     },
    //     credentials: true,
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    //     preflightContinue: true,
    // }

    // app.options('*', cors(corsOptions))
    // app.use(cors(corsOptions))

    app.use(function (req, res, next) {
        let origin = req.headers.origin
        console.log("origin: ", origin)
        if (!origin || config.whitelistedDomains.indexOf(origin) !== -1) {
            console.log(true)
        } else {
            console.log(false)
        }
    })

    app.use(function (req, res, next) {
        let origin = req.headers.origin
        if (config.whitelistedDomains.includes(origin)) {
            res.header('Access-Control-Allow-Origin', origin) // restrict it to the required domain
        }

        res.header('Access-Control-Allow-Credentials', 'true')
        next()
    })

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
