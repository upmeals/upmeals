import React from 'react';

// Import routes
const Frontend = React.lazy(() => import('../../components/frontend/Frontend'))
// const Dashboard = React.lazy(() => import('../../components/frontend/dashboard/Dashboard'))
//const Login = React.lazy(() => import('../../components/frontend/auth/login/Login'))
//const Register = React.lazy(() => import('../../components/frontend/auth/register/Register'))
const CommandPage = React.lazy(() => import('../../components/frontend/dashboard/command/CommandPage'))
const CookPage = React.lazy(() => import('../../components/frontend/dashboard/cook/CookPage'))
const CreatePage = React.lazy(() => import('../../components/frontend/dashboard/create/CreatePage'))
const IdeasPage = React.lazy(() => import('../../components/frontend/dashboard/ideas/IdeasPage'))
const FavoritesPage = React.lazy(() => import('../../components/frontend/dashboard/favorites/FavoritesPage'))


// Routes
const routes = [
    {
        path: '/',
        component: Frontend,
        exact: true,
        isProtected: false
    },
    {
        path: '/command',
        component: CommandPage,
        exact: true,
        isProtected: true
    },
    {
        path: '/cook',
        component: CookPage,
        exact: true,
        isProtected: true
    },
    {
        path: '/create',
        component: CreatePage,
        exact: true,
        isProtected: true
    },
    {
        path: '/ideas',
        component: IdeasPage,
        exact: true,
        isProtected: true
    },
    {
        path: '/favorites',
        component: FavoritesPage,
        exact: true,
        isProtected: true
    },
    /*{
        path: '/login',
        component: Login,
        exact: true
    },  
    {
        path: '/register',
        component: Register,
        exact: true
    }*/
]

export default routes
