import classNames from 'classnames/bind';
import styles from './SprintModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,
faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SprintModal({ closeSprintModal, sprintForm ,setSprintForm, createSprint, projectData }) {
    return <div className={cx('modal-overlay', 'active')} onClick={closeSprintModal}>
              <div className={cx('sprint-modal')} onClick={(e) => e.stopPropagation()}>
                <div className={cx('modal-header')}>
                  <h2><FontAwesomeIcon icon={faPlus} /> Tạo Sprint mới</h2>
                  <button className={cx('action-btn', 'btn-secondary')} onClick={closeSprintModal}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className={cx('modal-form')}>
                  <div className={cx('form-row')}>
                    <div className={cx('form-group')}>
                      <label htmlFor="sprintName">Tên Sprint *</label>
                      <input 
                        type="text" 
                        id="sprintName"
                        value={sprintForm.name}
                        onChange={(e) => setSprintForm({...sprintForm, name: e.target.value})}
                        placeholder="Ví dụ: Sprint 4: Final Testing" 
                        required
                      />
                    </div>
                    <div className={cx('form-group')}>
                      <label htmlFor="sprintGoal">Mục tiêu Sprint</label>
                      <input 
                        type="text" 
                        id="sprintGoal"
                        value={sprintForm.goal}
                        onChange={(e) => setSprintForm({...sprintForm, goal: e.target.value})}
                        placeholder="Ví dụ: Hoàn thành testing và deploy"
                      />
                    </div>
                  </div>
                  
                  <div className={cx('form-row')}>
                    <div className={cx('form-group')}>
                      <label htmlFor="sprintStartDate">Ngày bắt đầu *</label>
                      <input 
                        type="date" 
                        id="sprintStartDate"
                        value={sprintForm.startDate}
                        onChange={(e) => setSprintForm({...sprintForm, startDate: e.target.value})}
                        required
                      />
                    </div>
                    <div className={cx('form-group')}>
                      <label htmlFor="sprintEndDate">Ngày kết thúc *</label>
                      <input 
                        type="date" 
                        id="sprintEndDate"
                        value={sprintForm.endDate}
                        onChange={(e) => setSprintForm({...sprintForm, endDate: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className={cx('form-row')}>
                    <div className={cx('form-group')}>
                      <label htmlFor="sprintCapacity">Capacity (giờ)</label>
                      <input 
                        type="number" 
                        id="sprintCapacity"
                        value={sprintForm.capacity}
                        onChange={(e) => setSprintForm({...sprintForm, capacity: parseInt(e.target.value) || 160})}
                        placeholder="Ví dụ: 160" 
                        min="0"
                      />
                    </div>
                    <div className={cx('form-group')}>
                      <label htmlFor="sprintTargetPoints">Target Points</label>
                      <input 
                        type="number" 
                        id="sprintTargetPoints"
                        value={sprintForm.targetPoints}
                        onChange={(e) => setSprintForm({...sprintForm, targetPoints: parseInt(e.target.value) || 40})}
                        placeholder="Ví dụ: 40" 
                        min="0"
                      />
                    </div>
                  </div>
                  
                  <div className={cx('form-group')}>
                    <label htmlFor="sprintTeam">Thành viên tham gia</label>
                    <select 
                      id="sprintTeam" 
                      multiple 
                      style={{ height: '120px' }}
                      value={sprintForm.team}
                      onChange={(e) => {
                        const selectedOptions = Array.from(e.target.selectedOptions).map(option => parseInt(option.value));
                        setSprintForm({...sprintForm, team: selectedOptions});
                      }}
                    >
                      {projectData.members.map(member => (
                        <option key={member.id} value={member.id}>
                          {member.name} ({member.role})
                        </option>
                      ))}
                    </select>
                    <small style={{ color: 'var(--text-light)' }}>Giữ Ctrl/Cmd để chọn nhiều thành viên</small>
                  </div>
                  
                  <div className={cx('form-group')}>
                    <label htmlFor="sprintDescription">Mô tả chi tiết</label>
                    <textarea 
                      id="sprintDescription"
                      value={sprintForm.description}
                      onChange={(e) => setSprintForm({...sprintForm, description: e.target.value})}
                      placeholder="Mô tả chi tiết về sprint, các công việc chính, yêu cầu đặc biệt..."
                    />
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '15px', marginTop: '30px' }}>
                    <button className={cx('action-btn', 'btn-secondary')} onClick={closeSprintModal}>
                      Hủy
                    </button>
                    <button className={cx('action-btn', 'btn-sprint')} onClick={createSprint}>
                      <FontAwesomeIcon icon={faPlus} /> Tạo Sprint
                    </button>
                  </div>
                </div>
              </div>
            </div>;
}

export default SprintModal;