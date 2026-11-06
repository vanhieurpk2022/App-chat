import React, { useState } from 'react';
import './SettingsProfile.css';
export default function SettingsProfile() {
    const [activeMenu, setActiveMenu] = useState('personal');
    const [status, setStatus] = useState('Đang hoạt động');

    return (
        <div className="app-layout">
            <aside className="sidebar-narrow">
                <div className="nav-top">
                    <a href="#chat" className="nav-icon" title="Tin nhắn"><i className="bi bi-chat-dots"></i></a>
                    <a href="#contacts" className="nav-icon" title="Danh bạ"><i className="bi bi-person-lines-fill"></i></a>
                    <a href="#settings" className="nav-icon active" title="Cài đặt"><i className="bi bi-gear"></i></a>
                    <a href="#archive" className="nav-icon" title="Lưu trữ"><i className="bi bi-archive"></i></a>
                    <a href="#bookmark" className="nav-icon" title="Đánh dấu"><i className="bi bi-bookmark"></i></a>
                </div>
                <div className="nav-bottom">
                    <a href="#theme" className="nav-icon" title="Giao diện"><i className="bi bi-moon"></i></a>
                    <a href="#help" className="nav-icon" title="Trợ giúp"><i className="bi bi-question-circle"></i></a>
                    <div className="user-avatar-mini" title="Hoàng An">HA</div>
                </div>
            </aside>

            <section className="settings-sidebar">
                <div className="sidebar-header">
                    <span className="text-muted small">/ Cài đặt <i className="bi bi-chevron-down"></i></span>
                    <h4 className="fw-bold mt-2">Cài đặt</h4>
                    <p className="text-muted extra-small">Quản lý tài khoản, bảo mật và quyền riêng tư</p>
                </div>

                <nav className="settings-menu">
                    <button
                        className={`menu-item ${activeMenu === 'personal' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('personal')}
                    >
                        <i className="bi bi-person me-2"></i> Thông tin cá nhân
                    </button>
                    <button
                        className={`menu-item ${activeMenu === 'security' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('security')}
                    >
                        <i className="bi bi-shield-lock me-2"></i> Tài khoản & bảo mật
                    </button>
                    <button
                        className={`menu-item ${activeMenu === 'privacy' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('privacy')}
                    >
                        <i className="bi bi-lock me-2"></i> Quyền riêng tư
                    </button>
                    <button
                        className={`menu-item ${activeMenu === 'notifications' ? 'active' : ''}`}
                        onClick={() => setActiveMenu('notifications')}
                    >
                        <i className="bi bi-bell me-2"></i> Thông báo
                    </button>

                    <div className="menu-divider"></div>

                    <button className="menu-item text-danger border-0 bg-transparent">
                        <i className="bi bi-box-arrow-right me-2"></i> Đăng xuất
                    </button>
                </nav>

                <div className="current-account-badge">
                    <div className="avatar-circle">HA</div>
                    <div className="account-info">
                        <div className="fw-semibold small">Hoàng An</div>
                        <div className="text-muted extra-small">Tài khoản đang đăng nhập</div>
                    </div>
                </div>
            </section>
        </div>
    )
}
