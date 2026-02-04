const routes = {
    home: {
        path: '/home',
    },
    projects: {
        path: '/projects',
        children: {
            project: {
                path: '/:id',
            },
            trash: {
                path: 'trash',
            },
        },
    },
    create: {
        path: '/create',
    },
    login: {
        path: '/login',
    },
    signup: {
        path: '/signup',
    },
};
export default routes;
