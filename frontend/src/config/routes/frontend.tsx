import React from 'react';

// modals
import GenerateOTPForm from '../../components/auth/otp/GenerateOTPForm';
import EnableOTPForm from '../../components/auth/otp/EnableOTPForm';
import DisableOTPForm from '../../components/auth/otp/DisableOTPForm';
import LoginForm from '../../components/auth/LoginForm';
import RegisterForm from '../../components/auth/RegisterForm';
import DetailsMeal from '../../components/dashboard/command/DetailsMeal';
import SelectionModal from '../../components/dashboard/command/SelectionModal';

// pages
const Frontend = React.lazy(() => import('../../components/Frontend'))
const CommandPage = React.lazy(() => import('../../components/dashboard/command/CommandPage'))
const CookPage = React.lazy(() => import('../../components/dashboard/cook/CookPage'))
const CreatePage = React.lazy(() => import('../../components/dashboard/create/CreatePage'))
const IdeasPage = React.lazy(() => import('../../components/dashboard/ideas/IdeasPage'))
const FavoritesPage = React.lazy(() => import('../../components/dashboard/favorites/FavoritesPage'))
// const LandingPage = React.lazy(() => import('../../components/LandingPage'))
// const LoginPage = React.lazy(() => import('../../components/auth/LoginPage'))
// const RegisterPage = React.lazy(() => import('../../components/auth/RegisterPage'))
// const DashboardPage = React.lazy(() => import('../../components/dashboard/DashboardPage'))
// const TodoPage = React.lazy(() => import('../../components/dashboard/todos/TodoPage'))
// const ForgotPasswordPage = React.lazy(() => import('../../components/auth/forgotPassword/ForgotPasswordPage'))
// const ResetPasswordPage = React.lazy(() => import('../../components/auth/forgotPassword/ResetPasswordPage'))


const routes = [
    {
        path: '/',
        component: Frontend,
        exact: true,
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


export const modals = [
    {
        name: 'generateotp',
        component: GenerateOTPForm,
        isProtected: true,
        props: false,
    },
    {
        name: 'enableotp',
        component: EnableOTPForm,
        isProtected: true,
        props: false,
    },
    {
        name: 'disableotp',
        component: DisableOTPForm,
        isProtected: true,
        props: false,
    },
    {
        name: 'login',
        component: LoginForm,
        isProtected: false,
        props: false,
    },
    {
        name: 'register',
        component: RegisterForm,
        isProtected: false,
        props: false,
    },
    {
        name: 'recipe',
        component: DetailsMeal,
        isProtected: true,
        props: false,
    },
    {
        name: 'replace-recipe',
        component: SelectionModal,
        isProtected: true,
        props: true,
        once: true,
    }
]


export default routes