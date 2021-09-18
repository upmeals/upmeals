import React, { useEffect } from 'react';
import withAuth from '../../../components/hoc/withAuth';
import { useHistory } from 'react-router-dom';
import { useIsMount } from '../../../hooks/useIsMount'


// Component middleware
const ProtectedRoute = ({ user, init, component }) => {
    const history = useHistory();
    const isMount = useIsMount();

    const Component = component

    useEffect(() => {
        if (
            !isMount && !user.login.pending && !user.login.loggedIn && init.initialized
        ) {
            history.push('/')
        }

        if (
            user && user.login && !user.login.loggedIn && init.initialized
        ) {
            history.push('/')
        }
    }, [user, isMount, history, init])

    return (
        <>
            {
                user && user.login && !user.login.loggedIn && init.initialized ? (
                    <p>redirecting...</p>
                ) : (
                    <Component />
                )
            }
        </>
    )

}

export default withAuth(ProtectedRoute);