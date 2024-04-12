import classNames from 'classnames/bind';

import styles from './LinkProjectDropDown.module.scss';
import Image from '~/components/Image';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function LinkProjectDropDown({ dataItem, className, to }) {
    if (!dataItem.type) {
        return (
            <Link className={cx('wrapper', className)} to={dataItem.to}>
                {dataItem.name}
            </Link>
        );
    }
    return (
        <Link to={to} className={cx('wrapper', className)}>
            <Image className={cx('Link-img')} src={images.DefaultImageProjectLink} />
            <span className={cx('Link-name')}>{dataItem.name}</span>
            <span className={cx('Link-type')}>{dataItem.type}</span>
        </Link>
    );
}

export default LinkProjectDropDown;
