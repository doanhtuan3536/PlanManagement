import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';
import { useSpring, animated } from 'react-spring';

import TippyWrapper from '../TippyWrapper';
import { KeyRouteFullPath } from '~/utils';
import Button from '../Button';
import images from '~/assets/images';
import Image from '~/components/Image';

import styles from './Header.module.scss';
// import config from '~/config';
const cx = classNames.bind(styles);
const mainNavbarLink = ['home', 'projects'];
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
                        {/* {mainNavbarLink.map((link, index) => {
                            return (
                                <li key={index} className={cx('navbar-list-item')}>
                                    <NavLink
                                        className={({ isActive }) => {
                                            return isActive ? cx('navbar-list-link', 'active') : cx('navbar-list-link');
                                        }}
                                        to={KeyRouteFullPath(link)}
                                    >
                                        {link.charAt(0).toUpperCase() + link.slice(1)}
                                    </NavLink>
                                </li>
                            );
                        })} */}
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
                                // interactiveBorder={10}
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
                                            <div className={cx('drop-down-menu-wrapper')}>
                                                {' '}
                                                Helloo ngu qua di thag ngu
                                            </div>
                                        </TippyWrapper>
                                    </animated.div>
                                )}
                                animation={true}
                                onMount={onMount}
                                onHide={onHide}
                                appendTo={(reference) => reference}
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
                        <Button primary>Create</Button>
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
