import { Outlet } from 'react-router-dom';

function projects() {
    return (
        <div>
            projects
            <Outlet />
        </div>
    );
}

export default projects;
