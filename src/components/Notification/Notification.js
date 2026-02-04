import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);
function Notification({
    notification
}) {
    return <div className={cx('notification', notification.type, 'show')}>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        <span dangerouslySetInnerHTML={{ __html: notification.message }} />
                    </div>;
}

export default Notification;
