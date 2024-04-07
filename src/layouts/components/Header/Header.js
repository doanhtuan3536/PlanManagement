import classNames from 'classnames/bind';
import { Link, NavLink } from 'react-router-dom';

import { KeyRouteFullPath } from '~/utils';
import Button from '../Button';

import styles from './Header.module.scss';
// import config from '~/config';
const cx = classNames.bind(styles);
function Header() {
    return (
        <header className={cx('wrapper')}>
            <div className="grid wide">
                <div className={cx('navbar-inner')}>
                    <ul className={cx('navbar-list-items', 'main-navbar-list-items')}>
                        <li className={cx('navbar-list-item')}>
                            <NavLink
                                className={({ isActive }) => {
                                    return isActive ? cx('navbar-list-link') : cx('navbar-list-link', 'active');
                                }}
                                to={KeyRouteFullPath('home')}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className={cx('navbar-list-item')}>
                            <Link className={cx('navbar-list-link')} to={KeyRouteFullPath('projects')}>
                                Projects
                            </Link>
                        </li>
                        <Button primary>Create</Button>
                    </ul>
                    <ul className={cx('navbar-list-items')}>
                        <li className={cx('navbar-list-item', 'has-line-separator')}>
                            <Link className={cx('navbar-list-link')} to={KeyRouteFullPath('home')}>
                                Login
                            </Link>
                        </li>
                        <li className={cx('navbar-list-item')}>
                            <Link className={cx('navbar-list-link')} to={KeyRouteFullPath('projects')}>
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
