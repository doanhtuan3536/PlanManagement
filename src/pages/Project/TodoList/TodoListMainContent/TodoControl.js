import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faTasks
// } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function TodoControl({ currentFilter, currentSort, setCurrentFilter, setCurrentSort }) {
    // const [currentSort, setCurrentSort] = useState('priority');
    // const [currentFilter, setCurrentFilter] = useState('all');
    return (
        <div className={cx('todo-controls')}>
            <div className={cx('filter-buttons')}>
                {['all', 'active', 'completed', 'overdue', 'urgent'].map((filter) => (
                    <button
                        key={filter}
                        className={cx('filter-btn', { active: currentFilter === filter })}
                        onClick={() => setCurrentFilter(filter)}
                    >
                        {filter === 'all' && 'All'}
                        {filter === 'active' && 'Active'}
                        {filter === 'completed' && 'Completed'}
                        {filter === 'overdue' && 'Overdue'}
                        {filter === 'urgent' && 'Urgent'}
                    </button>
                ))}
            </div>
            <div className={cx('sort-options')}>
                <span>Sort by:</span>
                <select
                    className={cx('sort-select')}
                    value={currentSort}
                    onChange={(e) => setCurrentSort(e.target.value)}
                >
                    <option value="priority">Priority</option>
                    <option value="deadline">Deadline</option>
                    <option value="created">Newest</option>
                    <option value="oldest">Oldest</option>
                </select>
            </div>
        </div>
    );
}

export default TodoControl;
