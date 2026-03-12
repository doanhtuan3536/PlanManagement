import { lazy } from 'react';
import DefaultWithLeftNavBar from '~/layouts/DefaultWithLeftNavBar';
import HeaderOnly from '~/layouts/HeaderOnly';

import { KeyRouteFullPath, KeyRoutePartPath } from '~/utils';

const publicRoutes = [
    {
        path: KeyRouteFullPath('home'),
        Component: lazy(() => import('~/pages/Home')),
        // headerName: "Home"
    },
    {
        path: '/',
        Component: lazy(() => import('~/pages/Home')),
        // headerName: "Home"
    },
    // {
    //     path: KeyRouteFullPath('projects'),
    //     Component: lazy(() => import('~/pages/Projects')),
    //     // insideRoute: [
    //     //     {
    //     //         path: KeyRoutePartPath('trash'),
    //     //         Component: lazy(() => import('~/pages/Trash')),
    //     //     },
    //     // ],
    // },
    
    // {
    //     path: KeyRouteFullPath('create'),
    //     Component: lazy(() => import('~/pages/CreateForm')),
    // },
    {
        path: KeyRouteFullPath('login'),
        Component: lazy(() => import('~/pages/Authenications/Login')),
        layout: HeaderOnly
    },
    {
        path: KeyRouteFullPath('signup'),
        Component: lazy(() => import('~/pages/Authenications/Signup')),
        layout: HeaderOnly
    },
];

const privateRoutes = [
    {
        path: KeyRouteFullPath('projects'),
        Component: lazy(() => import('~/pages/Projects')),
        // insideRoute: [
        //     {
        //         path: KeyRoutePartPath('trash'),
        //         Component: lazy(() => import('~/pages/Trash')),
        //     },
        // ],
        headerName: "Projects"
    },
    {
        path: KeyRouteFullPath('create'),
        Component: lazy(() => import('~/pages/CreateForm')),
        headerName: "Create new plan"
    },
    {
        path: KeyRouteFullPath('trash'),
        Component: lazy(() => import('~/pages/Trash')),
        headerName: "Trash"
    },
    {
        path: KeyRouteFullPath('project'),
        Component: lazy(() => import('~/pages/Project')),
        headerName: "Your plan"
    },
    {
        path: KeyRouteFullPath('profile'),
        Component: lazy(() => import('~/pages/Profile')),
        headerName: "Account profile"
    },
    {
        path: KeyRouteFullPath('settings'),
        Component: lazy(() => import('~/pages/Settings')),
        headerName: "Account Settings"
    },

];

export { publicRoutes, privateRoutes };
