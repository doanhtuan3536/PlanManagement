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
  faListCheck,
  faTrophy,
  faComments,
  faPlus,
  faBolt,
  faTasks,
  faClock,
  faAward,
  faCheckCircle,
  faPlay,
  faStop,
  faTimes,
  faEllipsisH,
  faFlag as faFlagIcon,
  faCheck,
  faPaperPlane,
  faAlignLeft,
  faInfoCircle,
  faHistory,
  faStar,
  faUser,
  faTrash,
  faFlagCheckered,
  faEye,
  faSpinner,
  faCircle,
  faSearch,
  faBell,
  faThumbtack,
  faPaperclip,
  faImage,
  faSmile,
  faReply,
  faRobot,
  faCrown,
  faMedal,
  faCheckCircle as faCheckCircleSolid
} from '@fortawesome/free-solid-svg-icons';
import LeftNavbar from '~/layouts/components/LeftNavbar';

const cx = classNames.bind(styles);

function ProjectManagement() {
  // ==================== DATA STRUCTURE ====================
  const [sprints, setSprints] = useState([
    {
      id: 1,
      name: "Sprint 1: Foundation",
      goal: "Xây dựng nền tảng và thiết kế hệ thống",
      startDate: "2024-04-01",
      endDate: "2024-04-14",
      status: "completed",
      capacity: 160,
      targetPoints: 35,
      actualPoints: 32,
      velocity: 32,
      team: [1, 2, 3],
      tasks: ["TASK-001", "TASK-002", "TASK-003"]
    },
    {
      id: 2,
      name: "Sprint 2: UI/UX Implementation",
      goal: "Triển khai giao diện người dùng và trải nghiệm",
      startDate: "2024-04-15",
      endDate: "2024-04-28",
      status: "active",
      capacity: 180,
      targetPoints: 40,
      actualPoints: 25,
      velocity: 42,
      team: [1, 2, 3, 4, 5],
      tasks: ["TASK-004", "TASK-005", "TASK-006", "TASK-007"]
    },
    {
      id: 3,
      name: "Sprint 3: Features & Testing",
      goal: "Phát triển tính năng chính và kiểm thử",
      startDate: "2024-04-29",
      endDate: "2024-05-12",
      status: "planned",
      capacity: 200,
      targetPoints: 45,
      actualPoints: 0,
      velocity: 0,
      team: [1, 2, 3, 4, 5, 6],
      tasks: ["TASK-008", "TASK-009"]
    }
  ]);

  const [tasks, setTasks] = useState([
    {
      id: "TASK-001",
      title: "Thiết kế wireframe homepage",
      description: "Tạo wireframe cho trang chủ với đầy đủ các component chính. Bao gồm header, hero section, features, testimonials và footer.",
      status: "done",
      priority: "high",
      assignees: [1, 2],
      sprintId: 1,
      storyPoints: 8,
      tags: ["design", "feature"],
      startDate: "2024-04-01",
      dueDate: "2024-04-05",
      estimate: "8h",
      timeLogged: 480,
      subTasks: [
        { id: 1, text: "Wireframe header", completed: true },
        { id: 2, text: "Wireframe hero section", completed: true },
        { id: 3, text: "Wireframe footer", completed: true }
      ],
      comments: [
        { user: "Nguyễn Văn A", text: "Wireframe đã xong, mọi người review nhé", time: "2024-04-03 10:30" },
        { user: "Trần Thị B", text: "Nhìn ổn, nhưng cần thêm phần call-to-action", time: "2024-04-03 14:20" }
      ],
      activities: [
        { action: "created", user: "Nguyễn Văn A", time: "2024-04-01 09:00", details: "Task được tạo" },
        { action: "assigned", user: "Trần Thị B", time: "2024-04-01 09:30", details: "Được gán cho Trần Thị B" },
        { action: "completed", user: "Nguyễn Văn A", time: "2024-04-05 16:00", details: "Đánh dấu hoàn thành" }
      ]
    },
    {
      id: "TASK-002",
      title: "Phát triển API authentication",
      description: "Xây dựng hệ thống đăng nhập, đăng ký với JWT. Bao gồm xác thực email và reset password.",
      status: "done",
      priority: "high",
      assignees: [3],
      sprintId: 1,
      storyPoints: 13,
      tags: ["backend", "security"],
      startDate: "2024-04-03",
      dueDate: "2024-04-10",
      estimate: "12h",
      timeLogged: 720,
      subTasks: [
        { id: 1, text: "Setup JWT", completed: true },
        { id: 2, text: "Login endpoint", completed: true },
        { id: 3, text: "Register endpoint", completed: true },
        { id: 4, text: "Email verification", completed: true }
      ],
      comments: [
        { user: "Lê Văn C", text: "API đã hoàn thành, cần test integration", time: "2024-04-09 11:45" }
      ],
      activities: [
        { action: "created", user: "Lê Văn C", time: "2024-04-03 09:00", details: "Task được tạo" },
        { action: "completed", user: "Lê Văn C", time: "2024-04-10 14:30", details: "Đánh dấu hoàn thành" }
      ]
    },
    {
      id: "TASK-003",
      title: "Fix bug responsive trên mobile",
      description: "Sửa lỗi hiển thị trên iPhone và thiết bị mobile. Tập trung vào các breakpoint 320px, 375px, 425px.",
      status: "done",
      priority: "medium",
      assignees: [2, 4],
      sprintId: 1,
      storyPoints: 5,
      tags: ["bug", "frontend"],
      startDate: "2024-04-08",
      dueDate: "2024-04-12",
      estimate: "4h",
      timeLogged: 240,
      subTasks: [],
      comments: [],
      activities: [
        { action: "created", user: "Phạm Thị D", time: "2024-04-08 10:00", details: "Bug được report" },
        { action: "fixed", user: "Trần Thị B", time: "2024-04-11 15:30", details: "Đã fix bug responsive" }
      ]
    },
    {
      id: "TASK-004",
      title: "Triển khai component library",
      description: "Xây dựng thư viện component React tái sử dụng với Storybook documentation.",
      status: "progress",
      priority: "high",
      assignees: [2, 5],
      sprintId: 2,
      storyPoints: 13,
      tags: ["frontend", "component"],
      startDate: "2024-04-15",
      dueDate: "2024-04-22",
      estimate: "16h",
      timeLogged: 600,
      subTasks: [
        { id: 1, text: "Button components", completed: true },
        { id: 2, text: "Input components", completed: true },
        { id: 3, text: "Modal components", completed: false },
        { id: 4, text: "Documentation", completed: false }
      ],
      comments: [
        { user: "Trần Thị B", text: "Đã hoàn thành button và input components", time: "2024-04-18 16:45" },
        { user: "Hoàng Văn E", text: "Cần thêm variant cho modal", time: "2024-04-19 10:15" }
      ],
      activities: [
        { action: "created", user: "Hoàng Văn E", time: "2024-04-15 09:00", details: "Task được tạo" },
        { action: "started", user: "Trần Thị B", time: "2024-04-15 10:30", details: "Bắt đầu làm" }
      ]
    },
    {
      id: "TASK-005",
      title: "Thiết kế dashboard admin",
      description: "Tạo giao diện dashboard cho quản trị viên với các chart và thống kê.",
      status: "progress",
      priority: "high",
      assignees: [1],
      sprintId: 2,
      storyPoints: 8,
      tags: ["design", "admin"],
      startDate: "2024-04-16",
      dueDate: "2024-04-25",
      estimate: "10h",
      timeLogged: 360,
      subTasks: [
        { id: 1, text: "Layout design", completed: true },
        { id: 2, text: "Chart integration", completed: false },
        { id: 3, text: "Responsive design", completed: false }
      ],
      comments: [
        { user: "Nguyễn Văn A", text: "Layout đã xong, đang tìm chart library phù hợp", time: "2024-04-20 11:30" }
      ],
      activities: [
        { action: "created", user: "Nguyễn Văn A", time: "2024-04-16 09:00", details: "Task được tạo" },
        { action: "moved", user: "Nguyễn Văn A", time: "2024-04-18 14:00", details: "Chuyển từ To Do sang In Progress" }
      ]
    },
    {
      id: "TASK-006",
      title: "Database optimization",
      description: "Tối ưu hóa database queries và indexes để cải thiện performance.",
      status: "review",
      priority: "medium",
      assignees: [3],
      sprintId: 2,
      storyPoints: 5,
      tags: ["backend", "database"],
      startDate: "2024-04-10",
      dueDate: "2024-04-18",
      estimate: "8h",
      timeLogged: 320,
      subTasks: [
        { id: 1, text: "Analyze slow queries", completed: true },
        { id: 2, text: "Add missing indexes", completed: true },
        { id: 3, text: "Query optimization", completed: false }
      ],
      comments: [],
      activities: []
    },
    {
      id: "TASK-007",
      title: "User testing session",
      description: "Tổ chức phiên testing với người dùng thật và thu thập feedback.",
      status: "todo",
      priority: "medium",
      assignees: [6],
      sprintId: 2,
      storyPoints: 3,
      tags: ["testing", "user-feedback"],
      startDate: "2024-04-20",
      dueDate: "2024-04-25",
      estimate: "6h",
      timeLogged: 60,
      subTasks: [],
      comments: [],
      activities: []
    },
    {
      id: "TASK-008",
      title: "Deploy to production",
      description: "Triển khai phiên bản mới nhất lên production server.",
      status: "todo",
      priority: "high",
      assignees: [3, 5],
      sprintId: 3,
      storyPoints: 8,
      tags: ["deployment", "devops"],
      startDate: "2024-04-29",
      dueDate: "2024-05-02",
      estimate: "12h",
      timeLogged: 0,
      subTasks: [],
      comments: [],
      activities: []
    },
    {
      id: "TASK-009",
      title: "Documentation update",
      description: "Cập nhật tài liệu kỹ thuật và user guide.",
      status: "todo",
      priority: "low",
      assignees: [4],
      sprintId: 3,
      storyPoints: 5,
      tags: ["documentation"],
      startDate: "2024-05-03",
      dueDate: "2024-05-10",
      estimate: "10h",
      timeLogged: 0,
      subTasks: [],
      comments: [],
      activities: []
    },
    {
      id: "TASK-010",
      title: "Performance optimization",
      description: "Tối ưu hiệu năng ứng dụng, giảm thời gian load và cải thiện UX.",
      status: "todo",
      priority: "medium",
      assignees: [],
      sprintId: null,
      storyPoints: 8,
      tags: ["performance", "frontend"],
      startDate: "",
      dueDate: "",
      estimate: "8h",
      timeLogged: 0,
      subTasks: [],
      comments: [],
      activities: []
    }
  ]);

  const projectData = {
    name: "Website Redesign",
    progress: 68,
    members: [
      { id: 1, name: "Nguyễn Văn A", initials: "NA", online: true, points: 450, role: "Designer" },
      { id: 2, name: "Trần Thị B", initials: "TB", online: true, points: 380, role: "Frontend" },
      { id: 3, name: "Lê Văn C", initials: "LC", online: false, points: 320, role: "Backend" },
      { id: 4, name: "Phạm Thị D", initials: "PD", online: true, points: 295, role: "Frontend" },
      { id: 5, name: "Hoàng Văn E", initials: "HE", online: true, points: 410, role: "Team Lead" },
      { id: 6, name: "Mai Thị F", initials: "MF", online: false, points: 280, role: "Tester" },
      { id: 7, name: "Vũ Văn G", initials: "VG", online: true, points: 340, role: "Fullstack" },
      { id: 8, name: "Đỗ Thị H", initials: "DH", online: false, points: 260, role: "QA" }
    ]
  };

  const [chatMessages, setChatMessages] = useState([
    { id: 1, userId: 5, text: "Chào mọi người, sprint 2 đang diễn ra tốt đẹp!", time: "2024-04-22 09:15", type: "text" },
    { id: 2, userId: 2, text: "Tôi vừa hoàn thành component library, mọi người review nhé", time: "2024-04-22 10:30", type: "text" },
    { id: 3, userId: 1, text: "Dashboard design đã xong phần layout", time: "2024-04-22 11:45", type: "text" },
    { id: 4, userId: 5, text: "Có ai gặp vấn đề với API authentication không?", time: "2024-04-22 14:20", type: "text" },
    { id: 5, userId: 3, text: "Tôi đang fix, sẽ xong trong 30 phút nữa", time: "2024-04-22 14:25", type: "text" }
  ]);

  // ==================== STATE MANAGEMENT ====================
  const [currentSprintId, setCurrentSprintId] = useState(2);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [timerInterval, setTimerInterval] = useState(null);
  const [currentModalTaskId, setCurrentModalTaskId] = useState(null);
  const [currentUser] = useState({ id: 1, name: "Nguyễn Văn A", initials: "NA" });
  const [activeView, setActiveView] = useState("sprint-board");
  const [sprintModalOpen, setSprintModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [sprintForm, setSprintForm] = useState({
    name: "",
    goal: "",
    startDate: "",
    endDate: "",
    capacity: 160,
    targetPoints: 40,
    description: "",
    team: []
  });
  const [commentInput, setCommentInput] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [subtaskInput, setSubtaskInput] = useState("");
  const [showAddSubtaskInput, setShowAddSubtaskInput] = useState(false);
  const [modalTaskData, setModalTaskData] = useState(null);
  const [draggingTask, setDraggingTask] = useState(null);
  const [notification, setNotification] = useState(null);

  // ==================== HELPER FUNCTIONS ====================
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return '';
    const date = new Date(dateTimeString);
    return date.toLocaleString('vi-VN');
  };

  const showNotification = (message, type = "info") => {
    setNotification({ message, type, id: Date.now() });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // ==================== SPRINT FUNCTIONS ====================
  const switchSprint = (sprintId) => {
    setCurrentSprintId(sprintId);
    showNotification(`Đã chuyển sang ${sprints.find(s => s.id === sprintId)?.name}`, "success");
  };

  const openSprintModal = () => {
    const today = new Date();
    const twoWeeksLater = new Date(today);
    twoWeeksLater.setDate(today.getDate() + 14);
    
    setSprintForm({
      name: "",
      goal: "",
      startDate: today.toISOString().split('T')[0],
      endDate: twoWeeksLater.toISOString().split('T')[0],
      capacity: 160,
      targetPoints: 40,
      description: "",
      team: projectData.members.filter(m => m.online).map(m => m.id)
    });
    
    setSprintModalOpen(true);
  };

  const closeSprintModal = () => {
    setSprintModalOpen(false);
    setSprintForm({
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
      capacity: 160,
      targetPoints: 40,
      description: "",
      team: []
    });
  };

  const createSprint = () => {
    const { name, goal, startDate, endDate, capacity, targetPoints, description, team } = sprintForm;
    
    if (!name || !startDate || !endDate) {
      showNotification("Vui lòng điền đầy đủ thông tin bắt buộc!", "error");
      return;
    }
    
    const newSprintId = sprints.length > 0 ? Math.max(...sprints.map(s => s.id)) + 1 : 1;
    const newSprint = {
      id: newSprintId,
      name: name,
      goal: goal || "Mục tiêu sprint",
      startDate: startDate,
      endDate: endDate,
      status: "planned",
      capacity: capacity,
      targetPoints: targetPoints,
      actualPoints: 0,
      velocity: 0,
      team: team,
      tasks: []
    };
    
    setSprints([...sprints, newSprint]);
    closeSprintModal();
    setCurrentSprintId(newSprintId);
    showNotification(`✅ Đã tạo sprint mới: ${name}`, "success");
  };

  const completeSprint = () => {
    const currentSprint = sprints.find(s => s.id === currentSprintId);
    if (!currentSprint) return;
    
    if (window.confirm(`Bạn có chắc chắn muốn hoàn thành sprint "${currentSprint.name}"?`)) {
      const updatedSprints = sprints.map(sprint => {
        if (sprint.id === currentSprintId) {
          const sprintTasks = tasks.filter(t => t.sprintId === currentSprintId);
          const completedTasks = sprintTasks.filter(t => t.status === 'done');
          const actualPoints = completedTasks.reduce((sum, task) => sum + (task.storyPoints || 0), 0);
          
          return {
            ...sprint,
            status: "completed",
            actualPoints: actualPoints,
            velocity: actualPoints
          };
        }
        return sprint;
      });
      
      setSprints(updatedSprints);
      showNotification("🎉 Sprint đã hoàn thành!", "success");
    }
  };

  // ==================== TASK FUNCTIONS ====================
  const openTaskModal = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) {
      showNotification("Không tìm thấy task!", "error");
      return;
    }
    
    setCurrentModalTaskId(taskId);
    setModalTaskData(task);
    setTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setTaskModalOpen(false);
    setCurrentModalTaskId(null);
    setModalTaskData(null);
    setShowAddSubtaskInput(false);
    setSubtaskInput("");
    setCommentInput("");
  };

  const createNewTask = () => {
    const newTaskId = `TASK-${String(tasks.length + 1).padStart(3, '0')}`;
    const newTask = {
      id: newTaskId,
      title: "Task mới",
      description: "Mô tả task. Nhấn vào để chỉnh sửa chi tiết.",
      status: "todo",
      priority: "medium",
      assignees: [1],
      sprintId: currentSprintId,
      storyPoints: 5,
      tags: ["feature"],
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimate: "4h",
      timeLogged: 0,
      subTasks: [],
      comments: [],
      activities: [{
        action: "created",
        user: currentUser.name,
        time: new Date().toLocaleString('vi-VN'),
        details: "Task được tạo"
      }]
    };
    
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    
    if (currentSprintId) {
      const updatedSprints = sprints.map(sprint => {
        if (sprint.id === currentSprintId) {
          return { ...sprint, tasks: [...sprint.tasks, newTaskId] };
        }
        return sprint;
      });
      setSprints(updatedSprints);
    }
    
    setCurrentModalTaskId(newTaskId);
    setModalTaskData(newTask);
    setTaskModalOpen(true);
    showNotification("✅ Đã tạo task mới!", "success");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const oldStatus = task.status;
        const newActivity = {
          action: "moved",
          user: currentUser.name,
          time: new Date().toLocaleString('vi-VN'),
          details: `Chuyển từ ${oldStatus} sang ${newStatus}`
        };
        
        return {
          ...task,
          status: newStatus,
          activities: [newActivity, ...task.activities]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    if (currentModalTaskId === taskId) {
      setModalTaskData(updatedTasks.find(t => t.id === taskId));
    }
    
    showNotification(`✅ Đã chuyển trạng thái sang ${newStatus}`, "success");
  };

  const updateTaskPriority = (taskId, newPriority) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const oldPriority = task.priority;
        const newActivity = {
          action: "changed_priority",
          user: currentUser.name,
          time: new Date().toLocaleString('vi-VN'),
          details: `Thay đổi độ ưu tiên từ ${oldPriority} sang ${newPriority}`
        };
        
        return {
          ...task,
          priority: newPriority,
          activities: [newActivity, ...task.activities]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    if (currentModalTaskId === taskId) {
      setModalTaskData(updatedTasks.find(t => t.id === taskId));
    }
    
    showNotification(`⚠️ Đã thay đổi độ ưu tiên sang ${newPriority}`, "warning");
  };

  const updateTaskSprint = (taskId, newSprintId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const oldSprintId = task.sprintId;
    
    if (newSprintId !== oldSprintId) {
      // Update sprints
      const updatedSprints = sprints.map(sprint => {
        if (sprint.id === oldSprintId) {
          return { ...sprint, tasks: sprint.tasks.filter(t => t !== taskId) };
        }
        if (sprint.id === newSprintId) {
          return { ...sprint, tasks: [...sprint.tasks, taskId] };
        }
        return sprint;
      });
      
      // Update task
      const updatedTasks = tasks.map(t => {
        if (t.id === taskId) {
          const newSprint = sprints.find(s => s.id === newSprintId);
          const newActivity = {
            action: "changed_sprint",
            user: currentUser.name,
            time: new Date().toLocaleString('vi-VN'),
            details: newSprintId ? 
              `Chuyển sang sprint: ${newSprint?.name}` :
              'Bỏ gán sprint'
          };
          
          return {
            ...t,
            sprintId: newSprintId,
            activities: [newActivity, ...t.activities]
          };
        }
        return t;
      });
      
      setSprints(updatedSprints);
      setTasks(updatedTasks);
      
      if (currentModalTaskId === taskId) {
        setModalTaskData(updatedTasks.find(t => t.id === taskId));
      }
      
      showNotification(
        newSprintId ? 
          `🏃‍♂️ Đã chuyển task sang ${sprints.find(s => s.id === newSprintId)?.name}` :
          '📋 Đã chuyển task vào backlog',
        "success"
      );
    }
  };

  const updateTaskStoryPoints = (taskId, newPoints) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const oldPoints = task.storyPoints;
        const newActivity = {
          action: "changed_points",
          user: currentUser.name,
          time: new Date().toLocaleString('vi-VN'),
          details: `Thay đổi story points từ ${oldPoints} sang ${newPoints}`
        };
        
        return {
          ...task,
          storyPoints: parseInt(newPoints) || 0,
          activities: [newActivity, ...task.activities]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    
    if (currentModalTaskId === taskId) {
      setModalTaskData(updatedTasks.find(t => t.id === taskId));
    }
    
    showNotification(`⭐ Đã thay đổi story points sang ${newPoints}`, "info");
  };

  const updateTaskDates = (taskId, startDate, dueDate) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    let changes = [];
    
    if (startDate !== task.startDate) {
      changes.push(`ngày bắt đầu từ ${formatDate(task.startDate)} sang ${formatDate(startDate)}`);
    }
    
    if (dueDate !== task.dueDate) {
      changes.push(`hạn chót từ ${formatDate(task.dueDate)} sang ${formatDate(dueDate)}`);
    }
    
    if (changes.length > 0) {
      const updatedTasks = tasks.map(t => {
        if (t.id === taskId) {
          const newActivity = {
            action: "changed_dates",
            user: currentUser.name,
            time: new Date().toLocaleString('vi-VN'),
            details: `Thay đổi ${changes.join(' và ')}`
          };
          
          return {
            ...t,
            startDate: startDate,
            dueDate: dueDate,
            activities: [newActivity, ...t.activities]
          };
        }
        return t;
      });
      
      setTasks(updatedTasks);
      
      if (currentModalTaskId === taskId) {
        setModalTaskData(updatedTasks.find(t => t.id === taskId));
      }
      
      showNotification("📅 Đã cập nhật ngày tháng", "info");
    }
  };

  const addComment = () => {
    if (!commentInput.trim()) {
      showNotification("Vui lòng nhập nội dung bình luận!", "error");
      return;
    }
    
    const updatedTasks = tasks.map(task => {
      if (task.id === currentModalTaskId) {
        const newComment = {
          user: currentUser.name,
          text: commentInput,
          time: new Date().toLocaleString('vi-VN')
        };
        
        const newActivity = {
          action: "commented",
          user: currentUser.name,
          time: new Date().toLocaleString('vi-VN'),
          details: `Thêm bình luận: ${commentInput.substring(0, 50)}${commentInput.length > 50 ? '...' : ''}`
        };
        
        return {
          ...task,
          comments: [...task.comments, newComment],
          activities: [newActivity, ...task.activities]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setModalTaskData(updatedTasks.find(t => t.id === currentModalTaskId));
    setCommentInput("");
    showNotification("💬 Đã thêm bình luận", "success");
  };

  const addSubTask = () => {
    if (!subtaskInput.trim()) {
      showNotification("Vui lòng nhập nội dung subtask!", "error");
      return;
    }
    
    const updatedTasks = tasks.map(task => {
      if (task.id === currentModalTaskId) {
        const newId = task.subTasks.length > 0 ? 
          Math.max(...task.subTasks.map(st => st.id)) + 1 : 1;
        
        const newSubTask = {
          id: newId,
          text: subtaskInput,
          completed: false
        };
        
        const newActivity = {
          action: "added_subtask",
          user: currentUser.name,
          time: new Date().toLocaleString('vi-VN'),
          details: `Thêm subtask: ${subtaskInput}`
        };
        
        return {
          ...task,
          subTasks: [...task.subTasks, newSubTask],
          activities: [newActivity, ...task.activities]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setModalTaskData(updatedTasks.find(t => t.id === currentModalTaskId));
    setSubtaskInput("");
    setShowAddSubtaskInput(false);
    showNotification("✅ Đã thêm subtask mới", "success");
  };

  const toggleSubTaskCompletion = (subTaskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === currentModalTaskId) {
        const updatedSubTasks = task.subTasks.map(subTask => {
          if (subTask.id === subTaskId) {
            const completed = !subTask.completed;
            const newActivity = {
              action: completed ? "completed_subtask" : "uncompleted_subtask",
              user: currentUser.name,
              time: new Date().toLocaleString('vi-VN'),
              details: `${completed ? 'Hoàn thành' : 'Bỏ hoàn thành'} subtask: ${subTask.text}`
            };
            
            task.activities.unshift(newActivity);
            return { ...subTask, completed };
          }
          return subTask;
        });
        
        return { ...task, subTasks: updatedSubTasks };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setModalTaskData(updatedTasks.find(t => t.id === currentModalTaskId));
  };

  const deleteSubTask = (subTaskId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa subtask này?")) return;
    
    const updatedTasks = tasks.map(task => {
      if (task.id === currentModalTaskId) {
        const subTaskToDelete = task.subTasks.find(st => st.id === subTaskId);
        if (!subTaskToDelete) return task;
        
        const updatedSubTasks = task.subTasks.filter(st => st.id !== subTaskId);
        const newActivity = {
          action: "deleted_subtask",
          user: currentUser.name,
          time: new Date().toLocaleString('vi-VN'),
          details: `Xóa subtask: ${subTaskToDelete.text}`
        };
        
        return {
          ...task,
          subTasks: updatedSubTasks,
          activities: [newActivity, ...task.activities]
        };
      }
      return task;
    });
    
    setTasks(updatedTasks);
    setModalTaskData(updatedTasks.find(t => t.id === currentModalTaskId));
    showNotification("🗑️ Đã xóa subtask", "warning");
  };

  const toggleTimeTracker = (taskId) => {
    if (currentTimer && currentTaskId === taskId) {
      stopTimer();
    } else {
      if (currentTimer) stopTimer();
      startTimer(taskId);
    }
  };

  const startTimer = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newTimer = {
      taskId,
      startTime: Date.now(),
      elapsed: 0,
      running: true
    };
    
    setCurrentTimer(newTimer);
    setCurrentTaskId(taskId);
    
    const interval = setInterval(() => {
      setCurrentTimer(prev => {
        if (!prev || !prev.running) return prev;
        
        const updatedTasks = tasks.map(t => {
          if (t.id === taskId) {
            return { ...t, timeLogged: t.timeLogged + 1/60 };
          }
          return t;
        });
        
        setTasks(updatedTasks);
        
        if (currentModalTaskId === taskId) {
          setModalTaskData(updatedTasks.find(t => t.id === taskId));
        }
        
        return {
          ...prev,
          elapsed: Date.now() - prev.startTime
        };
      });
    }, 1000);
    
    setTimerInterval(interval);
    showNotification(`⏱️ Bắt đầu theo dõi thời gian cho: ${task.title}`, "info");
  };

  const stopTimer = () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }
    
    setCurrentTimer(null);
    setCurrentTaskId(null);
    showNotification("⏹️ Đã dừng theo dõi thời gian", "info");
  };

  // ==================== BACKLOG FUNCTIONS ====================
  const addBacklogTask = () => {
    const newTaskId = `TASK-${String(tasks.length + 1).padStart(3, '0')}`;
    const newTask = {
      id: newTaskId,
      title: "Task backlog mới",
      description: "Mô tả task backlog. Nhấn vào để chỉnh sửa chi tiết.",
      status: "todo",
      priority: "medium",
      assignees: [],
      sprintId: null,
      storyPoints: 5,
      tags: ["backlog"],
      startDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      estimate: "4h",
      timeLogged: 0,
      subTasks: [],
      comments: [],
      activities: [{
        action: "created",
        user: currentUser.name,
        time: new Date().toLocaleString('vi-VN'),
        details: "Task được tạo trong backlog"
      }]
    };
    
    setTasks([...tasks, newTask]);
    showNotification(`✅ Đã thêm task ${newTaskId} vào backlog`, "success");
  };

  const assignToSprint = (taskId) => {
    const sprintOptions = sprints.map(s => `${s.id}. ${s.name}`).join('\n');
    const sprintId = prompt(`Chọn sprint cho task ${taskId}:\n\n${sprintOptions}\n\nNhập số ID sprint:`, currentSprintId);
    
    if (sprintId) {
      const selectedSprintId = parseInt(sprintId);
      const selectedSprint = sprints.find(s => s.id === selectedSprintId);
      
      if (selectedSprint) {
        updateTaskSprint(taskId, selectedSprintId);
      }
    }
  };

  // ==================== DRAG AND DROP FUNCTIONS ====================
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggingTask(taskId);
  };

  const handleDragOver = (e, status) => {
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
    if (taskId) {
      updateTaskStatus(taskId, newStatus);
    }
    
    setDraggingTask(null);
  };

  // ==================== CHAT FUNCTIONS ====================
  const sendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = {
      id: chatMessages.length + 1,
      userId: currentUser.id,
      text: chatInput,
      time: new Date().toLocaleString('vi-VN'),
      type: 'text'
    };
    
    setChatMessages([...chatMessages, newMessage]);
    setChatInput("");
    
    // Auto reply after 1-3 seconds
    setTimeout(sendAutoReply, 1000 + Math.random() * 2000);
  };

  const sendAutoReply = () => {
    const autoReplies = [
      "Đồng ý!",
      "Tôi sẽ xem xét.",
      "Có vẻ ổn đấy.",
      "Tôi cũng nghĩ vậy.",
      "Cần thêm thời gian để review.",
      "Đã hiểu, cảm ơn!"
    ];
    
    const onlineMembers = projectData.members.filter(m => m.online && m.id !== currentUser.id);
    if (onlineMembers.length === 0) return;
    
    const randomMember = onlineMembers[Math.floor(Math.random() * onlineMembers.length)];
    const randomReply = autoReplies[Math.floor(Math.random() * autoReplies.length)];
    
    const autoMessage = {
      id: chatMessages.length + 1,
      userId: randomMember.id,
      text: randomReply,
      time: new Date().toLocaleString('vi-VN'),
      type: 'text'
    };
    
    setChatMessages(prev => [...prev, autoMessage]);
  };

  // ==================== STATS CALCULATIONS ====================
  const calculateStats = () => {
    const totalTasks = tasks.length;
    const totalTime = tasks.reduce((sum, task) => sum + (task.timeLogged || 0), 0);
    const totalPoints = projectData.members.reduce((sum, member) => sum + member.points, 0);
    const sprintVelocity = sprints.find(s => s.id === currentSprintId)?.velocity || 0;
    
    return { totalTasks, totalTime, totalPoints, sprintVelocity };
  };

  const calculateProgress = () => {
    const sprintTasks = tasks.filter(t => t.sprintId === currentSprintId);
    const completedTasks = sprintTasks.filter(t => t.status === 'done').length;
    const totalTasks = sprintTasks.length;
    return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  };

  // ==================== RENDER FUNCTIONS ====================
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

  const renderTaskCard = (task) => {
    const assigneeAvatars = task.assignees.map(userId => {
      const user = projectData.members.find(m => m.id === userId);
      return (
        <div key={userId} className={cx('task-member')} title={user?.name || 'Unknown'}>
          {user?.initials || '?'}
        </div>
      );
    });
    
    const timeLogged = formatTime(task.timeLogged);
    const completedSubtasks = task.subTasks.filter(st => st.completed).length;
    const totalSubtasks = task.subTasks.length;
    
    return (
      <div 
        key={task.id}
        className={cx('task-card', `priority-${task.priority}`)}
        draggable
        onDragStart={(e) => handleDragStart(e, task.id)}
        onClick={() => openTaskModal(task.id)}
      >
        {task.storyPoints > 0 && (
          <div className={cx('story-points')}>
            {task.storyPoints} pts
          </div>
        )}
        <div className={cx('task-header')}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className={cx('task-id')}>{task.id}</div>
          </div>
          <div className={cx('task-actions')}>
            <FontAwesomeIcon icon={faEllipsisH} />
          </div>
        </div>
        <div className={cx('task-title')}>{task.title}</div>
        
        {task.subTasks && task.subTasks.length > 0 && (
          <div className={cx('task-subtasks')}>
            <div style={{ color: 'var(--text-light)', marginBottom: '5px' }}>
              <FontAwesomeIcon icon={faTasks} /> Subtasks ({completedSubtasks}/{totalSubtasks})
            </div>
            {task.subTasks.slice(0, 3).map(subtask => (
              <div key={subtask.id} className={cx('subtask-item-mini', { completed: subtask.completed })}>
                <input 
                  type="checkbox" 
                  className={cx('subtask-checkbox-mini')}
                  checked={subtask.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSubTaskCompletion(subtask.id);
                  }}
                />
                <div className={cx('subtask-text-mini', { completed: subtask.completed })}>
                  {subtask.text}
                </div>
              </div>
            ))}
            {task.subTasks.length > 3 && (
              <div style={{ color: 'var(--text-light)', textAlign: 'center' }}>
                +{task.subTasks.length - 3} more
              </div>
            )}
          </div>
        )}
        
        <div className={cx('task-meta')}>
          <div className={cx('task-members')}>
            {assigneeAvatars.length > 0 ? assigneeAvatars : (
              <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>Chưa gán</span>
            )}
          </div>
          <div className={cx('task-dates')}>
            <div className={cx('date-badge')} title="Hạn chót">
              <FontAwesomeIcon icon={faFlagIcon} />
              <span>{task.dueDate ? formatDate(task.dueDate) : 'No due date'}</span>
            </div>
          </div>
        </div>
        <div className={cx('task-timer')}>
          <button 
            className={cx('timer-toggle', { active: currentTaskId === task.id })}
            onClick={(e) => {
              e.stopPropagation();
              toggleTimeTracker(task.id);
            }}
          >
            <FontAwesomeIcon icon={currentTaskId === task.id ? faStop : faPlay} />
          </button>
          <div className={cx('time-logged')}>{timeLogged}</div>
        </div>
      </div>
    );
  };

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
            <button 
              className={cx('action-btn', 'btn-secondary')}
              onClick={(e) => {
                e.stopPropagation();
                assignToSprint(task.id);
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Gán sprint
            </button>
          </div>
        </div>
      );
    });
  };

  const renderLeaderboard = () => {
    const sortedMembers = [...projectData.members].sort((a, b) => b.points - a.points);
    
    return sortedMembers.map((member, index) => (
      <div key={member.id} className={cx('leaderboard-item')}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className={cx('rank')}>{index + 1}</div>
          <div className={cx('member-avatar')}>{member.initials}</div>
          <div>
            <div style={{ fontWeight: 'bold' }}>{member.name}</div>
            <div style={{ fontSize: 'var(--font-size-small)', color: 'var(--text-light)' }}>
              {member.role} • {member.online ? '🟢 Online' : '⚫ Offline'}
            </div>
          </div>
        </div>
        <div className={cx('points')}>{member.points} điểm</div>
      </div>
    ));
  };

  const renderChatMessages = () => {
    return chatMessages.map(message => {
      const user = projectData.members.find(m => m.id === message.userId);
      if (!user) return null;
      
      const isOwn = message.userId === currentUser.id;
      
      return (
        <div key={message.id} className={cx('message', { own: isOwn })}>
          <div className={cx('message-header')}>
            <div className={cx('message-sender')}>{user.name}</div>
            <div className={cx('message-time')}>{formatDateTime(message.time)}</div>
          </div>
          <div className={cx('message-content')}>{message.text}</div>
        </div>
      );
    });
  };

  const renderModalTaskDetails = () => {
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
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
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
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>
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
              <button 
                className={cx('action-btn', 'btn-primary')} 
                style={{ marginTop: '10px' }} 
                onClick={addComment}
              >
                <FontAwesomeIcon icon={faPaperPlane} /> Gửi
              </button>
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
                        <div key={userId} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', marginRight: '5px', padding: '3px 8px', background: 'var(--background)', borderRadius: '4px', fontSize: 'var(--font-size-small)' }}>
                          <div className={cx('task-member')} style={{ width: '30px', height: '30px', fontSize: 'var(--font-size-super-small)' }}>
                            {user.initials}
                          </div>
                          <span>{user.name}</span>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <span style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>Chưa gán</span>
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
                <div style={{ color: 'var(--text-light)', fontSize: '0.9rem', textAlign: 'center', padding: '10px' }}>
                  Chưa có hoạt động nào
                </div>
              )}
            </div>
          </div>
          
          <div className={cx('detail-section')}>
            <button 
              className={cx('action-btn', 'btn-primary')} 
              onClick={() => toggleTimeTracker(modalTaskData.id)}
            >
              <FontAwesomeIcon icon={currentTaskId === modalTaskData.id ? faStop : faPlay} /> 
              {currentTaskId === modalTaskData.id ? 'Dừng timer' : 'Bắt đầu timer'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ==================== EFFECTS ====================
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (taskModalOpen) closeTaskModal();
        if (sprintModalOpen) closeSprintModal();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [taskModalOpen, sprintModalOpen]);

  // ==================== STATS ====================
  const stats = calculateStats();
  const progress = calculateProgress();

  return (
    <div className={cx('project-container')}>
      {/* Notification */}
      {notification && (
        <div className={cx('notification', notification.type)}>
          {notification.message}
        </div>
      )}

      {/* Sidebar với Sprint Management */}
      <LeftNavbar headerName={projectData.name} iconHeader={<FontAwesomeIcon icon={faCodeBranch} />}
        listContent={
          <>
          <div className={cx('project-info')}>
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
          </div>

        <div className={cx('sidebar-nav')}>
          <div 
            className={cx('nav-item', { active: activeView === 'sprint-board' })}
            onClick={() => setActiveView('sprint-board')}
          >
            <FontAwesomeIcon icon={faColumns} />
            <span>Sprint Board</span>
          </div>
          <div 
            className={cx('nav-item', { active: activeView === 'sprint-backlog' })}
            onClick={() => setActiveView('sprint-backlog')}
          >
            <FontAwesomeIcon icon={faListCheck} />
            <span>Backlog</span>
          </div>
          <div 
            className={cx('nav-item', { active: activeView === 'leaderboard' })}
            onClick={() => setActiveView('leaderboard')}
          >
            <FontAwesomeIcon icon={faTrophy} />
            <span>Leaderboard</span>
          </div>
          <div 
            className={cx('nav-item', { active: activeView === 'group-chat' })}
            onClick={() => setActiveView('group-chat')}
          >
            <FontAwesomeIcon icon={faComments} />
            <span>Group Chat</span>
          </div>
        </div>

        {/* Sprint Sidebar Section */}
        <div className={cx('sprint-sidebar')}>
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
        </div>
          </>
        }
      />

      

      {/* Main Content với Sprint Management */}
      <div className='grid wide'>
        <div className={cx('main-content')}>
          {/* Header với Sprint Selector */}
          <div className={cx('main-header')}>
            <div className={cx('sprint-selector')}>
              {renderCurrentSprint()}
              
              <div className={cx('view-toggle')}>
                <button 
                  className={cx('view-btn', { active: activeView === 'sprint-board' })}
                  onClick={() => setActiveView('sprint-board')}
                >
                  <FontAwesomeIcon icon={faColumns} /> Board
                </button>
                <button 
                  className={cx('view-btn', { active: activeView === 'sprint-backlog' })}
                  onClick={() => setActiveView('sprint-backlog')}
                >
                  <FontAwesomeIcon icon={faListCheck} /> Backlog
                </button>
                <button 
                  className={cx('view-btn', { active: activeView === 'leaderboard' })}
                  onClick={() => setActiveView('leaderboard')}
                >
                  <FontAwesomeIcon icon={faTrophy} /> Leaderboard
                </button>
                <button 
                  className={cx('view-btn', { active: activeView === 'group-chat' })}
                  onClick={() => setActiveView('group-chat')}
                >
                  <FontAwesomeIcon icon={faComments} /> Chat
                </button>
              </div>
            </div>
            
            <div className={cx('header-actions')}>
              <button className={cx('action-btn', 'btn-sprint')} onClick={openSprintModal}>
                <FontAwesomeIcon icon={faPlus} /> Sprint mới
              </button>
              <button className={cx('action-btn', 'btn-primary')} onClick={createNewTask}>
                <FontAwesomeIcon icon={faPlus} /> Task mới
              </button>
            </div>
          </div>

          {/* Stats với Sprint Metrics */}
          <div className={cx('stats-grid')}>
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
          </div>

          {/* Sprint Board View */}
          <div className={cx('view-container', { active: activeView === 'sprint-board' })}>
            <div className={cx('sprint-management')}>
              <div className={cx('sprint-header')}>
                <h2><FontAwesomeIcon icon={faColumns} /> Sprint Board</h2>
                <div className={cx('sprint-actions')}>
                  <button className={cx('action-btn', 'btn-sprint')} onClick={completeSprint}>
                    <FontAwesomeIcon icon={faFlagCheckered} /> Hoàn thành Sprint
                  </button>
                </div>
              </div>
              
              <div className={cx('sprint-tabs')}>
                {sprints.map(sprint => {
                  const sprintTasks = tasks.filter(t => t.sprintId === sprint.id);
                  const completedTasks = sprintTasks.filter(t => t.status === 'done').length;
                  
                  return (
                    <button 
                      key={sprint.id}
                      className={cx('sprint-tab', { active: sprint.id === currentSprintId })}
                      onClick={() => switchSprint(sprint.id)}
                    >
                      {sprint.status === 'completed' && (
                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'var(--secondary)', marginRight: '5px' }} />
                      )}
                      {sprint.status === 'active' && (
                        <FontAwesomeIcon icon={faBolt} style={{ color: 'var(--warning)', marginRight: '5px' }} />
                      )}
                      {sprint.status === 'planned' && (
                        <FontAwesomeIcon icon={faClock} style={{ color: 'var(--text-light)', marginRight: '5px' }} />
                      )}
                      {sprint.name}
                      <span style={{ marginLeft: '8px', fontSize: 'var(--font-size-small)', background: 'var(--background)', padding: '2px 6px', borderRadius: '10px' }}>
                        {completedTasks}/{sprintTasks.length}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              {renderSprintBoard()}
            </div>
          </div>

          {/* Sprint Backlog View */}
          <div className={cx('view-container', { active: activeView === 'sprint-backlog' })}>
            <div className={cx('backlog-container')}>
              <div className={cx('backlog-header')}>
                <h2><FontAwesomeIcon icon={faListCheck} /> Product Backlog</h2>
                <div className={cx('backlog-actions')}>
                  <button className={cx('action-btn', 'btn-primary')} onClick={addBacklogTask}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm task
                  </button>
                </div>
              </div>
              
              <div className={cx('backlog-tasks')}>
                {renderBacklogTasks()}
              </div>
            </div>
          </div>

          {/* Leaderboard View */}
          <div className={cx('view-container', { active: activeView === 'leaderboard' })}>
            <div className={cx('leaderboard')}>
              <h2><FontAwesomeIcon icon={faTrophy} /> Bảng xếp hạng thành viên</h2>
              <div id="leaderboardList">
                {renderLeaderboard()}
              </div>
            </div>
          </div>

          {/* Group Chat View */}
          <div className={cx('view-container', { active: activeView === 'group-chat' })}>
            <div className={cx('chat-container')}>
              <div className={cx('chat-header')}>
                <h2><FontAwesomeIcon icon={faComments} /> Group Chat</h2>
                <div className={cx('chat-info')}>
                  <span id="onlineCount">{projectData.members.filter(m => m.online).length}</span> thành viên online
                </div>
              </div>
              <div className={cx('chat-messages')} id="chatMessages">
                {renderChatMessages()}
              </div>
              <div className={cx('chat-input')}>
                <textarea 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Nhập tin nhắn..." 
                  rows="1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <button className={cx('action-btn', 'btn-primary')} onClick={sendMessage}>
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sprint Modal */}
      {sprintModalOpen && (
        <div className={cx('modal-overlay', 'active')} onClick={closeSprintModal}>
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
        </div>
      )}

      {/* Task Modal */}
      {taskModalOpen && (
        <div className={cx('modal-overlay', 'active')} onClick={closeTaskModal}>
          <div className={cx('task-modal')} onClick={(e) => e.stopPropagation()}>
            <div className={cx('modal-header')}>
              <h2 id="modalTaskTitle">{modalTaskData?.id}: {modalTaskData?.title}</h2>
              <button className={cx('action-btn', 'btn-secondary')} onClick={closeTaskModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>
            <div className={cx('modal-body')}>
              {renderModalTaskDetails()}
            </div>
          </div>
        </div>
      )}
      
    </div>
  );
}

export default ProjectManagement;