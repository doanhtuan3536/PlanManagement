import classNames from 'classnames/bind';
import styles from './Notification.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExclamationTriangle,
  faCircleCheck,
  faCircleInfo,
  faCircleXmark
} from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

const icon = {
    warning: <FontAwesomeIcon icon={faExclamationTriangle} />,
    success: <FontAwesomeIcon icon={faCircleCheck} />,
    info: <FontAwesomeIcon icon={faCircleInfo} />
}
function Notification({
    notification, visible, hideNotification
}) {
    return <div className={cx('notification', notification.type, {
        show: visible
    })}>
        {icon && icon[notification.type]}
        <span dangerouslySetInnerHTML={{ __html: notification.message }} />
        <div className={cx("close-icon")} onClick={hideNotification}>
            <FontAwesomeIcon icon={faCircleXmark} />
        </div>
        
    </div>;
}

export default Notification;
