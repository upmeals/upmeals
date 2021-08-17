import 'reflect-metadata' // We need this in order to use @Decorators
import 'module-alias/register'

import config from '@config/index'
import express from 'express'

const app = express()

require('@loaders').default({ expressApp: app })

app.listen(config.port, () => {
    console.info(`
        ################################################
        🛡️  Server listening on port: ${config.port} 🛡️
        ################################################
    `)
}).on('error', err => {
    console.error(err)
    process.exit(1)
})
