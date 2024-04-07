import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);
function Button({ primary, to, href, children, className }) {
    var Comp = 'button';
    if (to) {
        Comp = Link;
    }
    if (href) {
        Comp = 'a';
    }
    const props = {
        to,
    };
    const cls = cx('wrapper', {
        primary,
        [className]: className,
    });
    return (
        <Comp className={cls} {...props}>
            {children}
        </Comp>
    );
}

export default Button;
