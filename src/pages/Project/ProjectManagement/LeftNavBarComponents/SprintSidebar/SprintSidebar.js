import classNames from 'classnames/bind';
import styles from './SprintSidebar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus}  from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '~/utils';

const cx = classNames.bind(styles);



function SprintSidebar({sprints, tasks, currentSprintId ,openSprintModal, switchSprint}) {
    const renderSprintSidebar = () => {
      return sprints.map(sprint => {
        const sprintTasks = tasks.filter(t => t.sprintId === sprint.id);
        const completedTasks = sprintTasks.filter(t => t.status === 'done').length;
        const totalTasks = sprintTasks.length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
        
        return (
          <div 
            key={sprint.id}
            className={cx('sprint-sidebar-item', { active: sprint.id === currentSprintId })}
            onClick={() => switchSprint(sprint.id)}
          >
            <div className={cx('sprint-name')}>{sprint.name}</div>
            <div className={cx('sprint-dates')}>
              <span>{formatDate(sprint.startDate)}</span>
              <span>→</span>
              <span>{formatDate(sprint.endDate)}</span>
            </div>
            <div className={cx('sprint-stats')}>
              <span>{progress}% hoàn thành</span>
              <span>{sprint.velocity} pts</span>
            </div>
          </div>
        );
      });
    };

    return <div className={cx('sprint-sidebar')}>
                <div className={cx('sprint-sidebar-header')}>
                  <h3>🏃‍♂️ Sprints</h3>
                  <span className={cx('sprint-count')}>{sprints.length}</span>
                </div>
                <div className={cx('sprint-list')}>
                  {renderSprintSidebar()}
                </div>
                <button className={cx('add-sprint-btn')} onClick={openSprintModal}>
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Thêm Sprint mới</span>
                </button>
              </div>;
}

export default SprintSidebar;