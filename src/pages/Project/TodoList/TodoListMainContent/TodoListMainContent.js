import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks
} from '@fortawesome/free-solid-svg-icons';
import TodoListMainHeader from './TodoListMainHeader';

const cx = classNames.bind(styles);

function TodoListMainContent({children, currentList, searchTerm, setSearchTerm, darkMode, setDarkMode, toggleMobileSidebar}){
    return <main
                className={cx(
                    'main-content',
                    // ,{ 'collapsed-sidebar': sidebarCollapsed }
                )}
            >
                <div className="grid wide">
                    {/* <header className={cx('main-header')}>
                        <div className={cx('header-left')}>
                            <button className={cx('menu-toggle')} onClick={toggleMobileSidebar} title="Open menu">
                                <FontAwesomeIcon icon={faBars} />
                            </button> */}

                            {/* {sidebarCollapsed && (
              <button 
                className={cx('show-sidebar-btn')}
                onClick={() => setSidebarCollapsed(false)}
                title="Show sidebar"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            )} */}

                            {/* <div className={cx('current-list')}>{currentList ? currentList.name : 'General Tasks'}</div>
                        </div>

                        <div className={cx('header-right')}>
                            <div className={cx('search-box')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                                <input
                                    type="text"
                                    className={cx('search-input')}
                                    placeholder="Search tasks..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <button
                                className={cx('theme-toggle')}
                                onClick={() => {
                                    setDarkMode(!darkMode);
                                    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
                                }}
                                title={darkMode ? 'Light mode' : 'Dark mode'}
                            >
                                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
                            </button>

                            <div className={cx('user-menu')}>
                                <button className={cx('user-menu-btn')}>
                                    <div className={cx('user-avatar-small')}>JD</div>
                                </button>
                            </div>
                        </div>
                    </header> */}
                    <TodoListMainHeader currentList={currentList} searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
                    darkMode={darkMode} setDarkMode={setDarkMode} toggleMobileSidebar={toggleMobileSidebar} />

                    <div className={cx('main-container')}>
                        <div className={cx('todo-container')}>
                            {children}
                        </div>
                    </div>
                </div>
            </main>
}

export default TodoListMainContent
