// import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './TodoListMainContent.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faSave, faPlus } from '@fortawesome/free-solid-svg-icons';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function TodoForm({
    todoInput,
    setTodoInput,
    priority,
    setPriority,
    deadline,
    setDeadline,
    handleKeyPress,
    addOrUpdateTodo,
    isEditingTodo,
}) {
    return (
        <div className={cx('todo-form')}>
            <div className={cx('form-row')}>
                <input
                    type="text"
                    className={cx('todo-input')}
                    placeholder="Add a new task..."
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <select
                    className={cx('priority-select')}
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                >
                    <option value="low">Priority: Low</option>
                    <option value="medium">Priority: Medium</option>
                    <option value="high">Priority: High</option>
                    <option value="urgent">Priority: Urgent</option>
                </select>
                <input
                    type="date"
                    className={cx('deadline-input')}
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                />
            </div>
            <Button
                className={cx('add-btn')}
                onClick={addOrUpdateTodo}
                leftIcon={<FontAwesomeIcon icon={isEditingTodo ? faSave : faPlus} />}
            >
                {isEditingTodo ? 'Save Changes' : 'Add Task'}
            </Button>
        </div>
    );
}

export default TodoForm;
