import React, { lazy } from 'react';

// project import
import MinimalLayout from '../layouts/MinimalLayout';

// project pages with lazy
const Login = lazy(() => import('../pages/auth/Login'));

// ==============================|| UNAUTH ROUTING ||============================== //

const UnAuthRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <Login />
        },
    ]
}

export default UnAuthRoutes;