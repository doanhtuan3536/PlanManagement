import classNames from 'classnames/bind';
import {useState} from 'react'
// import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,
faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button'

import styles from './Pagination.module.scss';

const cx = classNames.bind(styles);

function Pagination({totalPages, currentPage, setPage}) {

    if (totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return <div className={cx('pagination-wrapper')}>
                <Button
                    actionBtn
                    normalHover
                    className={cx('page-btn')}
                    onClick={() => currentPage > 1 && setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <div className={cx("pages")}>

                
                <Button
                    actionBtn
                    normalHover = {1 !== currentPage}
                    primary = {1 === currentPage}
                    className={cx('page-btn')}
                    onClick={() => setPage(1)}
                >
                    {1}
                </Button>

                <Button
                    actionBtn
                    normalHover = {2 !== currentPage}
                    primary = {2 === currentPage}
                    className={cx('page-btn')}
                    onClick={() => setPage(2)}
                >
                    {2}
                </Button>

                {/* {pages.map(page => (
                    <Button
                        actionBtn
                        normalHover = {page !== currentPage}
                        primary = {page === currentPage}
                        key={page}
                        // className={cx('page-btn', { active: page === currentPage })}
                        onClick={() => setPage(page)}
                    >
                        {page}
                    </Button>
                ))} */}
                {
                    totalPages > 4  && currentPage > 3 && "...."
                }
                {currentPage > 2 && currentPage < totalPages && <Button
                    actionBtn
                    // normalHover = {totalPages !== currentPage}
                    primary
                    className={cx('page-btn')}
                    onClick={() => setPage(currentPage)}
                >
                    {currentPage}
                </Button>}
                {
                    totalPages > 4 && currentPage < totalPages - 1 && "...."
                }
                {totalPages > 2 && <Button
                    actionBtn
                    normalHover = {totalPages !== currentPage}
                    primary = {totalPages === currentPage}
                    className={cx('page-btn')}
                    onClick={() => setPage(totalPages)}
                >
                    {totalPages}
                </Button>}
                </div>

                <Button
                    actionBtn
                    normalHover
                    className={cx('page-btn')}
                    onClick={() => currentPage < totalPages && setPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {/* <FontAwesomeIcon icon={faChevronRight} /> */}
                    Next
                </Button>
            </div>;
}

export default Pagination;