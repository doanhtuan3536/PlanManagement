// import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import TodoItem from './TodoItem';

const cx = classNames.bind(styles);

function TodoList({
    filteredTodos,
    searchTerm,
    currentFilter,
    
    editTodo,
    deleteTodo,
    toggleTodoCompletion,
}) {
    
    return (
        <div className={cx('todo-list')}>
            {filteredTodos.length === 0 ? (
                <div className={cx('empty-state')}>
                    <FontAwesomeIcon icon={faClipboardList} />
                    <p>
                        {searchTerm
                            ? 'No matching tasks found'
                            : currentFilter === 'active'
                              ? 'No active tasks'
                              : currentFilter === 'completed'
                                ? 'No completed tasks'
                                : currentFilter === 'overdue'
                                  ? 'No overdue tasks'
                                  : currentFilter === 'urgent'
                                    ? 'No urgent tasks'
                                    : 'No tasks in this list'}
                    </p>
                    <p className={cx('hint')}>
                        {searchTerm
                            ? 'Try searching with different keywords'
                            : 'Add your first task by typing in the field above'}
                    </p>
                </div>
            ) : (
                filteredTodos.map((todo) => {

                    return (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            // deadlineInfo={deadlineInfo}
                            toggleTodoCompletion={toggleTodoCompletion}
                            editTodo={editTodo}
                            deleteTodo={deleteTodo}
                        />
                    );
                })
            )}
        </div>
    );
}

export default TodoList;
