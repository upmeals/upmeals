export interface Config {
    type: string,
    appName: string,
    title: string,
    routes: Array<object>,
    theme: Array<object>,
    links: object
}


const configurations : Array<any> = [
    {
        type: 'app',
        appName: 'directus-react-boilerplate',
        title: 'directus-react-boilerplate',
        theme: require('./themes/frontend').default,
        routes: require('./routes/frontend').default,
        // mainColor: #aaaaaa,
        links: {
            home: '/',
            privacy: '/privacy',
            terms: '/terms',
        },
        // ...constants,
    },
]


// function getSubdomain(hostname: string) {
//     var regexParse = new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$');
//     var urlParts = regexParse.exec(hostname)!;
//     return hostname.replace(urlParts[0],'').slice(0, -1);
// }


const globalConfig = () : Config => {
    if (process.env.NODE_ENV === 'test') {
        return configurations.find((configuration) => configuration.type === 'app') || configurations[0]
    }

    let subdomain = "app"

    if (!configurations.map((configuration => configuration.type)).includes(subdomain)) {
        throw Error(`No valid configuration found for host ${subdomain}`);
    }

    return configurations.find((configuration) => configuration.type === 'app') || configurations[0];
}


export default globalConfig