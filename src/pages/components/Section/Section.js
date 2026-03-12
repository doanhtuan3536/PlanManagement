import classNames from 'classnames/bind';
import {useState} from 'react'
// import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft,
faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Button from '~/components/Button'

import styles from './Section.module.scss';

const cx = classNames.bind(styles);

function Section({children, header, hover = false, className}) {

    const classes = cx('wrapper', {
        hover,
        [className] : className
    });

    return <div className={classes}>
        <div className={cx("header")}>
            {header}
        </div>
        <div className={cx("content")}>
            {children}
        </div>
    </div>;
}

export default Section;