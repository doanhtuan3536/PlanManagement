import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './UserSection.module.scss';

const cx = classNames.bind(styles);
function UserSection() {
    return ( <div className={cx('user-section')}>
            <div className={cx('user-info')}>
              <div className={cx('user-avatar')}>JD</div>
              <div className={cx('user-details')}>
                <div className={cx('user-name')}>John Doe</div>
                <div className={cx('user-role')}>Project Manager</div>
                <div className={cx('user-status')}>
                  <span className={cx('status-dot')} />
                  <span>Active now</span>
                </div>
              </div>
            </div>
          </div> );
}

export default UserSection;