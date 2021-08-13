import passport from 'passport'
import User from '@models/user'
import config from '@config/index'

const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const opts = { jwtFromRequest: '', secretOrKey: '' }

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.jwtSecret

// Used by the authenticated requests to deserialize the user,
// i.e., to fetch user details from the JWT.
passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
        // Check against the DB only if necessary.
        // This can be avoided if you don't want to fetch user details in each request.
        User.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false)
            }
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        })
    }),
)
