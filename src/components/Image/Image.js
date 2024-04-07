import { useState } from 'react';
import classNames from 'classnames';

import images from '~/assets/images';

import styles from './Image.module.scss';

const cx = classNames.bind(styles);

function Image({ src, alt, className, fallback: customFallback = images.noImage500500, ...props }) {
    const [fallback, setFallback] = useState('');
    function HandleError() {
        setFallback(customFallback);
    }
    return <img className={cx(className)} src={fallback || src} alt={alt} {...props} onError={HandleError} />;
}

export default Image;
