import classNames from 'classnames/bind';
import styles from './SprintBoard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faColumns,
faFlagCheckered,
faCheckCircle,
faBolt,
faClock,
faStar,
faCircle,
faSpinner,
faEye  } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function SprintBoard({tasks, currentSprintId, switchSprint, sprints, handleDragOver, handleDragLeave, handleDrop, renderTaskCard, completeSprint}) {
      const renderSprintBoard = () => {
      const columns = [
        { id: "todo", title: "To Do", icon: faCircle, color: "#4a6cf7" },
        { id: "progress", title: "In Progress", icon: faSpinner, color: "#f59e0b" },
        { id: "review", title: "Review", icon: faEye, color: "#8b5cf6" },
        { id: "done", title: "Done", icon: faCheckCircle, color: "#10b981" }
      ];
      
      return (
        <div className={cx('sprint-board')}>
          {columns.map(column => {
            const columnTasks = tasks.filter(task => 
              task.sprintId === currentSprintId && task.status === column.id
            );
            const totalStoryPoints = columnTasks.reduce((sum, task) => sum + (task.storyPoints || 0), 0);
            
            return (
              <div 
                key={column.id} 
                className={cx('sprint-column', `column-${column.id}`)}
                onDragOver={(e) => handleDragOver(e, column.id)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, column.id)}
              >
                <div className={cx('column-header')}>
                  <div className={cx('column-title')}>
                    <FontAwesomeIcon icon={column.icon} style={{ color: column.color }} />
                    <span>{column.title}</span>
                  </div>
                  <div className={cx('column-count')}>{columnTasks.length}</div>
                </div>
                <div 
                  className={cx('sprint-tasks-container')} 
                  data-status={column.id}
                >
                  {columnTasks.map(task => renderTaskCard(task))}
                </div>
                <div className={cx('column-footer')}>
                  <FontAwesomeIcon icon={faStar} /> {totalStoryPoints} story points
                </div>
              </div>
            );
          })}
        </div>
      );
    };
    return <div className={cx('sprint-management')}>
                  <div className={cx('sprint-header')}>
                    <h2><FontAwesomeIcon icon={faColumns} /> Sprint Board</h2>
                    <div className={cx('sprint-actions')}>
                      {/* <button className={cx('action-btn', 'btn-sprint')} onClick={completeSprint}>
                        <FontAwesomeIcon icon={faFlagCheckered} /> Hoàn thành Sprint
                      </button> */}
                      <Button sprintBtn actionBtn leftIcon={<FontAwesomeIcon icon={faFlagCheckered} />} onClick={completeSprint}>
                        Hoàn thành Sprint
                      </Button>
                    </div>
                  </div>
                  
                  <div className={cx('sprint-tabs')}>
                    {sprints.map(sprint => {
                      const sprintTasks = tasks.filter(t => t.sprintId === sprint.id);
                      const completedTasks = sprintTasks.filter(t => t.status === 'done').length;
                      
                      return (
                        <Button
                          noHover
                          sprintBtn
                          actionBtn
                          key={sprint.id}
                          className={cx('sprint-tab', { active: sprint.id === currentSprintId })}
                          onClick={() => switchSprint(sprint.id)}
                          leftIcon={
                              (sprint.status === 'completed' && (
                            <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--secondary)', marginRight: '5px' }} />
                          )) ||
                          (sprint.status === 'active' && (
                            <FontAwesomeIcon icon={faBolt} style={{ color: 'var(--warning)', marginRight: '5px' }} />
                          )) ||
                          (sprint.status === 'planned' && (
                            <FontAwesomeIcon icon={faClock} style={{ color: 'var(--text-light)', marginRight: '5px' }} />
                          ))
                          }
                        >
                          
                          {sprint.name}
                          <span style={{ marginLeft: '8px', color: 'var(--black-color)' ,fontSize: 'var(--font-size-small)', background: 'var(--background)', padding: '2px 6px', borderRadius: '10px' }}>
                            {completedTasks}/{sprintTasks.length}
                          </span>
                        </Button>
                      );
                    })}
                  </div>
                  
                  {renderSprintBoard()}
                </div>;
}

export default SprintBoard;