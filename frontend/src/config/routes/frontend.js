import React from 'react';

// Import routes
const Frontend = React.lazy(() => import('../../components/frontend/Frontend'))
const Dashboard = React.lazy(() => import('../../components/frontend/Dashboard'))


// Routes
export default [
    {
        path: '/',
        component: Frontend,
        exact: true,
        isProtected: false,
    },
    {
        path: '/dashboard',
        component: Dashboard,
        exact: true,
        isProtected: true,
    }
]