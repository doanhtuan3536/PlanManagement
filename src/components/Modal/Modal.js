import classNames from 'classnames/bind';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({children, conditionOpen = false, onClickModalOverlay = {}, header, footer}) {

    return <div className={cx('modal-overlay', {active: conditionOpen})} onClick={onClickModalOverlay}>
        <div className={cx('modal-content')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('modal-header')}>
                {header}
            </div>
            <div className={cx('modal-body')}>
                {children}
            </div>
            {footer && <div className={cx('modal-footer')}>
                {footer}
            </div>}
        </div>
    </div>;
}

export default Modal;