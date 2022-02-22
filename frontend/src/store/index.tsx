import { InMemoryCache, gql } from '@apollo/client';
import { isLoggedInVar, currentUserVar, otpVar } from './auth/vars';
import { isAppReadyVar } from './init/vars';
import { modalPropsVar } from './modal/vars';


// Global State
export const typeDefs = gql`
    extend type Query {
        isLoggedIn: Boolean!,
        isAppReady: Boolean!,
        currentUser: object!,
        otp: object!,
        modalProps: object!,
    }
`


// Field policy
export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
        Query: {
            fields: {
                isLoggedIn: {
                    read() {
                        return isLoggedInVar();
                    }
                },
                isAppReady: {
                    read() {
                        return isAppReadyVar();
                    }
                },
                currentUser: {
                    read() {
                        return currentUserVar();
                    }
                },
                otp: {
                    read() {
                        return otpVar();
                    }
                },
                modalProps: {
                    read() {
                        return modalPropsVar();
                    }
                }
            }
        }
    }
});