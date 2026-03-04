import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell} from '@fortawesome/free-solid-svg-icons';
import TippyWrapper from '../TippyWrapper';
import { KeyRouteFullPath } from '~/utils';
import Button from '../../../components/Button';
import images from '~/assets/images';
import Image from '~/components/Image';
import LinkProjectDropDown from './LinkProjectDropDown';

import styles from './Header.module.scss';
import { useAuth } from '~/context/AuthContext';
import authService from '~/services/AuthService';
// import config from '~/config';
const cx = classNames.bind(styles);
const dropDownProjects = {
    ListProjects: {
        title: 'Your projects',
        children: [
            {
                id: 1,
                name: 'Todo 1',
                type: 'TodoList',
            },
            {
                id: 2,
                name: 'Project 1',
                type: 'Project',
            },
        ],
    },
    listLink: {
        children: [
            {
                id: 1,
                name: 'View all projects',
                to: KeyRouteFullPath('projects'),
            },
            {
                id: 2,
                name: 'New project',
                to: KeyRouteFullPath('create'),
            },
            {
                id: 3,
                name: 'Your trash',
                to: KeyRouteFullPath('trash'),
            },
        ],
    },
};
function Header() {
    const navigate = useNavigate();
    const config = { tension: 300, friction: 15, duration: 200 };
    const initialStyles = { opacity: 0 };
    const { isAuthenticated, logout } = useAuth();
    const [props, setSpring] = useSpring(() => initialStyles);
    // const [issAuthenticated, setIsAuthenticated] = useState(true);
    const handleLogout = async () => {
        // Your logout logic here
        console.log('Logging out...');
        try {
            const result = await logout(authService.tokens.refreshTokenId);  // Changed from email to username
        
            if (result.success) {
                // Login successful
                navigate(KeyRouteFullPath('login'));

            } else {
                // setError(result.error + ". Try again" || 'Đăng nhập thất bại');
            }
        } catch (error) {
            // setError('Có lỗi xảy ra, vui lòng thử lại');
            console.error('Login error:', error);
        } finally {
            // setLoading(false);
        }
        // setIsAuthenticated(false);
    };
    function onMount() {
        setSpring({
            opacity: 1,
            onRest: () => {},
            config,
        });
    }

    function onHide({ unmount }) {
        setSpring({
            ...initialStyles,
            onRest: unmount,
            config: { ...config, clamp: true },
        });
    }
    return (
        <header className={cx('wrapper')}>
            <div className="grid wide">
                <div className={cx('navbar-inner')}>
                    <Link className={cx('navbar-logo')} to={KeyRouteFullPath('home')}>
                        <Image className={cx('navbar-logo-image')} src={images.myLogo} alt={'my logo'} />
                    </Link>
                    <ul className={cx('navbar-list-items', 'main-navbar-list-items')}>
                        <li className={cx('navbar-list-item')}>
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive ? cx('navbar-list-link', 'active') : cx('navbar-list-link');
                                }}
                                to={KeyRouteFullPath('home')}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className={cx('navbar-list-item')}>
                            <Tippy
                                interactive
                                delay={[100, 0]}
                                placement="bottom-start"
                                render={(attrs) => (
                                    <animated.div
                                        style={props}
                                        className={cx('drop-down-menu')}
                                        tabIndex="-1"
                                        {...attrs}
                                    >
                                        <TippyWrapper {...attrs}>
                                                {Object.keys(dropDownProjects).map((header, index) => {
                                                    return (
                                                        <>
                                                            {index > 0 && <div className={cx('line-separator')}></div>}
                                                            {dropDownProjects[header].title && (
                                                                <span className={cx('drop-down-menu__header')}>
                                                                    {dropDownProjects[header].title}
                                                                </span>
                                                            )}
                                                            {dropDownProjects[header].children &&
                                                                dropDownProjects[header].children.map((link, index) => {
                                                                    return (
                                                                        <LinkProjectDropDown
                                                                            key={link.id}
                                                                            className={cx('drop-down-menu__link')}
                                                                            to={
                                                                                KeyRouteFullPath('projects') +
                                                                                `/${link.id}${link.type ? '?type='+ link.type : ''}`
                                                                            }
                                                                            dataItem={link}
                                                                        >
                                                                            {link.name}
                                                                        </LinkProjectDropDown>
                                                                    );
                                                                })}
                                                        </>
                                                    );
                                                })}
                                            
                                        </TippyWrapper>
                                    </animated.div>
                                )}
                                animation={true}
                                onMount={onMount}
                                onHide={onHide}
                                // appendTo={(reference) => reference}
                            >
                                <NavLink
                                    className={({ isActive }) => {
                                        return isActive ? cx('navbar-list-link', 'active') : cx('navbar-list-link');
                                    }}
                                    to={KeyRouteFullPath('projects')}
                                >
                                    Projects
                                </NavLink>
                            </Tippy>
                        </li>
                        {
                            isAuthenticated && 
                            <Button primary to={KeyRouteFullPath('create')}>
                                Create
                            </Button>
                        }
                        
                    </ul>
                    {
                        isAuthenticated ? 
                        (
                            <ul className={cx('navbar-list-items', 'navbar-user-actions')}>
                                {/* Notification Bell */}
                                <li className={cx('navbar-list-item')}>
                                    <button className={cx('navbar-notification-btn')}>
                                        <svg className={cx('notification-icon')} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
                                        </svg>
                                        <span className={cx('notification-badge')}>3</span>
                                    </button>
                                </li>

                                {/* User Avatar with Dropdown */}
                                <li className={cx('navbar-list-item'
                                    // , 'has-line-separator'
                                    ,'user-avatar-container')}>
                                    <div className={cx('user-dropdown')}>
                                        <button className={cx('user-avatar-btn')}>
                                            <img 
                                                src="/path-to-user-avatar.jpg" 
                                                alt="User avatar" 
                                                className={cx('user-avatar')}
                                            />
                                            <svg className={cx('dropdown-arrow')} width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        <div className={cx('dropdown-menu')}>
                                            <div className={cx('dropdown-header')}>
                                                <p className={cx('user-name')}>John Doe</p>
                                                <p className={cx('user-email')}>john.doe@example.com</p>
                                            </div>
                                            <ul className={cx('dropdown-list')}>
                                                <li>
                                                    <Link className={cx('dropdown-item')} to="/profile">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor"/>
                                                        </svg>
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className={cx('dropdown-item')} to="/settings">
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                            <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94 0 .31.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.57 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" fill="currentColor"/>
                                                        </svg>
                                                        Settings
                                                    </Link>
                                                </li>
                                                <li className={cx('dropdown-divider')}></li>
                                                <li>
                                                    <div className={cx('dropdown-item')}>
                                                    <button className={cx('dropdown-item', 'logout-btn')} onClick={handleLogout}>
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                                                            <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5-5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                                                        </svg>
                                                    </button>
                                                        Logout
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        )
                        :
                        (
                        <ul className={cx('navbar-list-items', 'navbar-user-actions')}>
                            <li className={cx('navbar-list-item', 'has-line-separator')}>
                                <Link className={cx('navbar-list-link')} to={KeyRouteFullPath('login')}>
                                    Login
                                </Link>
                            </li>
                            <li className={cx('navbar-list-item')}>
                                <Link className={cx('navbar-list-link')} to={KeyRouteFullPath('signup')}>
                                    Sign up
                                </Link>
                            </li>
                        </ul>
                        )

                    }
                </div>
            </div>
        </header>
        // <div>haha</div>
    );
}

export default Header;
