import classNames from 'classnames/bind';
import {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faCogs, faUsers, faTasks, faArrowLeft, faListCheck, faDiagramProject, faTimes, faPlusCircle, 
    faGripVertical, faUserPlus, faPlus, faCalendarAlt, faClock, faEdit, faTrash, 
    faXmark} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button'

import styles from './Create.module.scss';

const cx = classNames.bind(styles);
let i = 5;

const typeProject = [
    {
        id: 1,
        name: 'TodoList',
        description: 'Create simple personal task lists',
        icon: <FontAwesomeIcon icon = {faListCheck} />,
        dataType: 'todolist'
    },
    {
        id: 2,
        name: 'Project Management',
        description: 'Manage projects with teams, tasks, and workflows',
        icon: <FontAwesomeIcon icon = {faDiagramProject} />,
        dataType: 'project'
    }
]

function Create(){
    const [activeTab, setActiveTab] = useState('basic');
    //input basic form
    const [projectInfo, setprojectInfo] = useState(() =>{
        const start = new Date();
        const end = new Date();
        end.setDate(end.getDate() + 2);
        return {
        projectName: '',
        projectType: 1,
        startDate: start.toISOString().split("T")[0],
        endDate: end.toISOString().split("T")[0],
        description: '',
        priority: 'high',
        visibilityMode: 'private'
    }});



    
    function handleChangeprojectInfo(field, newValue){
        setprojectInfo({
            ...projectInfo,
            [field]: newValue
        })
    }
    
    // Danh sách thành viên mẫu
    const [members, setMembers] = useState([
        { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com', role: 'admin' },
        { id: 2, name: 'Trần Thị B', email: 'b@example.com', role: 'member' },
        { id: 3, name: 'Lê Văn C', email: 'c@example.com', role: 'view' },
        { id: 4, name: 'Phạm Thị D', email: 'd@example.com', role: 'member'}
    ]);
    
    const [inputAddMember, setInputAddMember] = useState({
        email: '',
        role: 'member'
    });

    function handleAddMember(){
        if(!inputAddMember.email || !inputAddMember.role){
                return
            }
        setMembers((preState) => {
            
            if(members.some((member, index) => {
                return member.email === inputAddMember.email;
            })){
                return [
                    ...members
                ]
            }
            return [
            ...members,
            {
                id: i++,
                name: inputAddMember.email.split("@")[0] ,
                email: inputAddMember.email,
                role: inputAddMember.role
            }
        ]})
    }

    function handleRemoveMember(id){
        setMembers(members.filter((mem, ind) => mem.id !== id))
    }
    
    const [tasks, setTasks] = useState([
        { 
            id: 1, 
            name: 'Nghiên cứu yêu cầu dự án', 
            status: 'todo',
            assignees: [1],
            priority: 'medium',
            deadline: '',
            description: '',
            estimatedHours: 8,
            tags: ['research', 'planning'],
            startDate: '',
            dependencies: []
        }
    ]);
    
    const [showTaskDetail, setShowTaskDetail] = useState(null);
    const [newTaskCounter, setNewTaskCounter] = useState(2);

    function handleAddTask() {
        const newTask = {
            id: newTaskCounter,
            name: "New task",
            status: 'todo',
            assignees: [],
            priority: 'medium',
            deadline: '',
            description: '',
            estimatedHours: 0,
            tags: [],
            startDate: '',
            dependencies: []
        };
        
        setTasks([...tasks, newTask]);
        setNewTaskCounter(newTaskCounter + 1);
        setShowTaskDetail(newTaskCounter); // Mở form chi tiết cho task mới
    };

    function handleDeleteTask(taskId) {
        setTasks(tasks.filter(task => task.id !== taskId));
        if (showTaskDetail === taskId) {
            setShowTaskDetail(null);
        }
    }

    function handleChangeTaskField(taskId, field, value) {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, [field]: value };
            }
            return task;
        }));
    }

    function handleToggleAssignee(taskId, memberId) {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const currentAssignees = [...task.assignees];
                const index = currentAssignees.indexOf(memberId);
                
                if (index > -1) {
                    currentAssignees.splice(index, 1);
                } else {
                    currentAssignees.push(memberId);
                }
                
                return { ...task, assignees: currentAssignees };
            }
            return task;
        }));
    }

    function handleAddTag(taskId, tag) {
        if (!tag.trim()) return;
        
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newTags = [...task.tags, tag.trim()];
                return { ...task, tags: newTags };
            }
            return task;
        }));
    }

    function handleRemoveTag(taskId, tagIndex) {
        setTasks(tasks.map(task => {
            if (task.id === taskId) {
                const newTags = [...task.tags];
                newTags.splice(tagIndex, 1);
                return { ...task, tags: newTags };
            }
            return task;
        }));
    }

    // Render detail form cho task
    function renderTaskDetail(task) {
        if (!task || !showTaskDetail || showTaskDetail !== task.id) return null;

        return (
            <div className={cx("task-detail-overlay")} onClick={() => setShowTaskDetail(null)}>
                <div className={cx("task-detail-modal")} onClick={e => e.stopPropagation()}>
                    <div className={cx("task-detail-header")}>
                        <h3>Task Details</h3>
                        <button 
                            className={cx("close-btn")} 
                            onClick={() => setShowTaskDetail(null)}
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    
                    <div className={cx("task-detail-content")}>
                        <div className={cx("form-grid")}>
                            {/* Task Name */}
                            <div className={cx("form-group", "full-width")}>
                                <label>Task Name</label>
                                <input 
                                    type="text" 
                                    value={task.name}
                                    onChange={(e) => handleChangeTaskField(task.id, 'name', e.target.value)}
                                    placeholder="Enter task name"
                                />
                            </div>
                            
                            {/* Description */}
                            <div className={cx("form-group", "full-width")}>
                                <label>Description</label>
                                <textarea 
                                    value={task.description}
                                    onChange={(e) => handleChangeTaskField(task.id, 'description', e.target.value)}
                                    placeholder="Describe the task..."
                                    rows="3"
                                />
                            </div>
                            
                            {/* Assignees */}
                            <div className={cx("form-group")}>
                                <label>Assignees</label>
                                <div className={cx("assignee-list")}>
                                    {members.map(member => (
                                        <div 
                                            key={member.id} 
                                            className={cx("assignee-checkbox")}
                                            onClick={() => handleToggleAssignee(task.id, member.id)}
                                        >
                                            <input 
                                                type="checkbox"
                                                checked={task.assignees.includes(member.id)}
                                                readOnly
                                            />
                                            <span className={cx("assignee-name")}>
                                                {member.name} ({member.email})
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Priority and Status */}
                            <div className={cx("form-group")}>
                                <label>Priority</label>
                                <select 
                                    value={task.priority}
                                    onChange={(e) => handleChangeTaskField(task.id, 'priority', e.target.value)}
                                >
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            
                            <div className={cx("form-group")}>
                                <label>Status</label>
                                <select 
                                    value={task.status}
                                    onChange={(e) => handleChangeTaskField(task.id, 'status', e.target.value)}
                                >
                                    <option value="todo">To Do</option>
                                    <option value="doing">Doing</option>
                                    <option value="review">Review</option>
                                    <option value="done">Done</option>
                                </select>
                            </div>
                            
                            {/* Dates */}
                            <div className={cx("form-group")}>
                                <label>Start Date</label>
                                <input 
                                    type="date" 
                                    value={task.startDate}
                                    onChange={(e) => handleChangeTaskField(task.id, 'startDate', e.target.value)}
                                />
                            </div>
                            
                            <div className={cx("form-group")}>
                                <label>Deadline</label>
                                <input 
                                    type="date" 
                                    value={task.deadline}
                                    onChange={(e) => handleChangeTaskField(task.id, 'deadline', e.target.value)}
                                />
                            </div>
                            
                            {/* Estimated Hours */}
                            <div className={cx("form-group")}>
                                <label>Estimated Hours</label>
                                <input 
                                    type="number" 
                                    min="0"
                                    step="0.5"
                                    value={task.estimatedHours}
                                    onChange={(e) => handleChangeTaskField(task.id, 'estimatedHours', parseFloat(e.target.value) || 0)}
                                />
                            </div>
                            
                            {/* Tags */}
                            <div className={cx("form-group", "full-width")}>
                                <label>Tags</label>
                                <div className={cx("tags-input")}>
                                    <div className={cx("tags-container")}>
                                        {task.tags.map((tag, index) => (
                                            <span key={index} className={cx("tag")}>
                                                {tag}
                                                <button 
                                                    className={cx("tag-remove")}
                                                    onClick={() => handleRemoveTag(task.id, index)}
                                                >
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                    <input 
                                        type="text"
                                        placeholder="Add tag (press Enter)"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddTag(task.id, e.target.value);
                                                e.target.value = '';
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className={cx("task-detail-actions")}>
                        <button 
                            className={cx("btn", "btn-secondary")}
                            onClick={() => setShowTaskDetail(null)}
                        >
                            Close
                        </button>
                        <button 
                            className={cx("btn", "btn-danger")}
                            onClick={() => handleDeleteTask(task.id)}
                        >
                            <FontAwesomeIcon icon={faTrash} /> Delete Task
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={cx("container")}>
             <div className={cx("page-header")}>
                 <div className={cx("page-title")}>
                     <Button primary leftIcon = {<FontAwesomeIcon icon = {faArrowLeft} />}>
                        Back
                     </Button>
                     <h1>Create New Project</h1>
                 </div>

             </div>

             {/* <!-- Form Container --> */}
             <div className={cx("form-container")}>
                 {/* <!-- Form Tabs --> */}
                 <div className={cx("form-tabs")}>

                     {[
                         { id: 'basic', icon: faInfoCircle, label: 'Basic Information' },
                         { id: 'details', icon: faCogs, label: 'Project Details' },
                         { id: 'members', icon: faUsers, label: 'Members' },
                         { id: 'tasks', icon: faTasks, label: 'Tasks' }
                     ].map(tab => (
                         <button
                         key={tab.id}
                         className={`${cx('tab-btn')} ${activeTab === tab.id ? cx('active') : ''} ${projectInfo.projectType === 1 & tab.id !== 'basic' ? cx('disabled') : ''}`}
                         onClick={() => setActiveTab(projectInfo.projectType !== 1 ? tab.id : activeTab)}
                         disabled={projectInfo.projectType === 1 && tab.id !== 'basic'}
                         >
                         <FontAwesomeIcon icon = {tab.icon} /> {tab.label}
                         </button>
                     ))}
                 </div>

                 {/* <!-- Form Content --> */}
                 <div className={cx("form-content")}>
                     {/* <!-- Basic Information Tab --> */}
                     {activeTab === "basic" &&
                        <div className={cx("form-section", "active")} id="basic-tab">
                            <h2 className={cx("section-title")}>
                                <FontAwesomeIcon icon = {faInfoCircle} /> Basic Information
                            </h2>
                            
                            <div className={cx("form-grid")}>
                                <div className={cx("form-group", "full-width")}>
                                    <label htmlFor="projectName" className={cx("required")}>Project Name</label>
                                    <input type="text" id="projectName" 
                                    placeholder="Enter your project name" 
                                    required value={projectInfo.projectName} 
                                    onChange={(e) => handleChangeprojectInfo('projectName', e.target.value)} />
                                </div>
                                
                                <div className={cx("form-group")}>
                                    <label htmlFor="projectType" className={cx("required")}>Project Type</label>
                                    <div className={cx("project-type-cards")}>
                                        {
                                            typeProject.map((type, index) => {
                                                return <div key={type.id} 
                                                className={cx("type-card", projectInfo.projectType === type.id ? "active": '')} 
                                                data-type={type.dataType}
                                                onClick={() => handleChangeprojectInfo('projectType', type.id)}>
                                                            <div className = {cx("type-card__header")}>
                                                                {type.icon}
                                                                <h3>{type.name}</h3>
                                                            </div>
                                                            <p>{type.description}</p>
                                                        </div>
                                            })
                                        }
                                    </div>
                                </div>
                                
                                <div className={cx("form-group")}>
                                    <label htmlFor="startDate" className={cx("required")}>Start Date</label>
                                    <input type="date" id="startDate" required value={projectInfo.startDate} onChange={(e) => handleChangeprojectInfo('startDate', e.target.value)} />
                                </div>
                                
                                <div className={cx("form-group")}>
                                    <label htmlFor="endDate">End Date (Expected)</label>
                                    <input type="date" id="endDate" value={projectInfo.endDate} onChange={(e) => handleChangeprojectInfo('endDate', e.target.value)} />
                                </div>
                                
                                <div className={cx("form-group", "full-width")}>
                                    <label htmlFor="description">Project Description</label>
                                    <textarea id="description" 
                                    placeholder="Describe project goals and scope in detail..." 
                                    value={projectInfo.description} 
                                    onChange={(e) =>  handleChangeprojectInfo('description', e.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                    }


                    {/* <!-- Project Details Tab --> */}
                    {activeTab === "details" &&
                    <div className={cx("form-section" , "active")} id="details-tab">
                        <h2 className={cx("section-title")}>
                            <FontAwesomeIcon icon={faCogs} />
                            Project Configuration
                        </h2>
                        
                        <div className={cx("form-grid")}>
                            <div className={cx("form-group")}>
                                <label htmlFor="priority">Priority</label>
                                <select id="priority"  value={projectInfo.priority} onChange={(e) => handleChangeprojectInfo('priority', e.target.value)}>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                            </div>
                            
                            <div className={cx("form-group")}>
                                <label htmlFor="visibility">Visibility Mode</label>
                                <select id="visibility" value={projectInfo.visibilityMode} onChange={(e) => handleChangeprojectInfo('visibilityMode', e.target.value)}>
                                    <option value="private">Private (Only Me)</option>
                                    <option value="team">Team (Members)</option>
                                    <option value="public">Public (Everyone)</option>
                                </select>
                            </div>
                            
                            <div className={cx("form-group", "full-width")} id="workflow-section">
                                <label>Workflow</label>
                                <div className={cx("workflow-steps")}>
                                    <div className={cx("workflow-step")}>
                                        <div className={cx("step-number")}>1</div>
                                        <div className={cx("step-content")}>
                                            <h4>Backlog / To Do</h4>
                                            <p>Tasks that are not yet planned</p>
                                        </div>
                                    </div>
                                    <div className={cx("workflow-step")}>
                                        <div className={cx("step-number")}>2</div>
                                        <div className={cx("step-content")}>
                                            <h4>In Progress</h4>
                                            <p>Tasks currently being worked on</p>
                                        </div>
                                    </div>
                                    <div className={cx("workflow-step")}>
                                        <div className={cx("step-number")}>3</div>
                                        <div className={cx("step-content")}>
                                            <h4>Review</h4>
                                            <p>Completed tasks waiting for review</p>
                                        </div>
                                    </div>
                                    <div className={cx("workflow-step")}>
                                        <div className={cx("step-number")}>4</div>
                                        <div className={cx("step-content")}>
                                            <h4>Completed</h4>
                                            <p>Tasks that are fully finished</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {/* <!-- Members Tab --> */}
                    {activeTab === "members" &&
                    <div className={cx("form-section" , "active")} id="members-tab">
                        <h2 className={cx("section-title")}>
                            <FontAwesomeIcon icon={faUsers} />
                            Add Members
                        </h2>
                        
                        <div className={cx("form-group", "full-width")}>
                            <label>Project Members</label>
                            <div className={cx("members-container")}>
                                
                                <div className={cx("member-input-group")}>
                                    <input type="email" className={cx("member-input")} id="memberEmail" placeholder="Enter member email" 
                                    value={inputAddMember.email} 
                                    onChange={(e) => setInputAddMember({
                                        ...inputAddMember,
                                        email: e.target.value
                                    })} />
                                    <select id="memberRole" value={inputAddMember.role} 
                                    onChange={(e) => setInputAddMember({
                                        ...inputAddMember,
                                        role: e.target.value
                                    })}>
                                        <option value="member">Member</option>
                                        <option value="admin">Administrator</option>
                                        <option value="viewer">Viewer</option>
                                    </select>
                                    <Button className={cx("add-member-btn")} id="addMemberBtn" onClick={handleAddMember}>
                                        <FontAwesomeIcon icon={faUserPlus} /> Add
                                    </Button>
                                </div>
                                
                                <div className={cx("members-list")} id="membersList">
                                    {
                                        members.map((member, index) => {
                                            return <div key={member.id} className={cx("member-tag")}>
                                                        <span>{`${member.email} (${member.name} - ${member.role})`}</span>
                                                        <FontAwesomeIcon className={cx('member-tag__xmark')} icon={faXmark} onClick={() => handleRemoveMember(member.id)} />
                                                    </div>
                                        } )
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    

                {/* Tasks Tab */}
                {activeTab === "tasks" &&
                    <div className={cx("form-section", "active")} id="tasks-tab">
                        <h2 className={cx("section-title")}>
                            <FontAwesomeIcon icon={faTasks} /> Create Initial Tasks
                        </h2>
                        
                        <div className={cx("tasks-summary")}>
                            <div className={cx("summary-item")}>
                                <span className={cx("summary-count")}>{tasks.length}</span>
                                <span className={cx("summary-label")}>Total Tasks</span>
                            </div>
                            <div className={cx("summary-item")}>
                                <span className={cx("summary-count")}>
                                    {tasks.filter(t => t.assignees.length > 0).length}
                                </span>
                                <span className={cx("summary-label")}>Assigned Tasks</span>
                            </div>
                            <div className={cx("summary-item")}>
                                <span className={cx("summary-count")}>
                                    {tasks.reduce((total, task) => total + task.estimatedHours, 0)}
                                </span>
                                <span className={cx("summary-label")}>Total Hours</span>
                            </div>
                        </div>
                        
                        <div className={cx("form-group", "full-width")}>
                            <label>Task List</label>
                            <div className={cx("tasks-container")}>
                                {tasks.map((task) => (
                                    <div className={cx("task-item")} key={task.id}>
                                        <div className={cx("task-main")}>
                                            <div className={cx("task-info")}>
                                                <FontAwesomeIcon className={cx("task-drag")} icon={faGripVertical} />
                                                <div className={cx("task-name-container")}>
                                                    <input 
                                                        type="text"
                                                        value={task.name}
                                                        onChange={(e) => handleChangeTaskField(task.id, 'name', e.target.value)}
                                                        placeholder="Task name"
                                                        className={cx("task-name-input")}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className={cx("task-meta")}>
                                                <span className={`${cx("priority-badge")} ${cx(task.priority)}`}>
                                                    {task.priority}
                                                </span>
                                                {task.deadline && (
                                                    <span className={cx("deadline-badge")}>
                                                        <FontAwesomeIcon icon={faCalendarAlt} /> 
                                                        {new Date(task.deadline).toLocaleDateString()}
                                                    </span>
                                                )}
                                                {task.estimatedHours > 0 && (
                                                    <span className={cx("hours-badge")}>
                                                        <FontAwesomeIcon icon={faClock} /> 
                                                        {task.estimatedHours}h
                                                    </span>
                                                )}
                                                {task.assignees.length > 0 && (
                                                        <div className={cx("task-assignee-badges")}>
                                                            {task.assignees.slice(0, 2).map(assigneeId => {
                                                                const member = members.find(m => m.id === assigneeId);
                                                                return member ? (
                                                                    <span key={assigneeId} className={cx("assignee-badge")}>
                                                                        {member.name.charAt(0)}
                                                                    </span>
                                                                ) : null;
                                                            })}
                                                            {task.assignees.length > 2 && (
                                                                <span className={cx("assignee-badge", "more")}>
                                                                    +{task.assignees.length - 2}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                            </div>

                                        </div>
                                        
                                        <div className={cx("task-actions")}>
                                            <select 
                                                value={task.status}
                                                onChange={(e) => handleChangeTaskField(task.id, 'status', e.target.value)}
                                                className={cx("status-select")}
                                            >
                                                <option value="todo">To Do</option>
                                                <option value="doing">Doing</option>
                                                <option value="review">Review</option>
                                                <option value="done">Done</option>
                                            </select>
                                            <button 
                                                className={cx("task-action-btn", "detail-btn")}
                                                onClick={() => setShowTaskDetail(task.id)}
                                                title="View/Edit Details"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button 
                                                className={cx("task-action-btn", "delete-btn")}
                                                onClick={() => handleDeleteTask(task.id)}
                                                title="Delete"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <button className={cx("add-task-btn")} onClick={handleAddTask}>
                                <FontAwesomeIcon icon={faPlus} /> Add New Task
                            </button>
                        </div>
                        
                        {/* Render task detail modal */}
                        {showTaskDetail && (() => {
                            const task = tasks.find(t => t.id === showTaskDetail);
                            return task ? renderTaskDetail(task) : null;
                        })()}
                    </div>
                
            }
            </div>
        </div>
        {/* <!-- Form Actions --> */}
            <div className={cx("form-actions")}>
                <Button className={cx("btn", "btn-cancel")} id="cancelBtn" leftIcon = {<FontAwesomeIcon icon = {faTimes} />}>
                     Cancel
                </Button>
                <Button className={cx("btn", "btn-create")} id="createBtn" leftIcon = {<FontAwesomeIcon icon = {faPlusCircle} />}>
                     Create Project
                </Button>
            </div>
        </div>
    );
}

export default Create;