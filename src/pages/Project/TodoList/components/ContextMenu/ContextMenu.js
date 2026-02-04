import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ContextMenu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
function ContextMenu({openListModal, deleteTodoList, setContextMenu, contextMenu}) {
      // const [contextMenu, setContextMenu] = useState({ show: false, listId: null, x: 0, y: 0 });
      const contextMenuRef = useRef(null);
      useEffect(() => {
          const handleClickOutside = (event) => {
            if (contextMenuRef.current && !contextMenuRef.current.contains(event.target)) {
              setContextMenu({ ...contextMenu, show: false });
            }
          };
          document.addEventListener('mousedown', handleClickOutside);
          return () => document.removeEventListener('mousedown', handleClickOutside);
        }, [contextMenu]);
    
    return ( <div 
              ref={contextMenuRef}
              className={cx('context-menu', 'show')}
              style={{ top: contextMenu.y, left: contextMenu.x }}
            >
              <div 
                className={cx('context-menu-item')}
                onClick={() => {
                  openListModal(contextMenu.listId);
                  setContextMenu({ ...contextMenu, show: false });
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Rename</span>
              </div>
              <div 
                className={cx('context-menu-item')}
                onClick={() => {
                  openListModal(contextMenu.listId);
                  setContextMenu({ ...contextMenu, show: false });
                }}
              >
                <FontAwesomeIcon icon={faEdit} />
                <span>Change Color</span>
              </div>
              <div 
                className={cx('context-menu-item', 'delete')}
                onClick={() => {
                  deleteTodoList(contextMenu.listId);
                  setContextMenu({ ...contextMenu, show: false });
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
                <span>Delete List</span>
              </div>
            </div> );
}

export default ContextMenu;