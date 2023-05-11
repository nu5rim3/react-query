import React, { lazy } from 'react';

// project import
import MainLayout from '../layouts/MainLayout';
import Loadable from '../components/Loadable';

// project pages with lazy
const Posts = Loadable(lazy(() => import('../pages/posts/Posts')));
const CreatePost = Loadable(lazy(() => import('../pages/posts/CreatePost')));

// ==============================|| AUTH ROUTING ||============================== //

const AuthRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '',
            element: <Posts />
        },
        {
            path: 'posts',
            element: <Posts />
        },
        {
            path: 'create',
            element: <CreatePost />
        },
    ]
}

export default AuthRoutes;