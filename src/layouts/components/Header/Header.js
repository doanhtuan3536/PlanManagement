import classNames from 'classnames/bind';

import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import config from '~/config';
const cx = classNames.bind(styles);
function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">
                <div className={cx('navbar-list')}>
                    {Object.keys(config.routes).map((route, index) => {
                        return (
                            <Link key={index} to={config.routes[route].path}>
                                {route}
                            </Link>
                        );
                    })}
                    <Link to={'/projects/form'}>form</Link>
                </div>
            </div>
        </div>
        // <div>haha</div>
    );
}

export default Header;
