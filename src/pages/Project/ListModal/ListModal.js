import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './ListModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTasks,
  faChevronLeft,
  faChevronRight,
  faPlus,
  faCog,
  faTags,
  faBell,
  faQuestionCircle,
  faBars,
  faSearch,
  faMoon,
  faSun,
  faClipboardList,
  faEdit,
  faTrash,
  faEllipsisH,
  faExclamationTriangle,
  faCalendar,
  faCalendarTimes,
  faClock,
  faCheck,
  faSave,
  faExclamationCircle,
  faTimes,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function ListModal({showListModal, setListModalData, setShowListModal, listModalData, onClickBtnSaveList}) {
    return <Modal conditionOpen = {showListModal} onClickModalOverlay={setShowListModal} header={
      <>
        <h3>{listModalData.isEditing ? 'Edit List' : 'Create New List'}</h3>
        <button 
          className={cx('close-modal')}
          onClick={() => setShowListModal(false)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </>
    }
      footer={
        <>
          <button 
            className={cx('btn', 'btn-secondary')}
            onClick={() => setShowListModal(false)}
          >
            Cancel
          </button>
          <button 
            className={cx('btn', 'btn-primary')}
            onClick={onClickBtnSaveList}
          >
            {listModalData.isEditing ? 'Update' : 'Create List'}
          </button>
        </>
      }
    >
        <>
            <div className={cx('form-group')}>
                    <label htmlFor="listName">List Name</label>
                    <input 
                      type="text" 
                      id="listName" 
                      className={cx('todo-input')} 
                      placeholder="Enter list name..."
                      value={listModalData.name}
                      onChange={(e) => setListModalData({...listModalData, name: e.target.value})}
                    />
            </div>
            <div className={cx('form-group')}>
              <label>Color</label>
              <div className={cx('color-picker')}>
                {['#4361ee', '#f72585', '#4cc9f0', '#38b000', '#ffaa00', '#9d4edd', '#ff6d00', '#00bbf9'].map(color => (
                  <div 
                    key={color}
                    className={cx('color-option', { selected: listModalData.color === color })}
                    style={{ backgroundColor: color }}
                    onClick={() => setListModalData({...listModalData, color})}
                  />
                ))}
              </div>
            </div>
        </>
    </Modal>
}

export default ListModal;