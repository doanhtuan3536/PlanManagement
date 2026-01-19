import styles from '../common.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faEye } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { KeyRouteFullPath } from '~/utils';

const cx = classNames.bind(styles);

function Signup() {
  return (
    <div className={cx('wrapper')}>
    <div className={cx('signup-container')}>
      {/* Logo */}
      <div className={cx('logo')}>
        {/* <i className={cx('fas', 'fa-project-diagram')}></i> */}
        <FontAwesomeIcon icon={faProjectDiagram} />
        <h1>Tuan</h1>
      </div>

      {/* Register Form */}
      <div className={cx('form-container', 'active')} id="registerForm">
        <h2 className={cx('form-title')}>Signup</h2>

        <div className={cx('alert')} id="registerAlert"></div>

        <form id="registerFormElement">
          <div className={cx('form-group')}>
            <input
              type="text"
              className={cx('form-control')}
              id="registerName"
              placeholder="Fullname"
              required
            />
          </div>

          <div className={cx('form-group')}>
            <input
              type="email"
              className={cx('form-control')}
              id="registerEmail"
              placeholder="Email"
              required
            />
          </div>

          <div className={cx('form-group')}>
            <input
              type="text"
              className={cx('form-control')}
              id="registerUsername"
              placeholder="Username"
              required
            />
          </div>

          <div className={cx('form-group')}>
            <div className={cx('password-wrapper')}>
              <input
                type="password"
                className={cx('form-control')}
                id="registerPassword"
                placeholder="Password (at least 8 character)"
                required
              />
              <button
                type="button"
                className={cx('toggle-password')}
                id="toggleRegisterPassword"
              >
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          </div>

          <div className={cx('form-group')}>
            <input
              type="password"
              className={cx('form-control')}
              id="registerConfirmPassword"
              placeholder="Confirm password"
              required
            />
          </div>

          <button type="submit" className={cx('btn')} id="registerBtn">
            <span>Signup</span>
          </button>
        </form>

        <div className={cx('divider')}>
          <span>Or signup with</span>
        </div>

        <button className={cx('btn', 'btn-google')} id="googleRegisterBtn">
          <FontAwesomeIcon icon={faGoogle} />
          <span>Google</span>
        </button>

        <button
          className={cx('btn', 'btn-facebook')}
          id="facebookRegisterBtn"
          style={{ marginTop: '10px' }}
        >
          <FontAwesomeIcon icon={faFacebookF} />
          <span>Facebook</span>
        </button>

        {/* <div className={cx('terms')}>
          Bằng việc đăng ký, bạn đồng ý với{' '}
          <a href="#">Điều khoản dịch vụ</a> và{' '}
          <a href="#">Chính sách bảo mật</a>
        </div> */}

        <div className={cx('form-switch')}>
          <span>you have account? </span>
          <Link className={cx('switch-link')} id="showLogin" to={KeyRouteFullPath('login')}>
            Login
          </Link>
        </div>
      </div>

    </div>
    </div>
  );
}

export default Signup;
