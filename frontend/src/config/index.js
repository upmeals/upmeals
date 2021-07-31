import { frontendMainColor } from '../styles/colors'
import * as constants from './constants'

/* eslint-disable */
/* env variables */

/* Services map */
export const servicesMap = {
    // apis   --    users: userApi,
}

/* Config for each platform */
export default () => {
    
    function getSubdomain(hostname) {
        var regexParse = new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$');
        var urlParts = regexParse.exec(hostname);
        return hostname.replace(urlParts[0],'').slice(0, -1);
    }

    const configurations = {
        'default': {
            appName: 'frontend',
            title: 'frontend website',
            theme: require('./themes/frontend').default,
            routes: require('./routes/frontend').default,
            mainColor: frontendMainColor,
            servicesMap,
            links: {
                home: '/',
                privacy: '/privacy',
                terms: '/terms',
            },
            ...constants,
        },
    }

    if (process.env.NODE_ENV === 'test') {
        return configurations['default']
    }

    let subdomain = getSubdomain(window.location.hostname) || "default"

    if (!Object.keys(configurations).includes(subdomain)) {
        throw Error(`No valid configuration found for host ${subdomain}`);
    }

    return configurations[subdomain];
}