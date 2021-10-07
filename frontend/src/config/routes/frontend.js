import React from 'react';

// Import routes
const Frontend = React.lazy(() => import('../../components/frontend/Frontend'))
const Dashboard = React.lazy(() => import('../../components/frontend/Dashboard'))
const Login = React.lazy(() => import('../../components/frontend/auth/login/Login'))
const Register = React.lazy(() => import('../../components/frontend/auth/register/Register'))


// Routes
export default [
    {
        path: '/',
        component: Frontend,
        exact: true,
        isProtected: false
    },
    {
        path: '/dashboard',
        component: Dashboard,
        exact: true,
        isProtected: true
    },
    {
        path: '/login',
        component: Login,
        exact: true
    },  
    {
        path: '/register',
        component: Register,
        exact: true
    }
]