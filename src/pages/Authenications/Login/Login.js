import styles from '../common.module.scss'
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { KeyRouteFullPath } from '~/utils';
import config from '~/config';
import authService from '~/services/AuthService';
import axiosInstance from '~/utils/AxiosConfig';
import Button from '~/components/Button';
import { useAuth } from '~/context/AuthContext';
import useNotification from '~/hooks/useNotification';
import { useNotificatonContext } from '~/context/NotificationContext';

const cx = classNames.bind(styles);

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: '',  // Changed from email to username
    password: ''
  });
  const {showNotification} = useNotificatonContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";
  // useEffect(() => {
  //   // navigate(-1);
  //   if (isAuthenticated) {
  //     navigate(from, { replace: true });
  //   }
  // }, [isAuthenticated, from])
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'loginEmail') {
      setFormData({ ...formData, username: value });  // Changed to username
    } else if (id === 'loginPassword') {
      setFormData({ ...formData, password: value });
    }
    // Clear error when user types
    if (error) setError('');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    const passwordInput = document.getElementById('loginPassword');
    if (passwordInput) {
      passwordInput.type = showPassword ? 'password' : 'text';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {  // Changed from email to username
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await login(formData.username, formData.password);  // Changed from email to username
      
      if (result.success) {
        // Login successful
        showNotification("Login successfully", "success")
        navigate('/home');
      } else {
        setError(result.error + ". Try again" || 'Đăng nhập thất bại');
      }
    } catch (error) {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx("login-container")}>
        <div className={cx("logo")}>
          <FontAwesomeIcon icon={faProjectDiagram} />
          {/* <h1>Tuan</h1> */}
        </div>

        <div className={cx("form-container", "active")} id="loginForm">
          <h2 className={cx("form-title")}>Login</h2>

          <div className={cx("alert", {
            display: error
          })} id="loginAlert">
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </div>

          <form id="loginFormElement" onSubmit={handleSubmit}>
            <div className={cx("form-group")}>
              <input
                type="text"
                className={cx("form-control")}
                id="loginEmail"
                placeholder="Email hoặc tên đăng nhập"
                required
                value={formData.username}  // Changed from email to username
                onChange={handleInputChange}
                disabled={loading}
              />
            </div>

            <div className={cx("form-group")}>
              <div className={cx("password-wrapper")}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={cx("form-control")}
                  id="loginPassword"
                  placeholder="Mật khẩu"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={loading}
                />
                <button
                  type="button"
                  className={cx("toggle-password")}
                  id="toggleLoginPassword"
                  onClick={togglePasswordVisibility}
                >
                  <i className={cx(showPassword ? "far fa-eye-slash" : "far fa-eye")}></i>
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
                <input type="checkbox" id="rememberMe" disabled={loading} />
                Remember me
              </label>
              <a
                href="#"
                id="forgotPasswordLink"
                style={{
                  color: "var(--primary-color)",
                  textDecoration: "none",
                }}
                onClick={(e) => {
                  e.preventDefault();
                  // Handle forgot password
                  document.getElementById('loginForm').classList.remove('active');
                  document.getElementById('forgotPasswordForm').classList.add('active');
                }}
              >
                Forget password ?
              </a>
            </div>

            <Button
              primary
              width100
              actionBtn
              type="submit"
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Login'}
            </Button>
          </form>

          <div className={cx("divider")}>
            <span>Or login with</span>
          </div>

          <Button
            className={cx('btn-facebook')}
            width100
            actionBtn
            leftIcon={<FontAwesomeIcon icon={faFacebookF} />}
            disabled={loading}
          >
            Facebook
          </Button>
          <Button
            primary
            width100
            actionBtn
            leftIcon={<FontAwesomeIcon icon={faGoogle} />}
            disabled={loading}
          >
            Google
          </Button>

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
          </form>

          <div className={cx('form-switch')}>
            <Link 
              className={cx('switch-link')} 
              id="backToLogin" 
              to={KeyRouteFullPath('login')}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('forgotPasswordForm').classList.remove('active');
                document.getElementById('loginForm').classList.add('active');
              }}
            >
              ← Quay lại đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;