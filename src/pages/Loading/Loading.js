import classNames from 'classnames/bind';

import styles from './Loading.module.scss';
const cx = classNames.bind(styles);
function Loading() {
    return <div className={cx("wrapper")}>
            <div className= {cx("loading")}>
                <div className={cx("spinner")} role="status" aria-label="loading"></div>
                <h1>loading</h1>
                <p>please wait</p>
            </div>
        </div>;
}

export default Loading;
