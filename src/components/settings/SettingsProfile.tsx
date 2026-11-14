import React, { useState } from 'react';
import '../../css/Settings.css';

export default function SettingsProfile() {
    const [activeMenu, setActiveMenu] = useState('personal');
    const [userStatus, setUserStatus] = useState('Đang hoạt động');

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
                    <button className="settings-menu-item">
                        <i className="bi bi-lock me-2"></i> Quyền riêng tư
                    </button>
                    <button className="settings-menu-item">
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
                                    <div className="mt-2">
                                        <button className="btn btn-link btn-sm p-0 text-decoration-none text-primary">
                                            <i className="bi bi-camera me-1"></i> Thay ảnh
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="card-box mb-4">
                                <h6 className="fw-bold mb-1">Thông tin cơ bản</h6>
                                <p className="text-muted extra-small mb-4">Giúp đồng đội hiểu và kết nối với bạn dễ dàng hơn.</p>

                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <div className="field-label">Địa chỉ email</div>
                                        <div className="field-value">
                                            an.hoang@mam.studio <i className="bi bi-check-circle-fill text-success ms-1" style={{ fontSize: '0.8rem' }}></i>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="field-label">Số điện thoại</div>
                                        <div className="field-value">+84 912 345 678</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="field-label">Chức danh</div>
                                        <div className="field-value fw-medium">Nhà thiết kế giao diện</div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="field-label">Bộ phận</div>
                                        <div className="field-value fw-medium">Đội ngũ thiết kế</div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-box">
                                <h6 className="fw-bold mb-3">Tài khoản của bạn</h6>
                                <div className="security-list-item">
                                    <div className="text-muted fs-5"><i className="bi bi-key"></i></div>
                                    <div className="flex-grow-1">
                                        <div className="fw-semibold small">Mật khẩu & bảo mật</div>
                                        <div className="text-muted extra-small">Đổi mật khẩu và thiết lập xác thực hai bước</div>
                                    </div>
                                    <i className="bi bi-chevron-right text-muted"></i>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4">

                            <div className="card-box mb-4">
                                <h6 className="fw-bold mb-3">Trạng thái của bạn</h6>
                                <div className="mb-3">
                                    <select
                                        className="form-select form-select-sm"
                                        value={userStatus}
                                        onChange={(e) => setUserStatus(e.target.value)}
                                    >
                                        <option value="Đang hoạt động">🟢 Đang hoạt động</option>
                                        <option value="Tạm vắng">🟡 Tạm vắng</option>
                                        <option value="Đừng làm phiền">🔴 Đừng làm phiền</option>
                                    </select>
                                </div>
                                <button className="btn btn-light btn-sm w-100 text-start d-flex align-items-center justify-content-between text-muted border-0 bg-light-subtle py-2">
                                    <span><i className="bi bi-emoji-smile me-2"></i> Đặt dòng trạng thái</span>
                                    <i className="bi bi-plus-lg"></i>
                                </button>
                            </div>

                            <div className="card-box mb-4">
                                <h6 className="fw-bold mb-2"><i className="bi bi-shield-check me-1 text-primary"></i> Quyền riêng tư</h6>
                                <p className="text-muted extra-small mb-3">Thông tin hồ sơ được chia sẻ trong Mầm Studio. Số điện thoại chỉ hiển thị với bạn.</p>
                                <a href="#privacy" className="text-primary extra-small text-decoration-none fw-semibold">
                                    Quản lý quyền riêng tư <i className="bi bi-arrow-right"></i>
                                </a>
                            </div>

                            <div className="card-box workspace-card-bg">
                                <div className="d-flex align-items-center mb-2">
                                    <div className="workspace-icon-box me-2">
                                        <i className="bi bi-bounding-box-circles"></i>
                                    </div>
                                    <div>
                                        <div className="fw-bold small m-0">QMes</div>
                                        <div className="text-muted extra-small">Thành viên • Tham gia tháng 10, 2026</div>
                                    </div>
                                </div>
                                <p className="text-muted extra-small m-0">
                                    Một không gian nhỏ, nuôi những ý tưởng lớn.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}