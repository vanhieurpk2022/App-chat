import React, { useState } from 'react';
import '../../css/Settings.css';

export default function SettingsProfile() {
    const [activeMenu, setActiveMenu] = useState('personal');

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
                    <button className="settings-menu-item">
                        <i className="bi bi-shield-lock me-2"></i> Tài khoản & bảo mật
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
                    <h5 className="fw-bold m-0">Thông tin cá nhân</h5>
                    <button className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
                        <i className="bi bi-pencil me-1"></i> Chỉnh sửa hồ sơ
                    </button>
                </header>

                <div className="settings-scrollable-area">
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="card-box profile-hero-card mb-4">
                                <div className="avatar-hero">HA</div>
                                <div className="profile-title">
                                    <h3 className="fw-bold m-0">Hoàng An</h3>
                                    <div className="d-flex align-items-center mt-1">
                                        <span className="status-dot"></span>
                                        <span className="text-muted small ms-1">Đang hoạt động</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-box mb-4">
                                <h6 className="fw-bold mb-1">Thông tin cơ bản</h6>
                                <p className="text-muted extra-small mb-4">Giúp đồng đội hiểu và kết nối với bạn dễ dàng hơn.</p>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="field-label">Địa chỉ email</div>
                                        <div className="field-value">an.hoang@mam.studio</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="field-label">Số điện thoại</div>
                                        <div className="field-value">+84 912 345 678</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4"></div>
                    </div>
                </div>
            </main>
        </div>
    );
}