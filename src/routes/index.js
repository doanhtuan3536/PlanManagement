import config from '~/config';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Project from '~/pages/Project';
import Projects from '~/pages/Projects';
const publicRoutes = [
    {
        path: config.routes.home,
        Component: Home,
    },
    {
        path: config.routes.projects,
        Component: Projects,
    },
    {
        path: config.routes.project,
        Component: Project,
    },
    {
        path: config.routes.login,
        Component: Login,
    },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
