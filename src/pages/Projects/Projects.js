import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './Projects.module.scss';
import { KeyRouteFullPath } from '~/utils';
import Button from '~/layouts/components/Button';
import Search from '~/components/Search';
const cx = classNames.bind(styles);
const projects = [
    {
        id: 1,
        name: 'Todo 1',
        type: 'TodoList',
        CreatedAt: '12-03-2024',
        AmountTasks: 10,
        AmountTasksDone: 5,
    },
    {
        id: 2,
        name: 'Todo 2',
        type: 'TodoList',
        CreatedAt: '12-04-2024',
        AmountTasks: 14,
        AmountTasksDone: 6,
    },
];
function Projects() {
    return (
        <div className="grid wide">
            <div className={cx('wrapper')}>
                <header className={cx('header')}>Projects</header>
                <Search placeholderInput={'Search projects'} />
                <Button primary to={KeyRouteFullPath('create')}>
                    Create
                </Button>
                <main className={cx('main-content')}>
                    <table className={cx('table-list-projects')}>
                        <thead className={cx('table-list-projects_headers')}>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Created at</th>
                                <th>Amount of tasks</th>
                            </tr>
                        </thead>
                        <tbody className={cx('table-list-projects_items')}>
                            {projects.map((project) => {
                                return (
                                    // <Link>
                                    <tr>
                                        <td>{project.id}</td>
                                        <td>
                                            <Link to={KeyRouteFullPath('projects') + `/${project.id}`}>
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td>{project.type}</td>
                                        <td>{project.CreatedAt}</td>
                                        <td>
                                            {project.AmountTasks} {`( Done: ${project.AmountTasksDone} )`}
                                        </td>
                                    </tr>
                                    // </Link>
                                );
                            })}
                            {/* <tr>
                                <td>Alfreds </td>
                                <td>Maria Anders</td>
                                <td>Germany</td>
                                <td>Germany</td>
                                <td>Germany</td>
                            </tr>
                            <tr>
                                <td>Centro</td>
                                <td>Francisco</td>
                                <td>Mexico</td>
                                <td>Mexico</td>
                                <td>Mexico</td>
                            </tr> */}
                        </tbody>
                    </table>
                    <div></div>
                </main>
            </div>
        </div>
    );
}

export default Projects;
