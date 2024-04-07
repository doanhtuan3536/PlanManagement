import classNames from 'classnames';

import styles from './Home.module.scss';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('wrapper')}>
            <div className="grid wide">home</div>
        </div>
    );
}

export default Home;
