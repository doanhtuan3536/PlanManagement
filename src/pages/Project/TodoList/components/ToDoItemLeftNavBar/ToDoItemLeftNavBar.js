import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ToDoItemLeftNavBar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCog,
  faTags,
  faBell,
  faQuestionCircle,
  faBars,
  faSearch,
  faMoon,
  faSun,
  faClipboardList,
  faEdit,
  faTrash,
  faEllipsisH,
  faExclamationTriangle,
  faCalendar,
  faCalendarTimes,
  faClock,
  faCheck,
  faSave,
  faExclamationCircle,
  faTimes,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function ToDoItemLeftNavBar({onClick, onContextMenu, onClickBtn, isActive, data}) {
    return <div 
              className={cx('todo-list-item', { active: data.active })}
              onClick={onClick}
              onContextMenu={onContextMenu}
            >
              <div 
                className={cx('list-color')} 
                style={{ backgroundColor: data.color }}
              />
              <div className={cx('list-info')}>
                <div className={cx('list-name')}>{data.name}</div>
                <div className={cx('list-stats')}>
                  <span className={cx('stat-item')}>{data.stats.total} tasks</span>
                  <span className={cx('stat-item')}>{data.stats.pending} pending</span>
                </div>
              </div>
              <button 
                className={cx('list-menu-btn')}
                onClick={onClickBtn}
                title="Options"
              >
                <FontAwesomeIcon icon={faEllipsisH} />
              </button>
            </div>;
}

export default ToDoItemLeftNavBar;