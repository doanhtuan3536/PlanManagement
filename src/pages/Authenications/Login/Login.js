import styles from '../common.module.scss'
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { KeyRouteFullPath } from '~/utils';
import config from '~/config';


const cx = classNames.bind(styles)
function Login() {
  return (
    <div className={cx('wrapper')}>
    <div className={cx("login-container")}>
      <div className={cx("logo")}>
        <FontAwesomeIcon icon={faProjectDiagram} />
        <h1>Tuan</h1>
      </div>

      <div className={cx("form-container", "active")} id="loginForm">
        <h2 className={cx("form-title")}>Login</h2>

        <div className={cx("alert")} id="loginAlert"></div>

        <form id="loginFormElement">
          <div className={cx("form-group")}>
            <input
              type="text"
              className={cx("form-control")}
              id="loginEmail"
              placeholder="Email hoặc tên đăng nhập"
              required
            />
          </div>

          <div className={cx("form-group")}>
            <div className={cx("password-wrapper")}>
              <input
                type="password"
                className={cx("form-control")}
                id="loginPassword"
                placeholder="Mật khẩu"
                required
              />
              <button
                type="button"
                className={cx("toggle-password")}
                id="toggleLoginPassword"
              >
                <i className={cx("far fa-eye")}></i>
              </button>
            </div>
          </div>

          <div
            className={cx("form-group")}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <label style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <input type="checkbox" id="rememberMe" />
              Remember me
            </label>
            <a
              href="#"
              id="forgotPasswordLink"
              style={{
                color: "var(--primary-color)",
                textDecoration: "none",
              }}
            >
              Forget password ?
            </a>
          </div>

          <button type="submit" className={cx("btn")} id="loginBtn">
            <span>Login</span>
          </button>
        </form>

        <div className={cx("divider")}>
          <span>Or login with</span>
        </div>

        <button className={cx("btn", "btn-google")} id="googleLoginBtn">
            <FontAwesomeIcon icon={faGoogle} />
          <span>Google</span>
        </button>

        <button
          className={cx("btn", "btn-facebook")}
          id="facebookLoginBtn"
          style={{ marginTop: "10px" }}
        >

          <FontAwesomeIcon icon={faFacebookF} />
          <span>Facebook</span>
        </button>

        <div className={cx("form-switch")}>
          <span>No account? </span>
          <Link className={cx("switch-link")} id="showRegister" to={KeyRouteFullPath('signup')}>
            Sign up
          </Link>
        </div>
      </div>
      {/* Forgot Password Form */}
      <div className={cx('form-container')} id="forgotPasswordForm">
        <h2 className={cx('form-title')}>Quên Mật Khẩu</h2>

        <div className={cx('alert')} id="forgotAlert"></div>

        <form id="forgotPasswordFormElement">
          <div className={cx('form-group')}>
            <input
              type="email"
              className={cx('form-control')}
              id="forgotEmail"
              placeholder="Nhập email đã đăng ký"
              required
            />
          </div>

          <p
            style={{
              fontSize: '14px',
              color: 'var(--gray-color)',
              marginBottom: '20px',
              textAlign: 'center',
            }}
          >
            Chúng tôi sẽ gửi liên kết đặt lại mật khẩu đến email của bạn.
          </p>

          <button type="submit" className={cx('btn')} id="resetPasswordBtn">
            <span>Gửi yêu cầu</span>
          </button>
        </form>

        <div className={cx('form-switch')}>
          <Link className={cx('switch-link')} id="backToLogin" to={KeyRouteFullPath('login')}>
            ← Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}


export default Login;
