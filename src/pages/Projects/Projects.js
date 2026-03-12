import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';

import { KeyRouteFullPath } from '~/utils';
import Button from '~/components/Button';
import Search from '~/components/Search';
import styles from './Projects.module.scss';
import Pagination from '../components/Pagination';
import { useState } from 'react';
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
    const [page, setPage] = useState(1);
    return (
        <div className='wrapper'>
            <div className="grid wide">
                <div className={cx('wrapper')}>
                    <div className={cx('search-section')}>
                        <Search placeholderInput={'Search projects'} />
                        <Select
                            options={options}
                            placeholder={'Choose type'}
                            className={cx('select-type-container')}
                            // classNamePrefix= {cx('select-type')}
                            // classNames={{
                            //     control: (state) =>
                            //     state.isFocused ? cx('select-type-control') : cx('select-type-control'),
                            // }}
                            styles={{
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                    // borderColor: state.isFocused ? 'grey' : 'red',
                                    borderRadius: 'none',
                                    borderColor: 'transparent',
                                    ':hover': {
                                        borderColor: 'transparent',
                                    },
                                    // boxShadow: state.isFocused ?  'transparent' : 'transparent'
                                    // borderColor: state.isFocused ?  'transparent' : 'transparent'
                                    // borderWidth: '2px'
                                    // boxShadow: state.isFocused  ? 'rgba(4, 130, 233, 0.897)' : 'none'
                                    // border: state.isFocused ? '2px solid rgb(133, 144, 162)' : '2px solid rgb(133, 144, 162)'
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
                                        <tr key={project.id}>
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
                                                <div className={cx('progress-bar')}>
                                                    <div className={cx('progress-fill')} style={{ width: '50%' }}></div>
                                                </div>
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
                        {/* <div className={cx('pagination')}>
                            <button className={cx('pagination-btn')}>Previous</button>
                            <button className={cx('pagination-btn', 'active')}>1</button>
                            <button className={cx('pagination-btn')}>2</button>
                            <button className={cx('pagination-btn')}>3</button>
                            <span>...</span>
                            <button className={cx('pagination-btn')}>8</button>
                            <button className={cx('pagination-btn')}>Next</button>
                        </div> */}
                        <Pagination totalPages={8} currentPage={page} setPage={setPage} />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default Projects;
