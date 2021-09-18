import User from '@models/user'
import passport from 'passport'

const LocalStrategy = require('passport-local').Strategy

//Called during login/sign up.
passport.use(new LocalStrategy(User.authenticate()))
//called while after logging in / signing up to set user details in req.user
passport.serializeUser(User.serializeUser())
