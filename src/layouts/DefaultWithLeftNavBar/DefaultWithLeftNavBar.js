import classNames from 'classnames/bind';

import Header from '../components/Header';
import Footer from '../components/Footer';
import LeftNavbar from '~/layouts/components/LeftNavbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCogs, faUsers, faTasks
    } from '@fortawesome/free-solid-svg-icons';

import styles from './DefaultWithLeftNavBar.module.scss';

const cx = classNames.bind(styles);
function DefaultWithLeftNavBar({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <LeftNavbar headerName={'Task manager'} iconHeader={<FontAwesomeIcon icon={faTasks} />} />
                <div className={cx('content')}>{children}</div>
            </div>
            <Footer />
        </div>
    );
}

export default DefaultWithLeftNavBar;
