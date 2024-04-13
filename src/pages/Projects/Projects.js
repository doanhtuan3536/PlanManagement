import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

import { KeyRouteFullPath } from '~/utils';
import Button from '~/layouts/components/Button';
import Search from '~/components/Search';
import styles from './Projects.module.scss';
const cx = classNames.bind(styles);

const options = [
    { value: 'TodoList', label: 'TodoList' },
    { value: 'Project', label: 'Project' },
    { value: 'All', label: 'All' },
];
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
                <div className={cx('search-section')}>
                    <Search placeholderInput={'Search projects'} />
                    <Select
                        options={options}
                        placeholder={'Choose type'}
                        className={cx('select-type')}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: 'rgb(133, 144, 162)',
                                borderRadius: 'none',
                                height: '40px',
                            }),
                        }}
                    />
                </div>
                <div className={cx('button-trash-section')}>
                    <Button primary to={KeyRouteFullPath('create')}>
                        Create
                    </Button>
                    <Link className={cx('trash-link')} to={KeyRouteFullPath('trash')}>
                        <FontAwesomeIcon icon={faTrash} /> : 1
                    </Link>
                </div>
                <main className={cx('main-content')}>
                    <table className={cx('table-list-projects')}>
                        <thead className={cx('table-list-projects_headers')}>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Created at</th>
                                <th>Amount of tasks</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody className={cx('table-list-projects_items')}>
                            {projects.map((project) => {
                                return (
                                    // <Link>
                                    <tr>
                                        <td>{project.id}</td>
                                        <td>
                                            <Link
                                                to={KeyRouteFullPath('projects') + `/${project.id}`}
                                                className={cx('cell-table-link', 'table-link-name')}
                                            >
                                                {project.name}
                                            </Link>
                                        </td>
                                        <td>{project.type}</td>
                                        <td>{project.CreatedAt}</td>
                                        <td>
                                            {project.AmountTasks} {`( Done: ${project.AmountTasksDone} )`}
                                        </td>
                                        <td className={cx('more-option-cell')}>
                                            <Tippy content="Move to trash">
                                                <Link className={cx('cell-table-link')}>
                                                    {' '}
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </Link>
                                            </Tippy>
                                            <Tippy content="Edit project">
                                                <Link className={cx('cell-table-link')}>
                                                    {' '}
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </Link>
                                            </Tippy>
                                            <Tippy content="More options">
                                                <Link className={cx('cell-table-link')}>
                                                    {' '}
                                                    <FontAwesomeIcon icon={faEllipsis} />
                                                </Link>
                                            </Tippy>
                                        </td>
                                    </tr>
                                    // </Link>
                                );
                            })}
                        </tbody>
                    </table>
                    <div></div>
                </main>
            </div>
        </div>
    );
}

export default Projects;
