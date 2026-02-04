import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SettingSection.module.scss';
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


const cx = classNames.bind(styles);
function UserSection() {
    const [notification, setNotification] = useState({ show: false, message: '', type: 'danger' });
    const showNotification = (message, type = 'danger') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ ...notification, show: false });
    }, 5000);}
    return ( <div className={cx('settings-section')}>
                    <h3 className={cx('settings-title')}>Settings</h3>
        
                    <ul className={cx('settings-list')}>
                      <li className={cx('settings-item')}>
                        <a 
                          href="#" 
                          className={cx('settings-link')}
                          onClick={(e) => {
                            e.preventDefault();
                            showNotification('Feature is under development', 'warning');
                          }}
                        >
                          <FontAwesomeIcon icon={faCog} className={cx('settings-icon')} />
                          <span className={cx('settings-text')}>General Settings</span>
                        </a>
                      </li>
        
                      <li className={cx('settings-item')}>
                        <a 
                          href="#" 
                          className={cx('settings-link')}
                          onClick={(e) => {
                            e.preventDefault();
                            showNotification('Feature is under development', 'warning');
                          }}
                        >
                          <FontAwesomeIcon icon={faTags} className={cx('settings-icon')} />
                          <span className={cx('settings-text')}>Categories & Labels</span>
                        </a>
                      </li>
        
                      <li className={cx('settings-item')}>
                        <a 
                          href="#" 
                          className={cx('settings-link')}
                          onClick={(e) => {
                            e.preventDefault();
                            showNotification('Feature is under development', 'warning');
                          }}
                        >
                          <FontAwesomeIcon icon={faBell} className={cx('settings-icon')} />
                          <span className={cx('settings-text')}>Notifications</span>
                        </a>
                      </li>
        
                      <li className={cx('settings-item')}>
                        <a 
                          href="#" 
                          className={cx('settings-link')}
                          onClick={(e) => {
                            e.preventDefault();
                            showNotification('Feature is under development', 'warning');
                          }}
                        >
                          <FontAwesomeIcon icon={faQuestionCircle} className={cx('settings-icon')} />
                          <span className={cx('settings-text')}>Help & Support</span>
                        </a>
                      </li>
                    </ul>
                  </div> );
}

export default UserSection;