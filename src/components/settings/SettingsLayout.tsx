import { useState } from 'react';
import '../../css/Settings.css';
import PersonalInfo from './PersonalInfo';
import SecuritySettings from './SecuritySettings';
import PrivacySettings from './PrivacySettings';
import NotificationSettings from './NotificationSettings';

export default function SettingsLayout() {
    const [activeMenu, setActiveMenu] = useState('personal');

    const renderContent = () => {
        switch (activeMenu) {
            case 'personal': return <PersonalInfo />;
            case 'security': return <SecuritySettings />;
            case 'privacy': return <PrivacySettings />;
            case 'notifications': return <NotificationSettings />;
            default: return <PersonalInfo />;
        }
    };

    const getTitle = () => {
        switch (activeMenu) {
            case 'personal': return 'Thông tin cá nhân';
            case 'security': return 'Tài khoản & bảo mật';
            case 'privacy': return 'Quyền riêng tư';
            case 'notifications': return 'Thông báo';
            default: return 'Cài đặt';
        }
    };

    return (
        <div className="settings-container">
            <aside className="settings-sidebar-sub">
                <div className="sidebar-header">
                    <span className="text-muted small">/ Cài đặt <i className="bi bi-chevron-down"></i></span>
                    <h4 className="fw-bold mt-2">Cài đặt</h4>
                    <p className="text-muted extra-small">Quản lý tài khoản, bảo mật và quyền riêng tư</p>
                </div>

                <nav className="settings-menu">
                    <button
                        className={`settings-menu-item ${activeMenu === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('personal')}
                    >
                        <i className="bi bi-person me-2"></i> Thông tin cá nhân
                    </button>
                    <button
                        className={`settings-menu-item ${activeMenu === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('security')}
                    >
                        <i className="bi bi-shield-lock me-2"></i> Tài khoản & bảo mật
                    </button>
                    <button
                        className={`settings-menu-item ${activeMenu === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('privacy')}
                    >
                        <i className="bi bi-lock me-2"></i> Quyền riêng tư
                    </button>
                    <button
                        className={`settings-menu-item ${activeMenu === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('notifications')}
                    >
                        <i className="bi bi-bell me-2"></i> Thông báo
                    </button>

                    <div className="settings-menu-divider"></div>

                    <button className="settings-menu-item text-danger border-0 bg-transparent">
                        <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                    </button>
                </nav>

                <div className="current-account-badge">
                    <div className="avatar-circle-sm">HA</div>
                    <div className="account-info">
                        <div className="fw-semibold small">Hoàng An</div>
                        <div className="text-muted extra-small">Tài khoản đang đăng nhập</div>
                    </div>
                </div>
            </aside>

            <main className="settings-main-content">
                <header className="settings-header-bar">
                    <h5 className="fw-bold m-0">{getTitle()}</h5>
                </header>

                <div className="settings-scrollable-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}