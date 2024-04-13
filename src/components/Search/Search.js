import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef } from 'react';

import styles from './Search.module.scss';
const options = [
    { value: 'TodoList', label: 'TodoList' },
    { value: 'Project', label: 'Project' },
];
const cx = classNames.bind(styles);
function Search({ placeholderInput }) {
    const [isLoading, setIsLoading] = useState(false);
    // const [isError, setIsError] = useState(false);
    const [InputValue, setInputValue] = useState('');
    const inputElement = useRef();
    const hasInput = InputValue.length > 0;
    function HandleClearInput() {
        setInputValue('');
        inputElement.current.focus();
    }
    return (
        <div className={cx('wrapper')}>
            <label className={cx('search-icon-wrapper')} htmlFor={`input-search-${placeholderInput}`}>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('seach-icon', 'icon')} />
            </label>
            <input
                ref={inputElement}
                id={`input-search-${placeholderInput}`}
                value={InputValue}
                onChange={(e) => {
                    setInputValue(e.target.value);
                }}
                placeholder={placeholderInput}
                type="text"
                className={cx('input')}
            />
            {isLoading && <FontAwesomeIcon icon={faSpinner} className={cx('spinner-icon', 'icon')} />}
            {hasInput && (
                <FontAwesomeIcon icon={faCircleXmark} className={cx('x-icon', 'icon')} onClick={HandleClearInput} />
            )}
        </div>
    );
}

export default Search;
