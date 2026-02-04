// import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faTasks
// } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TodoFooter() {
    return (
        <div className={cx('todo-footer')}>
            <div className={cx('priority-legend')}>
                <div className={cx('legend-item')}>
                    <div className={cx('legend-color', 'legend-low')}></div>
                    <span>Low</span>
                </div>
                <div className={cx('legend-item')}>
                    <div className={cx('legend-color', 'legend-medium')}></div>
                    <span>Medium</span>
                </div>
                <div className={cx('legend-item')}>
                    <div className={cx('legend-color', 'legend-high')}></div>
                    <span>High</span>
                </div>
                <div className={cx('legend-item')}>
                    <div className={cx('legend-color', 'legend-urgent')}></div>
                    <span>Urgent</span>
                </div>
            </div>
            <p>Click on task to edit • Drag and drop to reorder</p>
        </div>
    );
}

export default TodoFooter;
