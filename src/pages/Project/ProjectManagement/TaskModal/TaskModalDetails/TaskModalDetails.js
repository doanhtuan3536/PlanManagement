import classNames from 'classnames/bind';
import styles from './TaskModalDetails.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft,
faTasks,
faTrash,
faPlus,
faCheck,
faTimes,
faComments,
faPaperPlane,
faInfoCircle,
faHistory,
faStop,
faPlay } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function TaskModalDetails({
    modalTaskData,
    sprints,
    toggleSubTaskCompletion,
    deleteSubTask,
    addSubTask,
    showAddSubtaskInput,
    setShowAddSubtaskInput,
    subtaskInput,
    setSubtaskInput,
    commentInput,
    setCommentInput,
    addComment,
    updateTaskStatus,
    updateTaskPriority,
    updateTaskSprint,
    updateTaskStoryPoints,
    updateTaskDates,
    formatDateTime,
    formatTime,
    toggleTimeTracker,
    currentTaskId,
    projectData,
    }) {
    if (!modalTaskData) return null;
        
        const currentSprint = sprints.find(s => s.id === modalTaskData.sprintId);
        
        return (
          <div className={cx('modal-grid')}>
            <div className={cx('task-details')}>
              <div className={cx('detail-section')}>
                <h3><FontAwesomeIcon icon={faAlignLeft} /> Mô tả</h3>
                <p id="modalDescription">{modalTaskData.description}</p>
              </div>
              
              <div className={cx('detail-section')}>
                <h3><FontAwesomeIcon icon={faTasks} /> Sub-tasks</h3>
                <div className={cx('sub-tasks')}>
                  {modalTaskData.subTasks.length > 0 ? (
                    modalTaskData.subTasks.map(subTask => (
                      <div key={subTask.id} className={cx('sub-task-item', { completed: subTask.completed })}>
                        <input 
                          type="checkbox" 
                          className={cx('sub-task-checkbox')}
                          checked={subTask.completed}
                          onChange={() => toggleSubTaskCompletion(subTask.id)}
                        />
                        <div className={cx('sub-task-text')}>{subTask.text}</div>
                        <div className={cx('sub-task-actions')}>
                          <button 
                            className={cx('sub-task-action-btn')}
                            onClick={() => deleteSubTask(subTask.id)}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-small)', textAlign: 'center', padding: '20px' }}>
                      Chưa có subtask nào
                    </div>
                  )}
                </div>
                <div 
                  className={cx('add-subtask')} 
                  onClick={() => setShowAddSubtaskInput(true)}
                >
                  <FontAwesomeIcon icon={faPlus} /> Thêm subtask
                </div>
                {showAddSubtaskInput && (
                  <div className={cx('add-subtask-input', 'active')}>
                    <input 
                      type="text" 
                      className={cx('subtask-input')}
                      value={subtaskInput}
                      onChange={(e) => setSubtaskInput(e.target.value)}
                      placeholder="Nhập subtask mới..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addSubTask();
                        }
                      }}
                    />
                    <button className={cx('action-btn', 'btn-primary')} onClick={addSubTask}>
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button 
                      className={cx('action-btn', 'btn-secondary')} 
                      onClick={() => {
                        setShowAddSubtaskInput(false);
                        setSubtaskInput("");
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                )}
              </div>
              
              <div className={cx('detail-section')}>
                <h3><FontAwesomeIcon icon={faComments} /> Bình luận</h3>
                <div className={cx('comment-section')}>
                  {modalTaskData.comments.length > 0 ? (
                    [...modalTaskData.comments].reverse().map((comment, index) => (
                      <div key={index} className={cx('comment')}>
                        <div className={cx('comment-header')}>
                          <div className={cx('comment-author')}>{comment.user}</div>
                          <div className={cx('comment-time')}>{formatDateTime(comment.time)}</div>
                        </div>
                        <div className={cx('comment-text')}>{comment.text}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-small)', textAlign: 'center', padding: '20px' }}>
                      Chưa có bình luận nào
                    </div>
                  )}
                </div>
                <div className={cx('comment-input')}>
                  <textarea 
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Thêm bình luận..." 
                    rows="3"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        addComment();
                      }
                    }}
                  />

                  <Button primary rounded style = {{marginTop: '10px'}}
                    leftIcon={<FontAwesomeIcon icon={faPaperPlane} />}
                    onClick={addComment}
                  >
                    Gửi
                  </Button>
                </div>
              </div>
            </div>
            
            <div className={cx('task-info')}>
              <div className={cx('detail-section')}>
                <h3><FontAwesomeIcon icon={faInfoCircle} /> Thông tin</h3>
                <div className={cx('info-grid')}>
                  <div className={cx('info-item')}>
                    <strong>Trạng thái:</strong>
                    <select 
                      className={cx('status-select')} 
                      value={modalTaskData.status}
                      onChange={(e) => updateTaskStatus(modalTaskData.id, e.target.value)}
                    >
                      <option value="todo">To Do</option>
                      <option value="progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="done">Done</option>
                    </select>
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Độ ưu tiên:</strong>
                    <select 
                      className={cx('priority-select')} 
                      value={modalTaskData.priority}
                      onChange={(e) => updateTaskPriority(modalTaskData.id, e.target.value)}
                    >
                      <option value="low">Thấp</option>
                      <option value="medium">Trung bình</option>
                      <option value="high">Cao</option>
                    </select>
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Sprint:</strong>
                    <select 
                      className={cx('sprint-select')} 
                      value={modalTaskData.sprintId || ""}
                      onChange={(e) => updateTaskSprint(modalTaskData.id, e.target.value ? parseInt(e.target.value) : null)}
                    >
                      <option value="">Chưa gán sprint</option>
                      {sprints.map(sprint => (
                        <option key={sprint.id} value={sprint.id}>{sprint.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Story Points:</strong>
                    <input 
                      type="number" 
                      className={cx('form-control')}
                      value={modalTaskData.storyPoints}
                      min="0"
                      style={{ width: '80px', padding: '4px 8px' }}
                      onChange={(e) => updateTaskStoryPoints(modalTaskData.id, e.target.value)}
                    />
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Người phụ trách:</strong>
                    <div className={cx('assigned-members')}>
                      {modalTaskData.assignees.length > 0 ? (
                        modalTaskData.assignees.map(userId => {
                          const user = projectData.members.find(m => m.id === userId);
                          return user ? (
                            <div key={userId} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '3px 8px', background: 'var(--background)', borderRadius: '4px', fontSize: 'var(--font-size-small)' }}>
                              <div className={cx('task-member')} style={{ width: '30px', height: '30px', fontSize: 'var(--font-size-super-small)' }}>
                                {user.initials}
                              </div>
                              <span>{user.name}</span>
                            </div>
                          ) : null;
                        })
                      ) : (
                        <span style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-small)' }}>Chưa gán</span>
                      )}
                    </div>
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Ngày bắt đầu:</strong>
                    <input 
                      type="date" 
                      className={cx('date-input')}
                      value={modalTaskData.startDate || ""}
                      onChange={(e) => updateTaskDates(modalTaskData.id, e.target.value, modalTaskData.dueDate)}
                    />
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Hạn chót:</strong>
                    <input 
                      type="date" 
                      className={cx('date-input')}
                      value={modalTaskData.dueDate || ""}
                      onChange={(e) => updateTaskDates(modalTaskData.id, modalTaskData.startDate, e.target.value)}
                    />
                  </div>
                  <div className={cx('info-item')}>
                    <strong>Thời gian đã làm:</strong>
                    <div id="modalTimeLogged">{formatTime(modalTaskData.timeLogged)}</div>
                  </div>
                </div>
              </div>
              
              <div className={cx('detail-section')}>
                <h3><FontAwesomeIcon icon={faHistory} /> Hoạt động</h3>
                <div className={cx('activity-log')}>
                  {modalTaskData.activities.length > 0 ? (
                    modalTaskData.activities.map((activity, index) => (
                      <div key={index} className={cx('activity-item')}>
                        <div><strong>{activity.user}</strong> {activity.action}</div>
                        {activity.details && (
                          <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-light)' }}>
                            {activity.details}
                          </div>
                        )}
                        <div className={cx('activity-time')}>{formatDateTime(activity.time)}</div>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-light)', fontSize: 'var(--font-size-small)', textAlign: 'center', padding: '10px' }}>
                      Chưa có hoạt động nào
                    </div>
                  )}
                </div>
              </div>
              
              <div className={cx('detail-section')}>
                <Button primary rounded 
                  leftIcon={<FontAwesomeIcon icon={currentTaskId === modalTaskData.id ? faStop : faPlay} />}
                  onClick={() => toggleTimeTracker(modalTaskData.id)}
                >
                    {currentTaskId === modalTaskData.id ? 'Dừng timer' : 'Bắt đầu timer'}
                </Button>
              </div>
            </div>
          </div>
        );
}

export default TaskModalDetails;