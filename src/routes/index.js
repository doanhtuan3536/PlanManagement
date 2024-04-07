import { lazy } from 'react';

import { KeyRouteFullPath, KeyRoutePartPath } from '~/utils';

// import config from '~/config';

const publicRoutes = [
    {
        path: KeyRouteFullPath('home'),
        Component: lazy(() => import('~/pages/Home')),
    },
    {
        path: KeyRouteFullPath('projects'),
        Component: lazy(() => import('~/pages/Projects')),
        insideRoute: [
            {
                path: KeyRoutePartPath('form'),
                Component: lazy(() => import('~/pages/Projects/Form')),
            },
        ],
    },
    {
        path: KeyRouteFullPath('project'),
        Component: lazy(() => import('~/pages/Project')),
    },
    {
        path: KeyRouteFullPath('login'),
        Component: lazy(() => import('~/pages/Login')),
    },
];

console.log(publicRoutes);

const privateRoutes = [];

export { publicRoutes, privateRoutes };
