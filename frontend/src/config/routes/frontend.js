import React from 'react';

// Import routes
const Frontend = React.lazy(() => import('../../components/frontend/Frontend'))
const Dashboard = React.lazy(() => import('../../components/frontend/dashboard/Dashboard'))
const Login = React.lazy(() => import('../../components/frontend/auth/login/Login'))
const Register = React.lazy(() => import('../../components/frontend/auth/register/Register'))
const Listing = React.lazy(() => import('../../components/frontend/dashboard/listing/ListingPage'))
const Cook = React.lazy(() => import('../../components/frontend/dashboard/cook/CookPage'))
const Recipe = React.lazy(() => import('../../components/frontend/dashboard/recipe/RecipePage'))
const Suggest = React.lazy(() => import('../../components/frontend/dashboard/suggest/SuggestPage'))
const Wishlist = React.lazy(() => import('../../components/frontend/dashboard/wishlist/WishlistPage'))


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
        isProtected: false
    },
    {
        path: '/listing',
        component: Listing,
        exact: true,
        isProtected: false
    },
    {
        path: '/cook',
        component: Cook,
        exact: true,
        isProtected: false
    },
    {
        path: '/recipe',
        component: Recipe,
        exact: true,
        isProtected: false
    },
    {
        path: '/suggest',
        component: Suggest,
        exact: true,
        isProtected: false
    },
    {
        path: '/wishlist',
        component: Wishlist,
        exact: true,
        isProtected: false
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