// import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TodoHeader({stats, currentList}){
    return <div className={cx('todo-header')}>
                  <h3>
                    <FontAwesomeIcon icon={faTasks} /> 
                    <span>{currentList ? currentList.name : 'General Tasks'}</span>
                  </h3>
                  <div className={cx('stats')}>
                    <div className={cx('stat-item')}>
                      <div className={cx('stat-value')}>{stats.total}</div>
                      <div className={cx('stat-label')}>Total</div>
                    </div>
                    <div className={cx('stat-item')}>
                      <div className={cx('stat-value')}>{stats.pending}</div>
                      <div className={cx('stat-label')}>Pending</div>
                    </div>
                    <div className={cx('stat-item')}>
                      <div className={cx('stat-value')}>{stats.overdue}</div>
                      <div className={cx('stat-label')}>Overdue</div>
                    </div>
                    <div className={cx('stat-item')}>
                      <div className={cx('stat-value')}>{stats.urgent}</div>
                      <div className={cx('stat-label')}>Urgent</div>
                    </div>
                  </div>
                </div>;
}

export default TodoHeader