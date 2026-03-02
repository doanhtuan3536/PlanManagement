import classNames from 'classnames/bind';
import styles from './BackLog.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck,
faPlus, 
faCheckCircle,
faStar,
faClock,
faUser  } from '@fortawesome/free-solid-svg-icons';
import { formatDateTime } from '~/utils';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function BackLog({tasks, addBacklogTask, projectData, openTaskModal, assignToSprint}) {
  const renderBacklogTasks = () => {
      const unassignedTasks = tasks.filter(t => !t.sprintId);
      
      if (unassignedTasks.length === 0) {
        return (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
            <FontAwesomeIcon icon={faCheckCircle} style={{ fontSize: '3rem', marginBottom: '15px' }} />
            <h3>Backlog trống!</h3>
            <p>Tất cả tasks đã được gán vào sprint.</p>
          </div>
        );
      }
      
      return unassignedTasks.map(task => {
        const assigneeNames = task.assignees.map(id => {
          const user = projectData.members.find(m => m.id === id);
          return user ? user.name : '';
        }).filter(name => name).join(', ');
        
        return (
          <div 
            key={task.id} 
            className={cx('backlog-task')}
            onClick={() => openTaskModal(task.id)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div>
                <div style={{ fontWeight: '600' }}>{task.id}: {task.title}</div>
                <div style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-small)', lineHeight: '2.5rem' }}>
                  {task.description.substring(0, 100)}...
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '5px', fontSize: 'var(--font-size-small)' }}>
                  <span className={cx('priority-badge', `priority-${task.priority}`)}>
                    {task.priority === 'high' ? 'Cao' : task.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                  </span>
                  <span><FontAwesomeIcon icon={faStar} /> {task.storyPoints || 0} points</span>
                  <span><FontAwesomeIcon icon={faClock} /> {task.estimate}</span>
                  {assigneeNames && <span><FontAwesomeIcon icon={faUser} /> {assigneeNames}</span>}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Button 
                leftIcon={<FontAwesomeIcon icon={faPlus} />} primary actionBtn
                onClick={(e) => {
                  e.stopPropagation();
                  assignToSprint(task.id);
                }}
              >
                 Gán sprint
              </Button>
            </div>
          </div>
        );
      });
    };
    return <div className={cx('backlog-container')}>
              <div className={cx('backlog-header')}>
                <h2><FontAwesomeIcon icon={faListCheck} /> Product Backlog</h2>
                <div className={cx('backlog-actions')}>
                  <Button leftIcon={<FontAwesomeIcon icon={faPlus} />} onClick={addBacklogTask} primary actionBtn>
                     Thêm task
                  </Button>
                </div>
              </div>
              
              <div className={cx('backlog-tasks')}>
                {renderBacklogTasks()}
              </div>
            </div>;
}

export default BackLog;