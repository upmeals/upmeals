import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { GetAuthIsLoggedIn } from '../../../store/auth';
import { GetInitIsAppReady } from '../../../store/init';


interface ProtectedRouteProps {
    component: React.FunctionComponent<any>,
    isProtected: boolean | undefined,
    path: any,
    key: any,
}


const ProtectedRoute = ({ component, isProtected }: ProtectedRouteProps) => {
    const history = useHistory();


    const isLoggedIn = GetAuthIsLoggedIn()
    const isAppReady = GetInitIsAppReady()


    const Component = component


    useEffect(() => {
        if (isProtected === true && isAppReady && !isLoggedIn) {
            history.push('/')
        } else if (isProtected === false && isAppReady && isLoggedIn) {
            history.push('/')
        }
    }, [history, isAppReady, isLoggedIn, isProtected])

    
    return (
        <>
            {
                isProtected === true ? (
                    <>
                        {
                            !isLoggedIn && isAppReady ? (
                                <p>Loading...</p>
                            ) : (
                                <Component />
                            )
                        }
                    </>
                ) : (
                    <>
                        {
                            isLoggedIn && isAppReady ? (
                                <p>Loading...</p>
                            ) : (
                                <Component />
                            )
                        }
                    </>
                )
            }
        </>
    )
}

export default ProtectedRoute