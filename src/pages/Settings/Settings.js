// import classNames from 'classnames/bind';
// import { useState } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTrash, faPenToSquare, faEllipsis } from '@fortawesome/free-solid-svg-icons';

// import styles from './Settings.module.scss';
// const cx = classNames.bind(styles);


// function Settings() {
//     return;
// }

// export default Settings;

import { useState, useRef, useEffect } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faPenToSquare,
    faGear,
    faUser,
    faLock,
    faCircleInfo,
    faAt,
    faAlignLeft,
    faImage,
    faCloudUpload,
    faShareNodes,
    faGlobe,
    faKey,
    faLink,
    faClock,
    faShield,
    faXmark,
    faFloppyDisk,
    faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';


import styles from './Settings.module.scss';
import Modal from '~/components/Modal';
import { faFacebookF, faGithub, faGoogle, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Button from '~/components/Button';
import Section from '../components/Section';
const cx = classNames.bind(styles);

function Settings() {
    // State for user data
    const [userData, setUserData] = useState({
        fullName: 'Anh Tuan Do',
        username: 'doanhthuan1',
        bio: 'Not updated',
        avatar: null,
        website: 'Not updated',
        github: 'Not updated',
        linkedin: 'Not updated',
        facebook: 'Not updated'
    });

    // UI state
    const [activeTab, setActiveTab] = useState('personal');
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
    const [currentField, setCurrentField] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [modalInputValue, setModalInputValue] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [toast, setToast] = useState({ show: false, message: '', isSuccess: true });

    // Refs
    const avatarInputRef = useRef(null);

    // Show toast
    const showToast = (message, isSuccess = true) => {
        setToast({ show: true, message, isSuccess });
        setTimeout(() => setToast({ show: false, message: '', isSuccess: true }), 3000);
    };

    // Handle tab change
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    // Handle edit button click
    const handleEditClick = (field) => {
        setCurrentField(field);
        setModalInputValue(userData[field] === 'Not updated' ? '' : userData[field]);
        setIsEditModalOpen(true);
    };

    // Handle save edit
    const handleSaveEdit = () => {
        const newValue = modalInputValue.trim();
        setUserData(prev => ({
            ...prev,
            [currentField]: newValue === '' ? 'Not updated' : newValue
        }));
        setIsEditModalOpen(false);
        showToast(`✓ ${currentField} updated successfully`);
    };

    // Handle avatar upload
    const handleAvatarUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setUserData(prev => ({ ...prev, avatar: event.target.result }));
                showToast('✓ Avatar updated successfully');
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle remove avatar
    const handleRemoveAvatar = () => {
        setUserData(prev => ({ ...prev, avatar: null }));
        if (avatarInputRef.current) {
            avatarInputRef.current.value = '';
        }
        showToast('✓ Avatar removed');
    };

    // Handle password change
    const handlePasswordChange = () => {
        if (!newPassword || !confirmPassword) {
            showToast('Please fill in both password fields', false);
            return;
        }
        if (newPassword.length < 8) {
            showToast('Password must be at least 8 characters', false);
            return;
        }
        if (newPassword !== confirmPassword) {
            showToast('Passwords do not match', false);
            return;
        }
        showToast('✓ Password updated successfully');
        setIsPasswordModalOpen(false);
        setNewPassword('');
        setConfirmPassword('');
    };

    // Handle two factor toggle
    const handleTwoFactorToggle = () => {
        setTwoFactorEnabled(prev => !prev);
        showToast(twoFactorEnabled ? '✓ Two-factor authentication disabled' : '✓ Two-factor authentication enabled');
    };

    // Handle save all
    const handleSaveAll = () => {
        showToast('✓ All changes saved successfully');
    };

    // Handle cancel
    const handleCancel = () => {
        if (window.confirm('Discard unsaved changes?')) {
            showToast('Changes discarded');
        }
    };

    // Escape key handler
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsEditModalOpen(false);
                setIsPasswordModalOpen(false);
            }
        };
        document.addEventListener('keydown', handleEsc);
        return () => document.removeEventListener('keydown', handleEsc);
    }, []);

    // Get avatar initial
    const avatarInitial = userData.fullName.charAt(0) || 'D';

    // Field names mapping
    const fieldNames = {
        fullName: 'Full Name',
        username: 'Username',
        bio: 'Bio',
        website: 'Website',
        github: 'GitHub',
        linkedin: 'LinkedIn',
        facebook: 'Facebook'
    };

    // Modal headers
    const getEditModalHeader = () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>Edit {fieldNames[currentField]}</span>
        </div>
    );

    const getPasswordModalHeader = () => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FontAwesomeIcon icon={faLock} />
            <span>Create new password</span>
        </div>
    );

    // Modal footers
    const getEditModalFooter = () => (
        <>
            <button className={cx('btn-secondary')} onClick={() => setIsEditModalOpen(false)}>
                Cancel
            </button>
            <button className={cx('btn-primary')} onClick={handleSaveEdit}>
                Save
            </button>
        </>
    );

    const getPasswordModalFooter = () => (
        <>
            <button className={cx('btn-secondary')} onClick={() => setIsPasswordModalOpen(false)}>
                Cancel
            </button>
            <button className={cx('btn-primary')} onClick={handlePasswordChange}>
                Update
            </button>
        </>
    );

    return (
        <div className={cx('settings-page')}>
            <div className='grid wide'>


            {/* Tabs */}
            <div className={cx('section-tabs')}>
                <button
                    className={cx('tab-btn', { active: activeTab === 'personal' })}
                    onClick={() => handleTabChange('personal')}
                >
                    <FontAwesomeIcon icon={faUser} /> Personal Information
                </button>
                <button
                    className={cx('tab-btn', { active: activeTab === 'security' })}
                    onClick={() => handleTabChange('security')}
                >
                    <FontAwesomeIcon icon={faLock} /> Password & Security
                </button>
            </div>

            {/* Personal Info Section */}
            <div className={cx('section', { active: activeTab === 'personal' })}>
                <h2 className={cx('section-title')}>Personal Information</h2>
                <p className={cx('section-desc')}>Manage your personal information.</p>

                {/* Basic Info Card */}
                <Section
                    header={
                        <div className={cx('card-header')}>
                            <FontAwesomeIcon icon={faCircleInfo} />
                            <h3>Basic Information</h3>
                        </div>
                    }   
                >
                    <div className={cx('form-grid')}>
                        {/* Full Name */}
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>
                                <FontAwesomeIcon icon={faUser} /> Full Name
                            </div>
                            <div className={cx('form-value')}>
                                <span>{userData.fullName}</span>
                                <Button
                                    // className={cx('edit-btn')}
                                    rounded
                                    primaryHover
                                    onClick={() => handleEditClick('fullName')}
                                    leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                    small
                                >
                                     edit
                                </Button>
                            </div>
                        </div>

                        {/* Username */}
                        <div className={cx('form-group')}>
                            <div className={cx('form-label')}>
                                <FontAwesomeIcon icon={faAt} /> Username
                            </div>
                            <div className={cx('form-value')}>
                                <span>{userData.username}</span>
                                <Button
                                    // className={cx('edit-btn')}
                                    rounded
                                    primaryHover
                                    onClick={() => handleEditClick('username')}
                                    leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                    small
                                >
                                     edit
                                </Button>
                            </div>
                        </div>

                        {/* Bio */}
                        <div className={cx('form-group', 'full-width')}>
                            <div className={cx('form-label')}>
                                <FontAwesomeIcon icon={faAlignLeft} /> Bio
                            </div>
                            <div className={cx('form-value')}>
                                <span>{userData.bio}</span>
                                <Button
                                    // className={cx('edit-btn')}
                                    rounded
                                    primaryHover
                                    onClick={() => handleEditClick('bio')}
                                    leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                                    small
                                >
                                     edit
                                </Button>
                            </div>
                        </div>

                        {/* Avatar */}
                        <div className={cx('form-group', 'full-width')}>
                            <div className={cx('form-label')}>
                                <FontAwesomeIcon icon={faImage} /> Avatar
                            </div>
                            <div className={cx('avatar-upload')}>
                                <div className={cx('avatar-preview')}>
                                    {userData.avatar ? (
                                        <img src={userData.avatar} alt="avatar" />
                                    ) : (
                                        <span>{avatarInitial}</span>
                                    )}
                                </div>
                                <div className={cx('avatar-actions')}>
                                    <Button
                                        small
                                        primary
                                        leftIcon={<FontAwesomeIcon icon={faCloudUpload} />}
                                        onClick={() => avatarInputRef.current?.click()}
                                        rounded
                                    >
                                        Upload image
                                    </Button>
                                    <Button
                                        small
                                        rounded
                                        normalHover
                                        // className={cx('btn-outline')}
                                        onClick={handleRemoveAvatar}
                                        leftIcon={<FontAwesomeIcon icon={faTrash} />}
                                    >
                                         Remove
                                    </Button>
                                </div>
                                <input
                                    type="file"
                                    ref={avatarInputRef}
                                    accept="image/*"
                                    onChange={handleAvatarUpload}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                    </div>
                </Section>

                <Section 
                    header={
                        <div className={cx('card-header')}>
                            <FontAwesomeIcon icon={faShareNodes} />
                            <h3>Social Information</h3>
                        </div>
                    }
                >
                    <div className={cx('social-grid')}>
                        {/* Website */}
                        <div className={cx('social-item')}>
                            <div className={cx('social-info')}>
                                <FontAwesomeIcon icon={faGlobe} />
                                <div>
                                    <div className={cx('social-name')}>Website</div>
                                    <div className={cx('social-value')}>{userData.website}</div>
                                </div>
                            </div>
                            <Button
                                rounded
                                // className={cx('edit-btn')}
                                primaryHover
                                LinkIcon
                                onClick={() => handleEditClick('website')}
                                small
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            />
                        </div>

                        {/* GitHub */}
                        <div className={cx('social-item')}>
                            <div className={cx('social-info')}>
                                <FontAwesomeIcon icon={faGithub} />
                                <div>
                                    <div className={cx('social-name')}>GitHub</div>
                                    <div className={cx('social-value')}>{userData.github}</div>
                                </div>
                            </div>
                            <Button
                                rounded
                                // className={cx('edit-btn')}
                                primaryHover
                                LinkIcon
                                onClick={() => handleEditClick('github')}
                                small
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            />
                        </div>

                        {/* LinkedIn */}
                        <div className={cx('social-item')}>
                            <div className={cx('social-info')}>
                                <FontAwesomeIcon icon={faLinkedin} />
                                <div>
                                    <div className={cx('social-name')}>LinkedIn</div>
                                    <div className={cx('social-value')}>{userData.linkedin}</div>
                                </div>
                            </div>
                            <Button
                                rounded
                                // className={cx('edit-btn')}
                                primaryHover
                                LinkIcon
                                onClick={() => handleEditClick('linkedin')}
                                small
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            />
                        </div>

                        {/* Facebook */}
                        <div className={cx('social-item')}>
                            <div className={cx('social-info')}>
                                <FontAwesomeIcon icon={faFacebookF} />
                                <div>
                                    <div className={cx('social-name')}>Facebook</div>
                                    <div className={cx('social-value')}>{userData.facebook}</div>
                                </div>
                            </div>
                             <Button
                                rounded
                                // className={cx('edit-btn')}
                                primaryHover
                                LinkIcon
                                onClick={() => handleEditClick('facebook')}
                                small
                                leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            />
                        </div>
                    </div>
                </Section>
            </div>

            {/* Security Section */}
            <div className={cx('section', { active: activeTab === 'security' })}>
                <h2 className={cx('section-title')}>Password & Security</h2>
                <p className={cx('section-desc')}>Manage your password and security settings.</p>

                <Section
                    header={
                    <div className={cx('card-header')}>
                        <FontAwesomeIcon icon={faKey} />
                        <h3>Login & Recovery</h3>
                    </div>
                    }
                >
                    <>
                    <div className={cx('security-row')}>
                        <div className={cx('security-info')}>
                            <h4>PASSWORD</h4>
                            <p>
                                <FontAwesomeIcon icon={faClock} /> Not changed yet
                            </p>
                        </div>
                        <Button
                            rounded
                            normalHover
                            // primaryHover
                            // className={cx('btn-link')}
                            onClick={() => setIsPasswordModalOpen(true)}
                            leftIcon={<FontAwesomeIcon icon={faPenToSquare} />}
                            small
                        >
                             Create password
                        </Button>
                    </div>
                    <div className={cx('security-row')}>
                        <div className={cx('security-info')}>
                            <h4>{'Two-factor authentication'.toUpperCase()}</h4>
                            <p>
                                <FontAwesomeIcon icon={faShield} /> {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                            </p>
                        </div>
                        <div
                            className={cx('toggle-switch', { active: twoFactorEnabled })}
                            onClick={handleTwoFactorToggle}
                        >
                            <div className={cx('toggle-slider')}></div>
                        </div>
                    </div>
                    </>
                </Section>

                <Section
                    header={
                    <div className={cx('card-header')}>
                        <FontAwesomeIcon icon={faLink} />
                        <h3>Linked Accounts</h3>
                    </div>
                    }
                >
                    <div className={cx('social-grid')}>
                        <div className={cx('social-item')}>
                            <div className={cx('social-info')}>
                                <FontAwesomeIcon icon={faGoogle} />
                                <div>
                                    <div className={cx('social-name')}>Google</div>
                                    <div className={cx('social-value')}>doanhthuan3536@gmail.com</div>
                                </div>
                            </div>
                            <Button 
                                rounded
                                small
                                primaryHover
                            >
                                Connected
                            </Button>
                        </div>
                        <div className={cx('social-item')}>
                            <div className={cx('social-info')}>
                                <FontAwesomeIcon icon={faFacebookF} />
                                <div>
                                    <div className={cx('social-name')}>Facebook</div>
                                    <div className={cx('social-value')}>Not connected</div>
                                </div>
                            </div>
                            <Button 
                                rounded
                                small
                                primaryHover
                            >
                                Connected
                            </Button>
                        </div>
                    </div>
                </Section>
            </div>

            {/* Action Buttons */}
            <div className={cx('action-buttons')}>
                <Button 
                    rounded
                    normalHover
                    // className={cx('btn-secondary')}
                    onClick={handleCancel}
                    leftIcon={<FontAwesomeIcon icon={faXmark} />}
                >
                     Cancel
                </Button>
                <Button
                    rounded
                    primary 
                    // className={cx('btn-primary')}
                    onClick={handleSaveAll}
                    leftIcon={<FontAwesomeIcon icon={faFloppyDisk} />}
                >
                     Save Changes
                </Button>
            </div>

            {/* Edit Modal */}
            <Modal
                conditionOpen={isEditModalOpen}
                onClickModalOverlay={() => setIsEditModalOpen(false)}
                header={getEditModalHeader()}
                footer={getEditModalFooter()}
            >
                <p>Enter new {fieldNames[currentField]?.toLowerCase()}</p>
                <input
                    type="text"
                    className={cx('modal-input')}
                    value={modalInputValue}
                    onChange={(e) => setModalInputValue(e.target.value)}
                    placeholder={`New ${fieldNames[currentField]?.toLowerCase()}`}
                    autoFocus
                />
            </Modal>

            {/* Password Modal */}
            <Modal
                conditionOpen={isPasswordModalOpen}
                onClickModalOverlay={() => setIsPasswordModalOpen(false)}
                header={getPasswordModalHeader()}
                footer={getPasswordModalFooter()}
            >
                <p>Password must be at least 8 characters</p>
                <input
                    type="password"
                    className={cx('modal-input')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                />
                <input
                    type="password"
                    className={cx('modal-input')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                />
            </Modal>

            {/* Toast */}
            {/* {toast.show && (
                <div className={cx('toast', 'show')} style={{ background: toast.isSuccess ? '#1e3a5f' : '#a12b2b' }}>
                    <FontAwesomeIcon icon={faCircleCheck} />
                    <span>{toast.message}</span>
                </div>
            )} */}
            </div>
        </div>
    );
}

export default Settings;
