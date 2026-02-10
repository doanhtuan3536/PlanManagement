import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoList.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTasks,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import LeftNavbar from '~/layouts/components/LeftNavbar';
// import ToDoItemLeftNavBar from './components/ToDoItemLeftNavBar';
import ListModal from '../ListModal';
import ContextMenu from './components/ContextMenu';
import TodoHeader from './TodoListMainContent/TodoHeader';
import TodoControl from './TodoListMainContent/TodoControl';
import TodoList from './TodoListMainContent/TodoList';
import TodoFooter from './TodoListMainContent/TodoFooter';
import TodoForm from './TodoListMainContent/TodoForm';
import TodoListMainContent from './TodoListMainContent/TodoListMainContent';
import Notification from '~/components/Notification';
import LeftNavbarTodoListContent from './LeftNavbarTodoListContent';
import useNotification from '~/hooks/useNotification';
import useLocalStorage from '~/hooks/useLocalStorage';

// const cx = classNames.bind(styles);

const DEFAULT_LISTS = [
                  {
                      id: 'default',
                      name: 'General Tasks',
                      color: '#4361ee',
                      active: true,
                      stats: { total: 0, pending: 0 },
                  },
                  {
                      id: 'personal',
                      name: 'Personal',
                      color: '#f72585',
                      active: false,
                      stats: { total: 0, pending: 0 },
                  },
                  { id: 'work', name: 'Work', color: '#4cc9f0', active: false, stats: { total: 0, pending: 0 } },
                  {
                      id: 'shopping',
                      name: 'Shopping',
                      color: '#38b000',
                      active: false,
                      stats: { total: 0, pending: 0 },
                  },
              ];

function TodoListContainer() {
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [todos, setTodos] = useLocalStorage('todos', []);
    const [todoLists, setTodoLists] = useLocalStorage('todoLists', DEFAULT_LISTS);
    const [darkMode, setDarkMode] = useLocalStorage('theme', false);
    const [currentListId, setCurrentListId] = useState('default');
    const [currentFilter, setCurrentFilter] = useState('all');
    const [currentSort, setCurrentSort] = useState('priority');
    const [todoInput, setTodoInput] = useState('');
    const [priority, setPriority] = useState('medium');
    const [deadline, setDeadline] = useState('');
    const [isEditingTodo, setIsEditingTodo] = useState(false);
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    // const [notification, setNotification] = useState({ show: false, message: '', type: 'danger' });
    const {notification, setNotification, showNotification} = useNotification();

    const [showListModal, setShowListModal] = useState(false);
    const [listModalData, setListModalData] = useState({ name: '', color: '#4361ee', isEditing: false });
    const [contextMenu, setContextMenu] = useState({ show: false, listId: null, x: 0, y: 0 });

    // Load theme from localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setDarkMode(true);
        }
    }, []);

    // Save todos and lists to localStorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        updateAllListStats();
    }, [todos]);

    useEffect(() => {
        localStorage.setItem('todoLists', JSON.stringify(todoLists));
    }, [todoLists]);

    // Update list statistics
    useEffect(() => {
        updateAllListStats();
    }, [todos, currentListId]);

    // Check for overdue todos
    // useEffect(() => {
    //   checkOverdueTodos();
    //   const interval = setInterval(checkDeadlineReminders, 60000);
    //   return () => clearInterval(interval);
    // }, [todos]);

    // Close sidebar when clicking outside on mobile
    // useEffect(() => {
    //   const handleClickOutsideMobile = (event) => {
    //     if (sidebarVisible && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
    //       setSidebarVisible(false);
    //     }
    //   };

    //   if (sidebarVisible) {
    //     document.addEventListener('mousedown', handleClickOutsideMobile);
    //     return () => document.removeEventListener('mousedown', handleClickOutsideMobile);
    //   }
    // }, [sidebarVisible]);

    // Apply dark mode to body
    // useEffect(() => {
    //   if (darkMode) {
    //     document.body.classList.add('dark-mode');
    //   } else {
    //     document.body.classList.remove('dark-mode');
    //   }
    // }, [darkMode]);

    const checkTodoStatus = (todo) => {
        if (!todo.deadline || todo.completed) {
            return { ...todo, overdue: false, dueSoon: false };
        }

        const deadlineDate = new Date(todo.deadline);
        const now = new Date();
        const timeDiff = deadlineDate.getTime() - now.getTime();
        const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        return {
            ...todo,
            overdue: dayDiff < 0,
            dueSoon: dayDiff >= 0 && dayDiff <= 1,
        };
    };

    const updateListStats = (listId) => {
        const listTodos = todos.filter((todo) => todo.listId === listId);
        return {
            total: listTodos.length,
            pending: listTodos.filter((todo) => !todo.completed).length,
        };
    };

    const updateAllListStats = () => {
        const updatedLists = todoLists.map((list) => ({
            ...list,
            stats: updateListStats(list.id),
        }));
        setTodoLists(updatedLists);
    };

    const checkOverdueTodos = () => {
        let hasOverdue = false;
        const updatedTodos = todos.map((todo) => {
            const checkedTodo = checkTodoStatus(todo);
            if (checkedTodo.overdue && !checkedTodo.completed) {
                hasOverdue = true;
            }
            return checkedTodo;
        });

        setTodos(updatedTodos);

        if (hasOverdue) {
            const overdueCount = updatedTodos.filter((todo) => todo.overdue && !todo.completed).length;
            showNotification(`You have <strong>${overdueCount}</strong> overdue tasks!`, 'danger');
        }
    };

    const checkDeadlineReminders = () => {
        const now = new Date();
        const dueSoonTodos = todos.filter((todo) => {
            if (!todo.deadline || todo.completed || todo.overdue) return false;
            const deadlineDate = new Date(todo.deadline);
            const timeDiff = deadlineDate.getTime() - now.getTime();
            const hourDiff = Math.ceil(timeDiff / (1000 * 3600));
            return hourDiff > 0 && hourDiff <= 3;
        });

        if (dueSoonTodos.length > 0 && !notification.show) {
            showNotification(`You have <strong>${dueSoonTodos.length}</strong> tasks due soon!`, 'warning');
        }
    };

    // Todo Operations
    const addOrUpdateTodo = () => {
        if (!todoInput.trim()) {
            showNotification('Please enter task content', 'warning');
            return;
        }

        if (isEditingTodo) {
            // Update existing todo
            const updatedTodos = todos.map((todo) =>
                todo.id === editingTodoId
                    ? checkTodoStatus({
                          ...todo,
                          text: todoInput,
                          priority,
                          deadline: deadline || null,
                          listId: currentListId,
                      })
                    : todo,
            );
            setTodos(updatedTodos);
            setIsEditingTodo(false);
            setEditingTodoId(null);
        } else {
            // Add new todo
            const newTodo = checkTodoStatus({
                id: Date.now(),
                text: todoInput,
                priority,
                deadline: deadline || null,
                listId: currentListId,
                completed: false,
                createdAt: new Date().toISOString(),
                overdue: false,
                dueSoon: false,
            });

            setTodos([newTodo, ...todos]);
        }

        // Reset form
        setTodoInput('');
        setPriority('medium');
        setDeadline('');
    };

    const toggleTodoCompletion = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? checkTodoStatus({ ...todo, completed: !todo.completed }) : todo,
        );
        setTodos(updatedTodos);
    };

    const editTodo = (id) => {
        const todo = todos.find((todo) => todo.id === id);
        if (todo) {
            setTodoInput(todo.text);
            setPriority(todo.priority);
            setDeadline(todo.deadline || '');
            setIsEditingTodo(true);
            setEditingTodoId(id);
        }
    };

    const deleteTodo = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            setTodos(todos.filter((todo) => todo.id !== id));
            showNotification('Task deleted successfully', 'success');
        }
    };

    // List Operations
    const openListModal = (listId = null) => {
        if (listId) {
            const list = todoLists.find((l) => l.id === listId);
            if (list) {
                setListModalData({
                    name: list.name,
                    color: list.color,
                    isEditing: true,
                    listId,
                });
            }
        } else {
            setListModalData({
                name: '',
                color: '#4361ee',
                isEditing: false,
                listId: null,
            });
        }
        setShowListModal(true);
    };

    const saveList = () => {
        if (!listModalData.name.trim()) {
            showNotification('Please enter list name', 'warning');
            return;
        }

        if (listModalData.isEditing) {
            // Update existing list
            const updatedLists = todoLists.map((list) =>
                list.id === listModalData.listId
                    ? { ...list, name: listModalData.name, color: listModalData.color }
                    : list,
            );
            setTodoLists(updatedLists);
            showNotification('List updated successfully', 'success');
        } else {
            // Add new list
            const newList = {
                id: 'list-' + Date.now(),
                name: listModalData.name,
                color: listModalData.color,
                active: false,
                stats: { total: 0, pending: 0 },
            };

            setTodoLists([...todoLists, newList]);
            showNotification('New list created successfully', 'success');
        }

        setShowListModal(false);
    };

    const deleteTodoList = (listId) => {
        if (listId === 'default') {
            showNotification('Cannot delete default list', 'warning');
            return;
        }

        if (window.confirm('Are you sure you want to delete this list? All tasks in this list will be deleted.')) {
            // Remove list
            const updatedLists = todoLists.filter((list) => list.id !== listId);
            setTodoLists(updatedLists);

            // Remove todos in this list
            setTodos(todos.filter((todo) => todo.listId !== listId));

            // If current list is being deleted, switch to default
            if (currentListId === listId) {
                setCurrentListId('default');
            }

            showNotification('List deleted successfully', 'success');
        }
    };

    const switchList = (listId) => {
        setCurrentListId(listId);
        // Update active state
        const updatedLists = todoLists.map((list) => ({
            ...list,
            active: list.id === listId,
        }));
        setTodoLists(updatedLists);
    };

    // Filter and sort todos
    const getFilteredAndSortedTodos = () => {
        let filteredTodos = todos.filter((todo) => {
            if (todo.listId !== currentListId) return false;
            if (searchTerm && !todo.text.toLowerCase().includes(searchTerm.toLowerCase())) return false;

            switch (currentFilter) {
                case 'active':
                    return !todo.completed;
                case 'completed':
                    return todo.completed;
                case 'overdue':
                    return todo.overdue && !todo.completed;
                case 'urgent':
                    return todo.priority === 'urgent' && !todo.completed;
                default:
                    return true;
            }
        });

        filteredTodos.sort((a, b) => {
            switch (currentSort) {
                case 'priority':
                    const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
                    return priorityOrder[a.priority] - priorityOrder[b.priority];
                case 'deadline':
                    if (!a.deadline && !b.deadline) return 0;
                    if (!a.deadline) return 1;
                    if (!b.deadline) return -1;
                    return new Date(a.deadline) - new Date(b.deadline);
                case 'created':
                    return new Date(b.createdAt) - new Date(a.createdAt);
                case 'oldest':
                    return new Date(a.createdAt) - new Date(b.createdAt);
                default:
                    return 0;
            }
        });

        return filteredTodos;
    };

    // Calculate statistics
    const getCurrentListStats = () => {
        const listTodos = todos.filter((todo) => todo.listId === currentListId);
        return {
            total: listTodos.length,
            pending: listTodos.filter((todo) => !todo.completed).length,
            overdue: listTodos.filter((todo) => todo.overdue && !todo.completed).length,
            urgent: listTodos.filter((todo) => todo.priority === 'urgent' && !todo.completed).length,
        };
    };

    const currentList = todoLists.find((list) => list.id === currentListId);
    const filteredTodos = getFilteredAndSortedTodos();
    const stats = getCurrentListStats();

    // Handle key press for todo input
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addOrUpdateTodo();
        }
    };
    // Toggle mobile sidebar
    const toggleMobileSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    function handleClickTodoItemLeftNavBar(id) {
        switchList(id);
        if (window.innerWidth <= 768) {
            setSidebarVisible(false);
        }
    }

    return (
        <>
            {/* Sidebar Navigation */}

            <LeftNavbar
                headerName={'Task manager'}
                iconHeader={<FontAwesomeIcon icon={faTasks} />}
                listContent={
                    <LeftNavbarTodoListContent todoLists={todoLists} openListModal={openListModal} 
                    handleClickTodoItemLeftNavBar={handleClickTodoItemLeftNavBar} setContextMenu = {setContextMenu} />
                }
            />

            {/* Context Menu */}
            {contextMenu.show && (
                <ContextMenu
                    openListModal={openListModal}
                    deleteTodoList={deleteTodoList}
                    setContextMenu={setContextMenu}
                    contextMenu={contextMenu}
                />
            )}

            {/* Main Content */}
            <TodoListMainContent currentList={currentList} searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
            darkMode={darkMode} setDarkMode={setDarkMode} toggleMobileSidebar={toggleMobileSidebar}>
              <TodoHeader stats={stats} currentList={currentList} />

              <TodoForm
                  todoInput={todoInput}
                  setTodoInput={setTodoInput}
                  priority={priority}
                  setPriority={setPriority}
                  deadline={deadline}
                  setDeadline={setDeadline}
                  handleKeyPress={handleKeyPress}
                  addOrUpdateTodo={addOrUpdateTodo}
                  isEditingTodo={isEditingTodo}
              />
              <TodoControl
                  currentFilter={currentFilter}
                  currentSort={currentSort}
                  setCurrentFilter={setCurrentFilter}
                  setCurrentSort={setCurrentSort}
              />

              <TodoList
                  filteredTodos={filteredTodos}
                  searchTerm={searchTerm}
                  currentFilter={currentFilter}
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                  toggleTodoCompletion={toggleTodoCompletion}
              />

              <TodoFooter />
            </TodoListMainContent>

            {/* Notification */}
            {notification.show && (
                <Notification notification = {notification} />
            )}

            {/* List Modal */}
            {showListModal && (
                <ListModal
                    setListModalData={setListModalData}
                    setShowListModal={setShowListModal}
                    listModalData={listModalData}
                    onClickBtnSaveList={saveList}
                />
            )}
        </>
    );
}

export default TodoListContainer;
