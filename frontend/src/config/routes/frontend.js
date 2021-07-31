import React from 'react';

// Import routes
const Frontend = React.lazy(() => import('../../components/frontend/Frontend'))


// Routes
export default [
    {
        path: '/',
        component: Frontend,
        exact: true,
        isProtected: false,
    },
]