// import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarTimes,
faCalendar,
faEdit,
faTrash,
faCheck,
} from '@fortawesome/free-solid-svg-icons';

import { formatDeadline, getPriorityText } from '~/utils';

const cx = classNames.bind(styles);

function TodoItem({todo, toggleTodoCompletion, editTodo, deleteTodo}){
    const deadlineInfo = formatDeadline(todo.deadline, todo.overdue, todo.dueSoon);
    return <div 
              className={cx('todo-item', {
                completed: todo.completed,
                overdue: todo.overdue,
                'due-soon': todo.dueSoon
              })}
            >
              <div className={cx('todo-checkbox')}>
                <input 
                  type="checkbox" 
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => toggleTodoCompletion(todo.id)}
                />
                <label htmlFor={`todo-${todo.id}`}>
                  {todo.completed && <FontAwesomeIcon icon={faCheck} />}
                </label>
              </div>
              <div className={cx('todo-content')}>
                <div className={cx('todo-text')}>{todo.text}</div>
                <div className={cx('todo-meta')}>
                  <span className={cx('priority-badge', `priority-${todo.priority}`)}>
                    {getPriorityText(todo.priority)}
                  </span>
                  <div className={cx('deadline-info', deadlineInfo.class)}>
                    <FontAwesomeIcon icon={todo.overdue ? faCalendarTimes : faCalendar} />
                    <span>{deadlineInfo.text}</span>
                  </div>
                </div>
              </div>
              <div className={cx('todo-actions')}>
                <button 
                  className={cx('edit-btn')}
                  onClick={() => editTodo(todo.id)}
                  title="Edit"
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button 
                  className={cx('delete-btn')}
                  onClick={() => deleteTodo(todo.id)}
                  title="Delete"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>;
}

export default TodoItem