import styles from './TippyWrapper.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function TippyWrapper({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default TippyWrapper;
