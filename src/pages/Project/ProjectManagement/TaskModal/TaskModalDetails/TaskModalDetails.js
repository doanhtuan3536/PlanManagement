import classNames from 'classnames/bind';
import styles from './TaskModalDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function TaskModalDetails({modalTaskData, closeTaskModal}) {
    return <div className={cx('modal-overlay', 'active')} onClick={closeTaskModal}>
              <div className={cx('task-modal')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('modal-header')}>
                  <h2 id="modalTaskTitle">{modalTaskData?.id}: {modalTaskData?.title}</h2>
                  <button className={cx('action-btn', 'btn-secondary')} onClick={closeTaskModal}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className={cx('modal-body')}>
                  {renderModalTaskDetails()}
                </div>
              </div>
            </div>;
}

export default TaskModalDetails;