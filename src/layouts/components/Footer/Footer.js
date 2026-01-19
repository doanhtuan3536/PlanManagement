import classNames from 'classnames/bind';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faFacebookF, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faMap, faMapMarkedAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
const  cx = classNames.bind(styles)
function Footer() {
    return <footer>
        <div className = {cx("container")}>
            <div className = {cx("footer-content")}>
                <div className = {cx("footer-section")}>
                    <div className = {cx("footer-logo")}>
                        ProjectFlow
                    </div>
                    <p className = {cx("footer-description")}>
                        Simplify your workflow and manage projects efficiently with our all-in-one project management solution.
                    </p>
                    <div className = {cx("social-icons")}>
                        {/* <a href="#"><i className = {cx("fab fa-facebook-f")}></i></a> */}
                        <a href='#'>
                            <FontAwesomeIcon icon={faFacebookF}  />
                        </a>
                        
                        {/* <a href="#"><i className = {cx("fab fa-twitter")}></i></a>
                        <a href="#"><i className = {cx("fab fa-linkedin-in")}></i></a> */}
                        <a href="#">
                            <FontAwesomeIcon icon={faGithub}  />
                        </a>
                    </div>
                </div>

                <div className = {cx("footer-section")}>
                    <h3 className = {cx("footer-heading")}>Quick Links</h3>
                    <ul className = {cx("footer-links")}>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Tasks</a></li>
                        <li><a href="#">Calendar</a></li>
                        <li><a href="#">Reports</a></li>
                    </ul>
                </div>

                <div className = {cx("footer-section")}>
                    <h3 className = {cx("footer-heading")}>Resources</h3>
                    <ul className = {cx("footer-links")}>
                        <li><a href="#">Help Center</a></li>
                        <li><a href="#">Documentation</a></li>
                        <li><a href="#">Community</a></li>
                        <li><a href="#">Tutorials</a></li>
                        <li><a href="#">API</a></li>
                    </ul>
                </div>

                <div className = {cx("footer-section")}>
                    <h3 className = {cx("footer-heading")}>Contact Us</h3>
                    <div className = {cx("footer-contact")}>
                        <p> <FontAwesomeIcon icon={faEnvelope} /> doanhtuan3536@gmail.com</p>
                        <p><FontAwesomeIcon icon={faPhone} />081313xxxx</p>
                        <p> <FontAwesomeIcon icon={faMapMarkedAlt} /> L8 đường số 32 P6 Q4 TPHCM</p>
                    </div>
                </div>
            </div>

            <div className = {cx("footer-bottom")}>
                <p>&copy; 2025 ProjectFlow. All rights reserved. | <a href="#" style={{color: 'a0aec0'}}>Privacy Policy</a> | <a href="#" style={{color: 'a0aec0'}}>Terms of Service</a></p>
            </div>
        </div>
    </footer>;
}

export default Footer;
