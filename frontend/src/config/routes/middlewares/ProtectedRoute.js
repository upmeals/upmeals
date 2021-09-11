import React, { useEffect } from 'react';
import withAuth from '../../../components/hoc/withAuth';
import { useHistory } from 'react-router-dom';
import { useIsMount } from '../../../hooks/useIsMount'


// Component middleware
const ProtectedRoute = ({ user, component }) => {
    const history = useHistory();
    const isMount = useIsMount();

    const Component = component

    useEffect(() => {
        if (!isMount && !user.login.pending && !user.login.loggedIn) {
            history.push('/')
        }
    }, [user])

    return (
        <>
            {
                user && user.login && user.login.loggedIn && (
                    <Component />
                )
            }
        </>
    )

}

export default withAuth(ProtectedRoute);