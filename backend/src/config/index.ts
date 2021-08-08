import dotenv from 'dotenv'

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const envFound = dotenv.config()
if (envFound.error) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️")
}

export default {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10),

    jwtSecret: process.env.JWT_SECRET,
    sessionExpiry: process.env.SESSION_EXPIRY,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY,

    mongoDbConnectionString: process.env.MONGO_DB_CONNECTION_STRING,

    cookieSecret: process.env.COOKIE_SECRET,
    whitelistedDomains: process.env.WHITELISTED_DOMAINS,
}