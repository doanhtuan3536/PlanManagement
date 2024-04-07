import { lazy } from 'react';

import config from '~/config';

// import Home from '~/pages/Home';
// import Login from '~/pages/Login';
// import Project from '~/pages/Project';
// import Projects from '~/pages/Projects';
const publicRoutes = [
    {
        path: config.routes.home,
        Component: lazy(() => import('~/pages/Home')),
    },
    {
        path: config.routes.projects,
        Component: lazy(() => import('~/pages/Projects')),
    },
    {
        path: config.routes.project,
        Component: lazy(() => import('~/pages/Project')),
    },
    {
        path: config.routes.login,
        Component: lazy(() => import('~/pages/Login')),
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
