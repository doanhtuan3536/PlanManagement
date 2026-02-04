import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ProjectManagement.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCodeBranch,
  faCalendar,
  faUserFriends,
  faFlag,
  faColumns,
  faTrophy,
  faComments,
  faTerminal,
  faPlus,
  faMoon,
  faSun,
  faTasks,
  faClock,
  faAward,
  faCheckCircle,
  faPlay,
  faStop,
  faPause,
  faTimes,
  faEllipsisH,
  faFlag as faFlagIcon,
  faCheck,
  faPaperPlane,
  faAlignLeft,
  faInfoCircle,
  faHistory,
  faSearch,
  faBell,
  faThumbtack,
  faPaperclip,
  faImage,
  faSmile,
  faReply,
  faRobot,
  faCircle,
  faSpinner,
  faEye,
  faCheckCircle as faCheckCircleSolid,
  faCrown,
  faAward as faAwardSolid,
  faMedal
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

// Initial Data
const initialProjectData = {
  name: "Website Redesign",
  progress: 68,
  members: [
    { id: 1, name: "Nguyễn Văn A", initials: "NA", online: true, points: 450, role: "Designer" },
    { id: 2, name: "Trần Thị B", initials: "TB", online: true, points: 380, role: "Frontend" },
    { id: 3, name: "Lê Văn C", initials: "LC", online: false, points: 320, role: "Backend" },
    { id: 4, name: "Phạm Thị D", initials: "PD", online: true, points: 295, role: "Frontend" },
    { id: 5, name: "Hoàng Văn E", initials: "HE", online: true, points: 410, role: "Team Lead" },
    { id: 6, name: "Mai Thị F", initials: "MF", online: false, points: 280, role: "Tester" },
  ]
};

const initialTasks = [
  {
    id: "TASK-001",
    title: "Design homepage wireframe",
    description: "Create wireframe for homepage with all main components",
    status: "todo",
    priority: "high",
    assignees: [1, 2],
    tags: ["design", "feature"],
    startDate: "2024-04-15",
    dueDate: "2024-04-20",
    estimate: "8h",
    timeLogged: 240,
    subTasks: [
      { id: 1, text: "Wireframe header", completed: true },
      { id: 2, text: "Wireframe hero section", completed: true },
      { id: 3, text: "Wireframe footer", completed: false }
    ],
    badge: "gold",
    comments: [
      { user: "NA", text: "Reviewed design, need header modifications", time: "2 hours ago" },
      { user: "TB", text: "In progress", time: "1 day ago" }
    ],
    activities: [
      { action: "created", user: "NA", time: "3 days ago" },
      { action: "assigned", user: "TB", time: "2 days ago" }
    ]
  },
  {
    id: "TASK-002",
    title: "Develop API authentication",
    description: "Build login/registration system with JWT",
    status: "progress",
    priority: "high",
    assignees: [3],
    tags: ["backend", "security"],
    startDate: "2024-04-10",
    dueDate: "2024-04-18",
    estimate: "12h",
    timeLogged: 480,
    subTasks: [
      { id: 1, text: "Setup JWT", completed: true },
      { id: 2, text: "Login endpoint", completed: true },
      { id: 3, text: "Register endpoint", completed: false },
      { id: 4, text: "Email verification", completed: false }
    ],
    badge: null,
    comments: [],
    activities: []
  },
  {
    id: "TASK-003",
    title: "Fix mobile responsive bugs",
    description: "Fix display issues on iPhone and mobile devices",
    status: "review",
    priority: "medium",
    assignees: [2, 4],
    tags: ["bug", "frontend"],
    startDate: "2024-04-12",
    dueDate: "2024-04-15",
    estimate: "4h",
    timeLogged: 180,
    subTasks: [],
    badge: "silver",
    comments: [],
    activities: []
  }
];

const initialChatMessages = [
  { 
    id: 1,
    user: "NA", 
    text: "Hello everyone! Wireframe task almost done, can someone review it?", 
    time: "10:30",
    reactions: { "👍": 2, "👏": 1 },
    mentions: ["TB", "HE"],
    pinned: true
  },
  { 
    id: 2,
    user: "TB", 
    text: "Great! I'm working on API authentication, expected to finish today", 
    time: "10:45",
    reactions: { "🔥": 1 },
    taskMention: "TASK-002"
  },
  { 
    id: 3,
    user: "PD", 
    text: "Can someone review mobile responsive bugs? #TASK-003", 
    time: "11:20",
    reactions: {},
    taskMention: "TASK-003"
  }
];

const columns = [
  { id: "todo", title: "To Do", icon: faCircle, color: "#4a6cf7", count: 2 },
  { id: "progress", title: "In Progress", icon: faSpinner, color: "#f59e0b", count: 2 },
  { id: "review", title: "Review", icon: faEye, color: "#8b5cf6", count: 1 },
  { id: "done", title: "Done", icon: faCheckCircleSolid, color: "#10b981", count: 1 }
];

function ProjectManagement() {
  // State Management
  const [projectData, setProjectData] = useState(initialProjectData);
  const [tasks, setTasks] = useState(initialTasks);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);
  const [darkMode, setDarkMode] = useState(false);
  const [currentView, setCurrentView] = useState('kanban');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [showingSubtaskInput, setShowingSubtaskInput] = useState({});
  const [newChatMessage, setNewChatMessage] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [chatInput, setChatInput] = useState('');
  
  // Refs
  const chatMessagesContainerRef = useRef(null);
  
  // Helper Functions
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.innerHTML = `
      <div style="position: fixed; top: 20px; right: 20px; background: #4a6cf7; color: white; padding: 15px 25px; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.2); z-index: 10000;">
        ${message}
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  // Task Functions
  const toggleSubTask = (taskId, subTaskId) => {
    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId && task.subTasks) {
          const updatedSubTasks = task.subTasks.map(subTask => {
            if (subTask.id === subTaskId) {
              const completed = !subTask.completed;
              
              if (completed) {
                setProjectData(prevData => ({
                  ...prevData,
                  members: prevData.members.map(member => 
                    member.id === 1 ? { ...member, points: member.points + 10 } : member
                  )
                }));
                showNotification("🎉 +10 points for completing subtask!");
              }
              
              return { ...subTask, completed };
            }
            return subTask;
          });
          
          return { ...task, subTasks: updatedSubTasks };
        }
        return task;
      })
    );
  };

  const addQuickSubtask = (taskId, text) => {
    if (!text.trim()) {
      showNotification("❌ Please enter subtask content");
      return;
    }

    setTasks(prevTasks => 
      prevTasks.map(task => {
        if (task.id === taskId) {
          const newSubTask = {
            id: task.subTasks.length > 0 ? Math.max(...task.subTasks.map(st => st.id)) + 1 : 1,
            text: text.trim(),
            completed: false
          };
          
          setShowingSubtaskInput(prev => ({ ...prev, [taskId]: false }));
          
          return {
            ...task,
            subTasks: [...task.subTasks, newSubTask]
          };
        }
        return task;
      })
    );
    
    showNotification("✅ Added new subtask!");
  };

  const openTaskModal = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setShowTaskModal(true);
    }
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
    showNotification(`✅ Task moved to ${newStatus}`);
  };

  const createNewTask = () => {
    const newTask = {
      id: `TASK-${String(tasks.length + 1).padStart(3, '0')}`,
      title: "New task",
      description: "Task description...",
      status: "todo",
      priority: "medium",
      assignees: [1],
      tags: ["feature"],
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimate: "4h",
      timeLogged: 0,
      subTasks: [],
      comments: [],
      activities: [{ action: "created", user: "You", time: "Just now" }]
    };
    
    setTasks(prevTasks => [...prevTasks, newTask]);
    setSelectedTask(newTask);
    setShowTaskModal(true);
    showNotification("✅ Created new task!");
  };

  // Chat Functions
  const sendMessage = () => {
    if (!newChatMessage.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      user: "You",
      text: newChatMessage.trim(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      reactions: {},
      mentions: extractMentions(newChatMessage),
      taskMention: extractTaskMention(newChatMessage)
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setNewChatMessage('');
    
    setTimeout(() => {
      const replies = [
        "Thanks for the information!",
        "Message received!",
        "I'll review this right away.",
        "Need any further assistance?",
        "Message has been recorded!"
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      
      const botMessage = {
        id: chatMessages.length + 2,
        user: "Bot",
        text: randomReply,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        reactions: {},
        type: "system"
      };
      
      setChatMessages(prev => [...prev, botMessage]);
    }, 2000);
  };

  const extractMentions = (text) => {
    const mentions = [];
    const mentionRegex = /@(\w+)/g;
    let match;
    while ((match = mentionRegex.exec(text)) !== null) {
      mentions.push(match[1]);
    }
    return mentions;
  };

  const extractTaskMention = (text) => {
    const taskRegex = /#(TASK-\d+)/;
    const match = text.match(taskRegex);
    return match ? match[1] : null;
  };

  // Timer Functions
  const toggleTimeTracker = (taskId, taskTitle) => {
    if (currentTimer && currentTimer.taskId === taskId) {
      stopTimer();
    } else {
      if (currentTimer) stopTimer();
      startTimer(taskId, taskTitle);
    }
  };

  const startTimer = (taskId, taskTitle) => {
    const newTimer = {
      taskId,
      taskTitle,
      startTime: Date.now(),
      elapsed: 0,
      running: true
    };
    
    setCurrentTimer(newTimer);
    
    const interval = setInterval(() => {
      if (newTimer.running) {
        newTimer.elapsed = Date.now() - newTimer.startTime;
        
        setTasks(prevTasks => 
          prevTasks.map(task => 
            task.id === taskId 
              ? { ...task, timeLogged: task.timeLogged + 1/60 }
              : task
          )
        );
      }
    }, 1000);
    
    setTimerInterval(interval);
    showNotification(`⏱️ Started time tracking for: ${taskTitle}`);
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    setCurrentTimer(null);
    showNotification("⏹️ Stopped time tracking");
  };

  // Command Functions
  const executeCommand = (command) => {
    command = command.toLowerCase();
    
    if (command.includes('create task') || command.includes('new task')) {
      createNewTask();
      showNotification("✅ Creating new task...");
    }
    else if (command.includes('dark mode')) {
      setDarkMode(!darkMode);
      showNotification(darkMode ? "☀️ Enabled Light Mode" : "🌙 Enabled Dark Mode");
    }
    else if (command.includes('open chat') || command.includes('chat')) {
      setShowChatModal(true);
      showNotification("💬 Opening group chat");
    }
    else if (command.includes('view ranking') || command.includes('ranking')) {
      setCurrentView('leaderboard');
      showNotification("🏆 Opening leaderboard");
    }
    else if (command.includes('help')) {
      showNotification("ℹ️ Available commands: create task, dark mode, open chat, view ranking, help");
    }
    else {
      showNotification(`❌ Command not found: "${command}"`);
    }
    
    setShowCommandPalette(false);
    setCommandInput('');
  };

  // Drag and Drop
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add(cx('drag-over'));
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove(cx('drag-over'));
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    e.currentTarget.classList.remove(cx('drag-over'));
    
    const taskId = e.dataTransfer.getData('text/plain');
    updateTaskStatus(taskId, newStatus);
  };

  // Use Effects
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(true);
      }
      if (e.key === 'Escape') {
        setShowCommandPalette(false);
        setShowTaskModal(false);
        setShowChatModal(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTop = chatMessagesContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Component: Task Card
  const TaskCard = ({ task }) => {
    const assigneeAvatars = task.assignees.map(userId => {
      const user = projectData.members.find(m => m.id === userId);
      return (
        <div key={userId} className={cx('task-member')} title={user?.name || 'Unknown'}>
          {user?.initials || '?'}
        </div>
      );
    });

    return (
      <div 
        className={cx('task-card', `priority-${task.priority}`)}
        data-task-id={task.id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, task.id)}
        onClick={() => openTaskModal(task.id)}
      >
        {task.badge && (
          <div className={cx('gamification-badge')}>
            <FontAwesomeIcon icon={task.badge === 'gold' ? faCrown : task.badge === 'silver' ? faAwardSolid : faMedal} />
          </div>
        )}
        
        <div className={cx('task-header')}>
          <div className={cx('task-id')}>{task.id}</div>
          <div className={cx('task-actions')}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
        
        <div className={cx('task-title')}>{task.title}</div>
        
        {task.subTasks && task.subTasks.length > 0 && (
          <div className={cx('sub-tasks')}>
            {task.subTasks.map(sub => (
              <div key={sub.id} className={cx('sub-task', { completed: sub.completed })}>
                <input 
                  type="checkbox" 
                  checked={sub.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSubTask(task.id, sub.id);
                  }}
                />
                <span>{sub.text}</span>
              </div>
            ))}
          </div>
        )}
        
        {showingSubtaskInput[task.id] ? (
          <div className={cx('subtask-quick-add')}>
            <input 
              type="text" 
              placeholder="Enter new subtask..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addQuickSubtask(task.id, e.target.value);
                  e.target.value = '';
                } else if (e.key === 'Escape') {
                  setShowingSubtaskInput(prev => ({ ...prev, [task.id]: false }));
                }
              }}
              autoFocus
            />
            <button onClick={(e) => {
              e.stopPropagation();
              const input = e.target.parentElement.querySelector('input');
              addQuickSubtask(task.id, input.value);
              input.value = '';
            }}>
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button onClick={(e) => {
              e.stopPropagation();
              setShowingSubtaskInput(prev => ({ ...prev, [task.id]: false }));
            }}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        ) : (
          <div 
            className={cx('subtask-add-btn')}
            onClick={(e) => {
              e.stopPropagation();
              setShowingSubtaskInput(prev => ({ ...prev, [task.id]: true }));
            }}
          >
            <FontAwesomeIcon icon={faPlus} /> Add subtask
          </div>
        )}
        
        <div className={cx('task-timer')}>
          <button 
            className={cx('timer-toggle', { active: currentTimer?.taskId === task.id })}
            onClick={(e) => {
              e.stopPropagation();
              toggleTimeTracker(task.id, task.title);
            }}
          >
            <FontAwesomeIcon icon={currentTimer?.taskId === task.id ? faStop : faPlay} />
          </button>
          <div className={cx('time-logged')}>{formatTime(task.timeLogged)}</div>
        </div>
        
        <div className={cx('task-meta')}>
          <div className={cx('task-members')}>
            {assigneeAvatars}
          </div>
          <div className={cx('task-dates')}>
            <div className={cx('date-badge')} title="Deadline">
              <FontAwesomeIcon icon={faFlagIcon} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Kanban Column
  const KanbanColumn = ({ column }) => {
    const columnTasks = tasks.filter(task => task.status === column.id);
    
    return (
      <div className={cx('kanban-column')} data-status={column.id}>
        <div className={cx('column-header')}>
          <div className={cx('column-title')}>
            <FontAwesomeIcon icon={column.icon} />
            <span>{column.title}</span>
          </div>
          <div className={cx('column-count')}>{columnTasks.length}</div>
        </div>
        <div 
          className={cx('tasks-container')}
          data-status={column.id}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {columnTasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    );
  };

  // Component: Task Modal
  const TaskModal = () => {
    if (!selectedTask) return null;
    
    const assignedMembers = selectedTask.assignees.map(userId => {
      const user = projectData.members.find(m => m.id === userId);
      return (
        <div key={userId} className={cx('member-avatar')} title={user?.name}>
          {user?.initials}
        </div>
      );
    });

    return (
      <div className={cx('modal-overlay', { active: showTaskModal })}>
        <div className={cx('task-modal')}>
          <div className={cx('modal-header')}>
            <h2>{selectedTask.title}</h2>
            <button className={cx('action-btn', 'btn-secondary')} onClick={() => setShowTaskModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          
          <div className={cx('modal-body')}>
            <div className={cx('modal-grid')}>
              <div className={cx('task-details')}>
                <div className={cx('detail-section')}>
                  <h3><FontAwesomeIcon icon={faAlignLeft} /> Description</h3>
                  <p>{selectedTask.description}</p>
                </div>
                
                <div className={cx('detail-section')}>
                  <h3><FontAwesomeIcon icon={faTasks} /> Sub-tasks</h3>
                  <div className={cx('sub-tasks')}>
                    {selectedTask.subTasks.map(sub => (
                      <div key={sub.id} className={cx('sub-task', { completed: sub.completed })}>
                        <input 
                          type="checkbox" 
                          checked={sub.completed}
                          onChange={() => toggleSubTask(selectedTask.id, sub.id)}
                        />
                        <span>{sub.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className={cx('add-subtask')} onClick={() => addQuickSubtask(selectedTask.id, "New subtask")}>
                    <FontAwesomeIcon icon={faPlus} /> Add subtask
                  </div>
                </div>
                
                <div className={cx('detail-section')}>
                  <h3><FontAwesomeIcon icon={faComments} /> Comments</h3>
                  <div className={cx('comment-section')}>
                    {selectedTask.comments.map((comment, index) => (
                      <div key={index} className={cx('comment')}>
                        <div className={cx('comment-avatar')}>{comment.user}</div>
                        <div>
                          <strong>{comment.user}</strong>
                          <div>{comment.text}</div>
                          <small>{comment.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={cx('comment-input')}>
                    <textarea placeholder="Add a comment..." rows="3" />
                    <button className={cx('action-btn', 'btn-primary')} style={{ marginTop: '10px' }}>
                      <FontAwesomeIcon icon={faPaperPlane} /> Send
                    </button>
                  </div>
                </div>
              </div>
              
              <div className={cx('task-info')}>
                <div className={cx('detail-section')}>
                  <h3><FontAwesomeIcon icon={faInfoCircle} /> Information</h3>
                  <div className={cx('info-grid')}>
                    <div className={cx('info-item')}>
                      <strong>Status:</strong>
                      <select 
                        value={selectedTask.status}
                        onChange={(e) => updateTaskStatus(selectedTask.id, e.target.value)}
                        className={cx('status-select')}
                      >
                        <option value="todo">To Do</option>
                        <option value="progress">In Progress</option>
                        <option value="review">Review</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                    <div className={cx('info-item')}>
                      <strong>Priority:</strong>
                      <select 
                        value={selectedTask.priority}
                        onChange={(e) => {
                          setTasks(prev => prev.map(task => 
                            task.id === selectedTask.id 
                              ? { ...task, priority: e.target.value }
                              : task
                          ));
                          showNotification(`✅ Priority changed to ${e.target.value}`);
                        }}
                        className={cx('priority-select')}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className={cx('info-item')}>
                      <strong>Assignees:</strong>
                      <div className={cx('assigned-members')}>
                        {assignedMembers}
                      </div>
                    </div>
                    <div className={cx('info-item')}>
                      <strong>Start Date:</strong>
                      <input 
                        type="date" 
                        value={selectedTask.startDate}
                        className={cx('date-input')}
                        readOnly
                      />
                    </div>
                    <div className={cx('info-item')}>
                      <strong>Due Date:</strong>
                      <input 
                        type="date" 
                        value={selectedTask.dueDate}
                        className={cx('date-input')}
                        readOnly
                      />
                    </div>
                    <div className={cx('info-item')}>
                      <strong>Time Logged:</strong>
                      <div>{formatTime(selectedTask.timeLogged)}</div>
                    </div>
                  </div>
                </div>
                
                <div className={cx('detail-section')}>
                  <h3><FontAwesomeIcon icon={faHistory} /> Activity</h3>
                  <div className={cx('activity-log')}>
                    {selectedTask.activities.map((activity, index) => (
                      <div key={index} className={cx('activity-item')}>
                        <strong>{activity.user}</strong> {activity.action} 
                        <small>{activity.time}</small>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={cx('detail-section')}>
                  <button 
                    className={cx('action-btn', 'btn-primary')}
                    onClick={() => toggleTimeTracker(selectedTask.id, selectedTask.title)}
                  >
                    <FontAwesomeIcon icon={faPlay} /> Start timer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Chat Modal
  const ChatModal = () => {
    const handleSendMessage = () => {
      if (!chatInput.trim()) return;
      
      const newMessage = {
        id: chatMessages.length + 1,
        user: "You",
        text: chatInput.trim(),
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        reactions: {},
        mentions: extractMentions(chatInput),
        taskMention: extractTaskMention(chatInput)
      };
      
      setChatMessages(prev => [...prev, newMessage]);
      setChatInput('');
      
      setTimeout(() => {
        const replies = [
          "Message received!",
          "Need any assistance?",
          "I'm reviewing this information",
          "Thanks for sharing!"
        ];
        const randomReply = replies[Math.floor(Math.random() * replies.length)];
        
        const botMessage = {
          id: chatMessages.length + 2,
          user: "Bot",
          text: randomReply,
          time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          reactions: {},
          type: "system"
        };
        
        setChatMessages(prev => [...prev, botMessage]);
      }, 2000);
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    };

    return (
      <div className={cx('chat-modal', { active: showChatModal })}>
        <div className={cx('chat-modal-header')}>
          <div className={cx('chat-modal-title')}>
            <FontAwesomeIcon icon={faComments} />
            <span>Project Group Chat</span>
            <div className={cx('online-badge')}>🟢 {projectData.members.filter(m => m.online).length} online</div>
          </div>
          <div className={cx('chat-actions')}>
            <button className={cx('chat-action-btn')} onClick={() => showNotification("Chat notifications disabled")}>
              <FontAwesomeIcon icon={faBell} />
            </button>
            <button className={cx('chat-action-btn')} onClick={() => showNotification("Searching...")}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button className={cx('chat-action-btn')} onClick={() => setShowChatModal(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
        
        <div className={cx('chat-modal-body')}>
          <div className={cx('chat-sidebar')}>
            <div className={cx('chat-search')}>
              <FontAwesomeIcon icon={faSearch} />
              <input type="text" placeholder="Search in chat..." />
            </div>
            
            <div className={cx('chat-sidebar-section')}>
              <h4><FontAwesomeIcon icon={faUserFriends} /> Members ({projectData.members.length})</h4>
              <div className={cx('online-users')}>
                {projectData.members.map(member => (
                  <div key={member.id} className={cx('online-user')}>
                    <div className={cx('user-status', { offline: !member.online })}></div>
                    <div className={cx('message-avatar')}>{member.initials}</div>
                    <div>
                      <div style={{ fontWeight: '500' }}>{member.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{member.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className={cx('chat-sidebar-section')}>
              <h4><FontAwesomeIcon icon={faPaperclip} /> Attachments</h4>
              <div className={cx('file-attachments')}>
                <div className={cx('attachment-item')}>
                  <FontAwesomeIcon icon={faImage} />
                  <span>wireframe.png</span>
                </div>
                <div className={cx('attachment-item')}>
                  <FontAwesomeIcon icon={faPaperclip} />
                  <span>requirements.pdf</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className={cx('chat-main')}>
            <div className={cx('chat-messages-container')} ref={chatMessagesContainerRef}>
              {chatMessages.map(msg => (
                <div key={msg.id} className={cx('message', { own: msg.user === "You", system: msg.type === 'system' })}>
                  {msg.type !== 'system' && (
                    <div className={cx('message-avatar-large')}>{msg.user}</div>
                  )}
                  <div className={cx('message-content-large')}>
                    {msg.type === 'system' ? (
                      <>
                        <div className={cx('message-text-large')}>
                          <FontAwesomeIcon icon={faInfoCircle} /> {msg.text}
                        </div>
                        <div className={cx('message-time')}>{msg.time}</div>
                      </>
                    ) : (
                      <>
                        <div className={cx('message-header')}>
                          <div className={cx('message-author-large')}>
                            {projectData.members.find(m => m.initials === msg.user)?.name || msg.user}
                          </div>
                          <div className={cx('message-time')}>{msg.time}</div>
                        </div>
                        <div className={cx('message-text-large')}>
                          {msg.text}
                          {msg.taskMention && (
                            <div className={cx('task-mention')}>
                              <FontAwesomeIcon icon={faTasks} />
                              <strong>{msg.taskMention}:</strong> {tasks.find(t => t.id === msg.taskMention)?.title}
                            </div>
                          )}
                        </div>
                        <div className={cx('message-actions')}>
                          <button className={cx('message-action')}>
                            <FontAwesomeIcon icon={faSmile} /> Add reaction
                          </button>
                          <button className={cx('message-action')}>
                            <FontAwesomeIcon icon={faReply} /> Reply
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={cx('chat-input-container')}>
              <div className={cx('chat-input-attachments')}>
                <button className={cx('attachment-btn')} onClick={() => showNotification("Attaching file...")}>
                  <FontAwesomeIcon icon={faPaperclip} />
                </button>
                <button className={cx('attachment-btn')} onClick={() => showNotification("Attaching image...")}>
                  <FontAwesomeIcon icon={faImage} />
                </button>
              </div>
              
              <div className={cx('chat-input-wrapper')}>
                <textarea 
                  className={cx('chat-textarea')}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Message... (Type @ to mention someone, # to mention task)"
                  rows="3"
                />
                <button className={cx('send-btn')} onClick={handleSendMessage}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component: Command Palette
  const CommandPalette = () => {
    const commands = [
      { icon: faPlus, label: "Create new task", command: "create task" },
      { icon: faMoon, label: "Toggle dark mode", command: "dark mode" },
      { icon: faComments, label: "Open group chat", command: "open chat" },
      { icon: faTrophy, label: "View leaderboard", command: "view ranking" }
    ];

    return (
      <div className={cx('command-palette', { active: showCommandPalette })}>
        <input 
          type="text" 
          className={cx('command-input')}
          value={commandInput}
          onChange={(e) => setCommandInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              executeCommand(commandInput);
            }
          }}
          placeholder="Enter command... (try: 'create task', 'dark mode', 'open chat')"
          autoFocus
        />
        <div className={cx('command-results')}>
          {commands.map((cmd, index) => (
            <div 
              key={index}
              className={cx('command-item')}
              onClick={() => executeCommand(cmd.command)}
            >
              <FontAwesomeIcon icon={cmd.icon} />
              <span>{cmd.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Component: Time Tracker
  const TimeTracker = () => {
    if (!currentTimer) return null;
    
    const formatTimer = () => {
      const totalSeconds = Math.floor(currentTimer.elapsed / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
      <div className={cx('time-tracker', { active: currentTimer })}>
        <h3>⏱️ Time Tracker</h3>
        <div className={cx('timer-display')}>
          {formatTimer()}
        </div>
        <div className={cx('timer-controls')}>
          <button className={cx('timer-btn')} onClick={() => {
            if (currentTimer) {
              setCurrentTimer(prev => ({ ...prev, running: true }));
            }
          }}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
          <button className={cx('timer-btn')} onClick={() => {
            if (currentTimer) {
              setCurrentTimer(prev => ({ ...prev, running: false }));
            }
          }}>
            <FontAwesomeIcon icon={faPause} />
          </button>
          <button className={cx('timer-btn', 'stop')} onClick={stopTimer}>
            <FontAwesomeIcon icon={faStop} />
          </button>
        </div>
        <small>Tracking: <span>{currentTimer?.taskTitle}</span></small>
      </div>
    );
  };

  // Component: Stats Cards
  const StatsCards = () => {
    const totalTime = tasks.reduce((sum, task) => sum + (task.timeLogged || 0), 0);
    const totalPoints = projectData.members.reduce((sum, member) => sum + member.points, 0);
    const doneTasks = tasks.filter(t => t.status === 'done').length;
    const progress = Math.round((doneTasks / tasks.length) * 100);

    const stats = [
      { icon: faTasks, number: tasks.length, label: "Total tasks" },
      { icon: faClock, number: formatTime(totalTime), label: "Total hours" },
      { icon: faAward, number: totalPoints, label: "Total points" },
      { icon: faCheckCircle, number: `${progress}%`, label: "Completion" }
    ];

    return (
      <div className={cx('stats-grid')}>
        {stats.map((stat, index) => (
          <div key={index} className={cx('stat-card')}>
            <FontAwesomeIcon icon={stat.icon} />
            <div className={cx('stat-number')}>{stat.number}</div>
            <div>{stat.label}</div>
          </div>
        ))}
      </div>
    );
  };

  // Component: Leaderboard
  const Leaderboard = () => {
    const sortedMembers = [...projectData.members].sort((a, b) => b.points - a.points);
    
    return (
      <div className={cx('leaderboard')}>
        <h2>🏆 Member Leaderboard</h2>
        {sortedMembers.map((member, index) => (
          <div key={member.id} className={cx('leaderboard-item')}>
            <div className={cx('leaderboard-member')}>
              <div className={cx('rank')}>{index + 1}</div>
              <div className={cx('member-avatar')}>{member.initials}</div>
              <div>
                <div className={cx('member-name')}>{member.name}</div>
                <div className={cx('member-status')}>
                  {member.online ? '🟢 Online' : '⚫ Offline'}
                </div>
              </div>
            </div>
            <div className={cx('points')}>{member.points} points</div>
          </div>
        ))}
      </div>
    );
  };

  // Main Component Render
  return (
    <div className={cx('project-container', { 'dark-mode': darkMode })}>
      {/* Sidebar */}
      <div className={cx('sidebar')}>
        <div className={cx('project-info')}>
          <div className={cx('project-title')}>
            <FontAwesomeIcon icon={faCodeBranch} />
            <h2>{projectData.name}</h2>
          </div>
          <div className={cx('project-meta')}>
            <div className={cx('meta-item')}>
              <FontAwesomeIcon icon={faCalendar} />
              <span>15-04-2024</span>
            </div>
            <div className={cx('meta-item')}>
              <FontAwesomeIcon icon={faUserFriends} />
              <span>{projectData.members.length} members</span>
            </div>
            <div className={cx('meta-item')}>
              <FontAwesomeIcon icon={faFlag} />
              <span>Priority: High</span>
            </div>
          </div>
          <div className={cx('progress-ring')}>
            <svg width="80" height="80">
              <circle 
                className={cx('ring-circle', 'ring-bg')} 
                cx="40" cy="40" r="36"
              ></circle>
              <circle 
                className={cx('ring-circle', 'ring-progress')} 
                cx="40" cy="40" r="36"
                style={{ strokeDashoffset: 226 - (226 * projectData.progress) / 100 }}
              ></circle>
            </svg>
            <div className={cx('progress-text')}>{projectData.progress}%</div>
          </div>
        </div>

        <div className={cx('sidebar-nav')}>
          <div 
            className={cx('nav-item', { active: currentView === 'kanban' })}
            onClick={() => setCurrentView('kanban')}
          >
            <FontAwesomeIcon icon={faColumns} />
            <span>Kanban Board</span>
          </div>
          <div 
            className={cx('nav-item', { active: currentView === 'leaderboard' })}
            onClick={() => setCurrentView('leaderboard')}
          >
            <FontAwesomeIcon icon={faTrophy} />
            <span>Leaderboard</span>
          </div>
          <div 
            className={cx('nav-item')}
            onClick={() => setShowChatModal(true)}
          >
            <FontAwesomeIcon icon={faComments} />
            <span>Group Chat</span>
          </div>
        </div>

        {/* Mini Chat in Sidebar */}
        <div className={cx('group-chat')}>
          <div className={cx('chat-header')}>
            <h3>Group chat</h3>
            <span className={cx('online-count')}>
              {projectData.members.filter(m => m.online).length} online
            </span>
          </div>
          <div className={cx('chat-messages')}>
            {chatMessages.slice(-3).map(msg => (
              <div key={msg.id} className={cx('chat-message')}>
                <div className={cx('message-avatar')}>{msg.user}</div>
                <div className={cx('message-content')}>
                  <div className={cx('message-author')}>{msg.user}</div>
                  <div className={cx('message-text')}>{msg.text.substring(0, 30)}...</div>
                  <small>{msg.time}</small>
                </div>
              </div>
            ))}
          </div>
          <div className={cx('chat-input')}>
            <input 
              type="text" 
              placeholder="Message..." 
              value={newChatMessage}
              onChange={(e) => setNewChatMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={cx('main-content')}>
        {/* Header */}
        <div className={cx('main-header')}>
          <div className={cx('view-toggle')}>
            <button 
              className={cx('view-btn', { active: currentView === 'kanban' })}
              onClick={() => setCurrentView('kanban')}
            >
              <FontAwesomeIcon icon={faColumns} /> Board
            </button>
            <button 
              className={cx('view-btn', { active: currentView === 'leaderboard' })}
              onClick={() => setCurrentView('leaderboard')}
            >
              <FontAwesomeIcon icon={faTrophy} /> Ranking
            </button>
            <button 
              className={cx('view-btn')}
              onClick={() => setShowChatModal(true)}
            >
              <FontAwesomeIcon icon={faComments} /> Chat
            </button>
          </div>
          
          <div className={cx('header-actions')}>
            <button 
              className={cx('action-btn', 'btn-secondary')}
              onClick={() => setShowCommandPalette(true)}
            >
              <FontAwesomeIcon icon={faTerminal} /> Command
            </button>
            
            <div 
              className={cx('theme-toggle')}
              onClick={() => {
                setDarkMode(!darkMode);
                showNotification(darkMode ? "☀️ Enabled Light Mode" : "🌙 Enabled Dark Mode");
              }}
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </div>
            
            <button 
              className={cx('action-btn', 'btn-primary')}
              onClick={createNewTask}
            >
              <FontAwesomeIcon icon={faPlus} /> New Task
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Kanban View */}
        {currentView === 'kanban' && (
          <div className={cx('kanban-board')}>
            {columns.map(column => (
              <KanbanColumn key={column.id} column={column} />
            ))}
          </div>
        )}

        {/* Leaderboard View */}
        {currentView === 'leaderboard' && <Leaderboard />}
      </div>

      {/* Modals and Components */}
      <TaskModal />
      <ChatModal />
      <CommandPalette />
      <TimeTracker />
      
      {/* AI Assistant Button */}
      <div className={cx('ai-assistant')}>
        <button 
          className={cx('ai-toggle')}
          onClick={() => showNotification("🤖 AI Assistant is under development...")}
        >
          <FontAwesomeIcon icon={faRobot} />
        </button>
      </div>
    </div>
  );
}

export default ProjectManagement;