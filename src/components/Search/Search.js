import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search({ placeholderInput }) {
    return (
        <div className={cx('wrapper')}>
            <label className={cx('search-icon-wrapper')} htmlFor={`input-search-${placeholderInput}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('seach-icon', 'icon')} />
            </label>
            <input
                id={`input-search-${placeholderInput}`}
                placeholder={placeholderInput}
                type="text"
                className={cx('input')}
            />
            <FontAwesomeIcon icon={faSpinner} className={cx('spinner-icon', 'icon')} />
            <FontAwesomeIcon icon={faCircleXmark} className={cx('x-icon', 'icon')} />
        </div>
    );
}

export default Search;
