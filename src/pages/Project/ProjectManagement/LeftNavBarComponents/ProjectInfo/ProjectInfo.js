import classNames from 'classnames/bind';
import styles from './ProjectInfo.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar,
faUserFriends,
faFlag } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function ProjectInfo({projectData, sprints}) {
    return <div className={cx('project-info')}>
                <div className={cx('project-meta')}>
                  <div className={cx('meta-item')}>
                    <FontAwesomeIcon icon={faCalendar} />
                    <span>Q2 2024</span>
                  </div>
                  <div className={cx('meta-item')}>
                    <FontAwesomeIcon icon={faUserFriends} />
                    <span>{projectData.members.length} thành viên</span>
                  </div>
                  <div className={cx('meta-item')}>
                    <FontAwesomeIcon icon={faFlag} />
                    <span>{sprints.length} Sprints</span>
                  </div>
                </div>
                <div className={cx('progress-ring')}>
                  <svg width="80" height="80">
                    <circle className={cx('ring-circle', 'ring-bg')} cx="40" cy="40" r="36"></circle>
                    <circle 
                      className={cx('ring-circle', 'ring-progress')} 
                      cx="40" 
                      cy="40" 
                      r="36"
                      style={{ 
                        strokeDasharray: 226,
                        strokeDashoffset: `calc(226 - (226 * ${projectData.progress}) / 100)`
                      }}
                    ></circle>
                  </svg>
                  <div className={cx('progress-text')}>{projectData.progress}%</div>
                </div>
              </div>;
}

export default ProjectInfo;