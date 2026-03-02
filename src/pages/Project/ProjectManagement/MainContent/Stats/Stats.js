import classNames from 'classnames/bind';
import styles from './Stats.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt,
faTasks,
faClock,
faAward  } from '@fortawesome/free-solid-svg-icons';
import { formatDate, formatTime } from '~/utils';

const cx = classNames.bind(styles);

function Stats({stats}) {
    return <div className={cx('stats-grid')}>
            <div className={cx('stat-card', 'sprint')}>
              <FontAwesomeIcon icon={faBolt} />
              <div className={cx('stat-number')}>{stats.sprintVelocity}</div>
              <div className={cx('stat-label')}>Sprint Velocity</div>
            </div>
            <div className={cx('stat-card')}>
              <FontAwesomeIcon icon={faTasks} />
              <div className={cx('stat-number')}>{stats.totalTasks}</div>
              <div className={cx('stat-label')}>Tổng tasks</div>
            </div>
            <div className={cx('stat-card')}>
              <FontAwesomeIcon icon={faClock} />
              <div className={cx('stat-number')}>{formatTime(stats.totalTime)}</div>
              <div className={cx('stat-label')}>Tổng giờ làm</div>
            </div>
            <div className={cx('stat-card')}>
              <FontAwesomeIcon icon={faAward} />
              <div className={cx('stat-number')}>{stats.totalPoints.toLocaleString()}</div>
              <div className={cx('stat-label')}>Tổng điểm</div>
            </div>
          </div>;
}

export default Stats;