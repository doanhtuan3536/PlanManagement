import classNames from 'classnames/bind';
import { useState, useEffect, useRef } from 'react';
import styles from './LeftNavBar.module.scss';
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
import UserSection from './UserSection';
import SettingSection from './SettingSection';

const cx = classNames.bind(styles);
function LeftNavbar({headerName, iconHeader, listContent}){
    const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
    // const [darkMode, setDarkMode] = useState(false);
    const [sidebarNoVisible, setSidebarNoVisible] = useState(true);
    const sidebarRef = useRef(null);
    // const [todos, setTodos] = useState(() => {
    // const saved = localStorage.getItem('todos');
    // return saved ? JSON.parse(saved) : [];
    // });
    // const [todoLists, setTodoLists] = useState(() => {
    // const saved = localStorage.getItem('todoLists');
    // return saved ? JSON.parse(saved) : [
    //     { id: 'default', name: 'General Tasks', color: '#4361ee', active: true, stats: { total: 0, pending: 0 } },
    //     { id: 'personal', name: 'Personal', color: '#f72585', active: false, stats: { total: 0, pending: 0 } },
    //     { id: 'work', name: 'Work', color: '#4cc9f0', active: false, stats: { total: 0, pending: 0 } },
    //     { id: 'shopping', name: 'Shopping', color: '#38b000', active: false, stats: { total: 0, pending: 0 } },
    // ];
    // });
    // const toggleSidebarCollapse = () => {
    // setSidebarCollapsed(!sidebarCollapsed);
    // };
    const showSidebar = () => {
        setSidebarCollapsed(false);

        setTimeout(() => {
            setSidebarNoVisible(false);
        }, 0);
    };
    const hideSidebar = () => {
        setSidebarNoVisible(true);
        console.log("run")

        setTimeout(() => {
            setSidebarCollapsed(true);
        }, 300); // = transition duration
    };
    // const showNotification = (message, type = 'danger') => {
    // setNotification({ show: true, message, type });
    // setTimeout(() => {
    //   setNotification({ ...notification, show: false });
    // }, 5000);
    return <>  
            <aside 
            className={cx('sidebar', { 
            //   noCollapsed: sidebarCollapsed,
              noVisible: sidebarNoVisible 
            })} 
            // style={{display: sidebarCollapsed ? 'none': 'flex'}}
            ref={sidebarRef}
          >
            <div className={cx('sidebar-header')}>
              <div className={cx('logo')}>
                {/* <FontAwesomeIcon icon={faTasks} /> */}
                {iconHeader}
                <span className={cx('logo-text')}>{headerName}</span>
              </div>
    
              <button 
                className={cx('toggle-sidebar')} 
                onClick={hideSidebar}
                title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
              >
                <FontAwesomeIcon icon={sidebarCollapsed ? faChevronRight : faChevronLeft} />
              </button>
            </div>
    
            <nav className={cx('sidebar-nav')}>
              {/* Todo Lists */}
              <div className={cx('sidebar-nav-main-content')}>
                <div className={cx('lists-section')}>
                  {listContent}
                </div>
                <SettingSection />
              </div>
              
              <UserSection />
            </nav>
          </aside> 
        
              {sidebarCollapsed && <button 
                className={cx('show-sidebar-btn')}
                onClick={showSidebar}
                title="Show sidebar"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>}
             </>;
}

export default LeftNavbar;