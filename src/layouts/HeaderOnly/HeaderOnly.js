import classNames from 'classnames/bind';

import Header from '../components/Header';

import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);
function HeaderOnly({ children, headerName }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                {headerName && <div className={cx("container-header")}>{headerName}</div>}
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default HeaderOnly;