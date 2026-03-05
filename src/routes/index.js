import { lazy } from 'react';
import DefaultWithLeftNavBar from '~/layouts/DefaultWithLeftNavBar';
import HeaderOnly from '~/layouts/HeaderOnly';

import { KeyRouteFullPath, KeyRoutePartPath } from '~/utils';

const publicRoutes = [
    {
        path: KeyRouteFullPath('home'),
        Component: lazy(() => import('~/pages/Home')),
        layout: DefaultWithLeftNavBar
    },
    {
        path: '/',
        Component: lazy(() => import('~/pages/Loading')),
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
    },
    {
        path: KeyRouteFullPath('create'),
        Component: lazy(() => import('~/pages/CreateForm')),
    },
    {
        path: KeyRouteFullPath('trash'),
        Component: lazy(() => import('~/pages/Trash')),
    },
    {
        path: KeyRouteFullPath('project'),
        Component: lazy(() => import('~/pages/Project')),
    },

];

export { publicRoutes, privateRoutes };
