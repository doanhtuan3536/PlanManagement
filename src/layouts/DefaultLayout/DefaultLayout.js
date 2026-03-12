import classNames from 'classnames/bind';

import Header from '../components/Header';
import Footer from '../components/Footer';

import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children, headerName }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>

                {headerName && <div className={cx("container-header")}>{headerName}</div>}
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
