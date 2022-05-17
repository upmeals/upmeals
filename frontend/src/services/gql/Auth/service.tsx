import GQLService from "../GQLService";
import {
    gql,
} from "@apollo/client";
import {
    QueryLogin,
    QueryRegister,
    QueryRequestPasswordReset,
    QueryApplyPasswordReset,
    GenerateTfa,
    EnableTfa,
    DisableTfa,
} from '../../../interfaces/Queries'


export default class GQLAuth extends GQLService {

    // Queries
    login = ({ email, password, otp }: QueryLogin) => {
        const MUTATION_LOGIN =
            gql`
                mutation Login {
                    auth_login(email: "${email}", password: "${password}",${otp !== '' ? ` otp: "${otp}" ` : ' '}mode: cookie) {
                        access_token
                        refresh_token
                    }
                }
            `

        return this.client.mutate({ mutation: MUTATION_LOGIN, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

    refresh = () => {
        const MUTATION_REFRESH =
            gql`
                mutation Refresh {
                    auth_refresh(mode: cookie) {
                        access_token
                        refresh_token
                    }
                }
            `

        return this.client.mutate({ mutation: MUTATION_REFRESH, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

    logout = () => {
        const MUTATION_LOGOUT =
            gql`
                mutation Logout {
                    auth_logout
                }
            `

        return this.client.mutate({ mutation: MUTATION_LOGOUT, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` } })
    }

    register = ({ email, password }: QueryRegister) => {
        const MUTATION_REGISTER =
            gql`
                mutation Register {
                    create_users_item(
                        data: { email: "${email}", password: "${password}", status: "active", provider: "default" }
                    ) {
                        email
                    }
                }
            `

        return this.client.mutate({ mutation: MUTATION_REGISTER, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }

    me = () => {
        let fieldString = this.generateFields('users', undefined)

        const QUERY_ME =
            gql`
                query Me {
                    users_me {
                        ${fieldString}
                    }
                }
            `

        return this.client.query({ query: QUERY_ME, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }

    requestPasswordReset = ({ email }: QueryRequestPasswordReset) => {
        const REQUEST_PASSWORD_RESET =
            gql`
                mutation RequestPasswordReset {
                    auth_password_request(email: "${email}", reset_url: "https://localhost/resetpassword")
                }
            `

        return this.client.mutate({ mutation: REQUEST_PASSWORD_RESET, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }

    applyPasswordReset = ({ token, password }: QueryApplyPasswordReset) => {
        const APPLY_PASSWORD_RESET =
            gql`
                mutation ApplyPasswordReset {
                    auth_password_reset(token: "${token}", password: "${password}")
                }
            `

        return this.client.mutate({ mutation: APPLY_PASSWORD_RESET, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }

    generateTfa = ({ password }: GenerateTfa) => {
        const GENERATE_TFA =
            gql`
                mutation GenerateTfa {
                    users_me_tfa_generate(password: "${password}") {
                        secret
                        otpauth_url
                    }
                }
            `

        return this.client.mutate({ mutation: GENERATE_TFA, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }

    enableTfa = ({ otp, secret }: EnableTfa) => {
        const ENABLE_TFA =
            gql`
                mutation EnableTfa {
                    users_me_tfa_enable(otp: "${otp}", secret: "${secret}")
                }
            `

        return this.client.mutate({ mutation: ENABLE_TFA, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }

    disableTfa = ({ otp }: DisableTfa) => {
        const DISABLE_TFA =
            gql`
                mutation DisableTfa {
                    users_me_tfa_disable(otp: "${otp}")
                }
            `

        return this.client.mutate({ mutation: DISABLE_TFA, context: { uri: `${process.env.REACT_APP_BACKEND_DOMAIN}/graphql/system` }, fetchPolicy: 'network-only' })
    }
}