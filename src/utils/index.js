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
            let pathChild = routeObject.children[keyRoute].path;
            let route = findRoute(
                newRouteObject,
                name,
                fullPath
                    ? path + (routeObject.children[keyRoute].path.startsWith('/') ? pathChild : '/' + pathChild)
                    : routeObject.children[keyRoute].path,
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

const formatDeadline = (deadline, overdue, dueSoon) => {
    if (!deadline) return { text: 'No deadline', class: '' };

    const deadlineDate = new Date(deadline);
    const now = new Date();
    const timeDiff = deadlineDate.getTime() - now.getTime();
    const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    let displayText = '';
    let displayClass = '';

    if (overdue) {
        displayText = `Overdue ${Math.abs(dayDiff)} days`;
        displayClass = 'overdue';
    } else if (dueSoon) {
        displayText = 'Due soon';
        displayClass = 'due-soon';
    } else if (dayDiff === 0) {
        displayText = 'Today';
    } else if (dayDiff === 1) {
        displayText = 'Tomorrow';
    } else {
        displayText = `In ${dayDiff} days`;
    }

    const formattedDate = deadlineDate.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
    displayText += ` (${formattedDate})`;

    return { text: displayText, class: displayClass };
};
const getPriorityText = (priority) => {
        const priorityMap = {
            low: 'Low',
            medium: 'Medium',
            high: 'High',
            urgent: 'Urgent',
        };
        return priorityMap[priority] || priority;
};

// console.log(KeyRoute('project'));
export { KeyRouteFullPath, KeyRoutePartPath, formatDeadline, getPriorityText};
