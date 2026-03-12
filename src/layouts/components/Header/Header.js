import classNames from 'classnames/bind';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useSpring, animated } from 'react-spring';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faBell, faCaretDown, faGear, faUser} from '@fortawesome/free-solid-svg-icons';
import TippyWrapper from '../TippyWrapper';
import { KeyRouteFullPath } from '~/utils';
import Button from '../../../components/Button';
import images from '~/assets/images';
import Image from '~/components/Image';
import LinkProjectDropDown from './LinkProjectDropDown';

import styles from './Header.module.scss';
import { useAuth } from '~/context/AuthContext';
import authService from '~/services/AuthService';
import useNotification from '~/hooks/useNotification';
import Notification from '~/components/Notification';
import { useNotificatonContext } from '~/context/NotificationContext';
import { useState } from 'react';
import Loading from '~/pages/Loading';
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
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const {showNotification} = useNotificatonContext();
    const config = { tension: 300, friction: 15, duration: 200 };
    const initialStyles = { opacity: 0 };
    const { isAuthenticated, logout } = useAuth();
    const [props, setSpring] = useSpring(() => initialStyles);
    // const { notification ,showNotification } = useNotification();
    // const [issAuthenticated, setIsAuthenticated] = useState(true);
    const handleLogout = async () => {
        // Your logout logic here
        console.log('Logging out...');
        try {
            setLoading(true);
            const result = await logout(authService.tokens.refreshTokenId);  // Changed from email to username
            if (result.success) {
                // Login successful
                showNotification("Logout successfully", "success")
                navigate(KeyRouteFullPath('login'));

            } else {
                // setError(result.error + ". Try again" || 'Đăng nhập thất bại');
            }
        } catch (error) {
            // setError('Có lỗi xảy ra, vui lòng thử lại');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
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
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className={cx('notification-badge')}>3</span>
                                    </button>
                                </li>

                                {/* User Avatar with Dropdown */}
                                <li className={cx('navbar-list-item'
                                    // , 'has-line-separator'
                                    ,'user-avatar-container')}>
                                    <div className={cx('user-dropdown')}>
                                        <button className={cx('user-avatar-btn')}>
                                            {/* <img 
                                                src="/path-to-user-avatar.jpg" 
                                                alt="User avatar" 
                                                className={cx('user-avatar')}
                                            /> */}
                                            <Image src={user.avatar} alt="User avatar" className={cx('user-avatar')} />
                                            {/* <svg className={cx('dropdown-arrow')} width="16" height="16" viewBox="0 0 24 24" fill="none">
                                                <path d="M7 10L12 15L17 10H7Z" fill="currentColor"/>
                                            </svg> */}
                                            <FontAwesomeIcon className={cx('dropdown-arrow')} icon={faCaretDown} />
                                        </button>
                                        
                                        {/* Dropdown Menu */}
                                        <div className={cx('dropdown-menu')}>
                                            <div className={cx('dropdown-header')}>
                                                <p className={cx('user-name')}>{user.username}</p>
                                                {/* <p className={cx('user-email')}>john.doe@example.com</p> */}
                                            </div>
                                            <ul className={cx('dropdown-list')}>
                                                <li>
                                                    <Link className={cx('dropdown-item')} to="/profile">
                                                        <FontAwesomeIcon icon={faUser} />
                                                        Profile
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className={cx('dropdown-item')} to="/settings">
                                                        <FontAwesomeIcon icon={faGear} />
                                                        Settings
                                                    </Link>
                                                </li>
                                                <li className={cx('dropdown-divider')}></li>
                                                <li>
                                                    <div className={cx('dropdown-item')} onClick={handleLogout}>
                                                        {loading ? <span className={cx('spinner', 'dropdown-item')}></span> : <>
                                                            <button className={cx('dropdown-item', 'logout-btn')} >
                                                                <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                                            </button>
                                                            Logout
                                                        </>}
                                                        {/* <span className={cx('spinner', 'dropdown-item')}></span> */}
                                                        
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
    );
}

export default Header;
