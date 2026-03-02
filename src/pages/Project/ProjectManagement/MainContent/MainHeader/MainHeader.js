import classNames from 'classnames/bind';
import styles from './MainHeader.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns,
faListCheck,
faTrophy,
faComments,
faPlus,
faBolt,
faPlay,
faFlagCheckered  } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '~/utils';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function MainHeader({sprints, activeView, setActiveView, openSprintModal, createNewTask, currentSprintId, calculateProgress, tasks}) {
    const renderCurrentSprint = () => {
      const currentSprint = sprints.find(s => s.id === currentSprintId);
      if (!currentSprint) return null;
      
      const progress = calculateProgress();
      const sprintTasks = tasks.filter(t => t.sprintId === currentSprintId);
      const completedTasks = sprintTasks.filter(t => t.status === 'done').length;
      const totalTasks = sprintTasks.length;
      
      return (
        <div className={cx('current-sprint')}>
          <div className={cx('sprint-title')}>
            <FontAwesomeIcon icon={faBolt} />
            <span>{currentSprint.name}</span>
          </div>
          <div className={cx('sprint-dates-main')}>
            <span><FontAwesomeIcon icon={faPlay} /> {formatDate(currentSprint.startDate)}</span>
            <span><FontAwesomeIcon icon={faFlagCheckered} /> {formatDate(currentSprint.endDate)}</span>
          </div>
          <div className={cx('sprint-progress')}>
            <div className={cx('progress-bar')}>
              <div className={cx('progress-fill')} style={{ width: `${progress}%` }}></div>
            </div>
            <div className={cx('progress-text-small')}>
              {progress}% hoàn thành ({completedTasks}/{totalTasks} tasks)
            </div>
          </div>
        </div>
      );
    };


    return <div className={cx('main-header')}>
                <div className={cx('sprint-selector')}>
                  {renderCurrentSprint()}
                  
                  <div className={cx('view-toggle')}>
                    <Button
                      noHover
                      actionBtn
                      className={cx('view-btn', { active: activeView === 'sprint-board' })}
                      onClick={() => setActiveView('sprint-board')}
                      leftIcon={<FontAwesomeIcon icon={faColumns} />}
                    >
                      Board
                    </Button>
                    <Button
                      noHover
                      actionBtn
                      className={cx('view-btn', { active: activeView === 'sprint-backlog' })}
                      onClick={() => setActiveView('sprint-backlog')}
                      leftIcon={<FontAwesomeIcon icon={faListCheck} />}
                    >
                      Backlog
                    </Button>
                    <Button
                      noHover
                      actionBtn
                      className={cx('view-btn', { active: activeView === 'leaderboard' })}
                      onClick={() => setActiveView('leaderboard')}
                      leftIcon={<FontAwesomeIcon icon={faTrophy} />}
                    >
                      leaderboard
                    </Button>
                    <Button
                      noHover
                      actionBtn
                      className={cx('view-btn', { active: activeView === 'group-chat' })}
                      onClick={() => setActiveView('group-chat')}
                      leftIcon={<FontAwesomeIcon icon={faComments} />}
                    >
                       Chat
                    </Button>
                  </div>
                </div>
                
                <div className={cx('header-actions')}>
                  <Button actionBtn leftIcon={ <FontAwesomeIcon icon={faPlus} />} 
                  onClick={openSprintModal}
                    sprintBtn
                  >
                      Sprint mới
                  </Button>
                  <Button actionBtn 
                  leftIcon={<FontAwesomeIcon icon={faPlus}/>} 
                  onClick={createNewTask} 
                  primary>
                      Task mới
                  </Button>
                </div>
              </div>;
}

export default MainHeader;