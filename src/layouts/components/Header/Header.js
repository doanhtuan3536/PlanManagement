import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useSpring, animated } from 'react-spring';

import TippyWrapper from '../TippyWrapper';
import { KeyRouteFullPath } from '~/utils';
import Button from '../Button';
import images from '~/assets/images';
import Image from '~/components/Image';
import LinkProjectDropDown from './LinkProjectDropDown';

import styles from './Header.module.scss';
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
                name: 'View all projects',
                to: KeyRouteFullPath('projects'),
            },
            {
                name: 'New project',
                to: KeyRouteFullPath('create'),
            },
            {
                name: 'Your trash',
                to: KeyRouteFullPath('trash'),
            },
        ],
    },
};
function Header() {
    const config = { tension: 300, friction: 15, duration: 200 };
    const initialStyles = { opacity: 0 };
    const [props, setSpring] = useSpring(() => initialStyles);
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
                                            <>
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
                                                                                `/${link.id}`
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
                                            </>
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
                        <Button primary to={KeyRouteFullPath('create')}>
                            Create
                        </Button>
                    </ul>
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
                </div>
            </div>
        </header>
        // <div>haha</div>
    );
}

export default Header;
