import config from '~/config';

function findRoute(routeObject, name, path, fullPath = true) {
    if (routeObject.name === name) {
        return path;
    }
    if (routeObject.children) {
        for (let keyRoute in routeObject.children) {
            let newRouteObject = {
                name: keyRoute,
                children: routeObject.children[keyRoute].children,
            };
            let route = findRoute(
                newRouteObject,
                name,
                fullPath ? path + routeObject.children[keyRoute].path : routeObject.children[keyRoute].path,
                fullPath,
            );
            if (route) {
                return route;
            }
        }
    }
}

function KeyRouteFullPath(name) {
    for (let keyRoute in config.routes) {
        let RouteObject = {
            name: keyRoute.toLowerCase(),
            children: config.routes[keyRoute].children,
        };
        let route = findRoute(RouteObject, name, config.routes[keyRoute].path);
        if (route) {
            return route;
        }
    }
}

function KeyRoutePartPath(name) {
    for (let keyRoute in config.routes) {
        let RouteObject = {
            name: keyRoute.toLowerCase(),
            children: config.routes[keyRoute].children,
        };
        let route = findRoute(RouteObject, name, config.routes[keyRoute].path, false);
        if (route) {
            return route;
        }
    }
}

// console.log(KeyRoute('project'));
export { KeyRouteFullPath, KeyRoutePartPath };
