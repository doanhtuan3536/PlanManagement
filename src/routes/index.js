import { lazy } from 'react';

import { KeyRouteFullPath, KeyRoutePartPath } from '~/utils';

const publicRoutes = [
    {
        path: KeyRouteFullPath('home'),
        Component: lazy(() => import('~/pages/Home')),
    },
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
        path: KeyRouteFullPath('trash'),
        Component: lazy(() => import('~/pages/Trash')),
    },
    {
        path: KeyRouteFullPath('project'),
        Component: lazy(() => import('~/pages/Project')),
    },
    {
        path: KeyRouteFullPath('create'),
        Component: lazy(() => import('~/pages/CreateForm')),
    },
    {
        path: KeyRouteFullPath('login'),
        Component: lazy(() => import('~/pages/Login')),
    },
    {
        path: KeyRouteFullPath('signup'),
        Component: lazy(() => import('~/pages/Signup')),
    },
];

console.log(publicRoutes);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
