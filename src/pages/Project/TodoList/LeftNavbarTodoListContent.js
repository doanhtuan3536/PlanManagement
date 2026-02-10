import styles from './TodoList.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faClipboardList,
} from '@fortawesome/free-solid-svg-icons';
import ToDoItemLeftNavBar from './components/ToDoItemLeftNavBar';

const cx = classNames.bind(styles);

function LeftNavbarTodoListContent({ todoLists, openListModal, handleClickTodoItemLeftNavBar, setContextMenu}){
    const handleContextMenu = (e, listId) => {
        e.preventDefault();
        e.stopPropagation();
        setContextMenu({
            show: true,
            listId,
            x: e.clientX,
            y: e.clientY,
        });
    };
    return <>
            <div className={cx('section-header')}>
                <h3 className={cx('section-title')}>My Lists</h3>
                <button className={cx('add-list-btn')} onClick={() => openListModal()} title="Add new list">
                    <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>

            <div className={cx('todo-lists-container')}>
                {todoLists.length === 0 ? (
                    <div className={cx('empty-lists')}>
                        <FontAwesomeIcon icon={faClipboardList} />
                        <p>No lists yet</p>
                        <p>Click + button to create a new list</p>
                    </div>
                ) : (
                    todoLists.map((list) => (
                        <ToDoItemLeftNavBar
                            key={list.id}
                            onClick={() => handleClickTodoItemLeftNavBar(list.id)}
                            onClickBtn={(e) => {
                                e.stopPropagation();
                                handleContextMenu(e, list.id);
                            }}
                            onContextMenu={(e) => {
                                handleContextMenu(e, list.id);
                            }}
                            data={list}
                        />
                    ))
                )}
            </div>
        </>
}

export default LeftNavbarTodoListContent