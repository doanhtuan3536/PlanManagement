import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
const cx = classNames.bind(styles);
function Header() {
    return (
        <div>
            <Link to={'/home'}>home</Link>
            <Link to={'/login'}>login</Link>
            <Link to={'/projects'}>projects</Link>
            <Link to={'/p'}>p</Link>
            header
        </div>
    );
}

export default Header;
