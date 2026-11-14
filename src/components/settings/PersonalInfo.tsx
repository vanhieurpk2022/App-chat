import React, { useState } from 'react';

export default function PersonalInfo() {
    const [userStatus, setUserStatus] = useState('Đang hoạt động');
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        name: 'Hoàng An',
        email: 'an.hoang@mam.studio',
        phone: '+84 912 345 678',
        job: 'Nhà thiết kế giao diện',
        department: 'Đội ngũ thiết kế',
        location: 'Hồ Chí Minh, Việt Nam',
        timezone: '(GMT+07:00) Bangkok, Hà Nội'
    });

    const [formData, setFormData] = useState(profileData);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setProfileData(formData);
        setIsEditing(false);
    };

    return (
        <div className="row g-4">
            <div className="col-lg-8">
                <div className="card-box profile-hero-card mb-4">
                    <div className="avatar-hero">
                        {profileData.name.split(' ').map(n => n[0]).join('').slice(-2).toUpperCase()}
                    </div>
                    <div className="profile-title">
                        <h3 className="fw-bold m-0">{profileData.name}</h3>
                        <div className="d-flex align-items-center mt-1">
                            <span className="status-dot"></span>
                            <span className="text-muted small ms-1">{userStatus}</span>
                        </div>
                        <div className="mt-2">
                            <button className="btn btn-link btn-sm p-0 text-decoration-none text-primary">
                                <i className="bi bi-camera me-1"></i> Thay ảnh
                            </button>
                        </div>
                    </div>
                    <div className="ms-auto">
                        <button
                            className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                            onClick={() => { setFormData(profileData); setIsEditing(true); }}
                        >
                            <i className="bi bi-pencil me-1"></i> Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>

                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-1">Thông tin cơ bản</h6>
                    <p className="text-muted extra-small mb-4">Giúp đồng đội hiểu và kết nối với bạn dễ dàng hơn.</p>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="field-label">Địa chỉ email</div>
                            <div className="field-value">
                                {profileData.email} <i className="bi bi-check-circle-fill text-success ms-1" style={{ fontSize: '0.8rem' }}></i>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="field-label">Số điện thoại</div>
                            <div className="field-value">{profileData.phone}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="field-label">Chức danh</div>
                            <div className="field-value fw-medium">{profileData.job}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="field-label">Bộ phận</div>
                            <div className="field-value fw-medium">{profileData.department}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="field-label">Địa điểm</div>
                            <div className="field-value">{profileData.location}</div>
                        </div>
                        <div className="col-md-6">
                            <div className="field-label">Múi giờ</div>
                            <div className="field-value">{profileData.timezone}</div>
                        </div>
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

            {isEditing && (
                <div className="modal-backdrop-custom">
                    <div className="modal-card-custom animate-fade-in">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold m-0">Chỉnh sửa thông tin cá nhân</h5>
                            <button className="btn-close shadow-none" onClick={() => setIsEditing(false)}></button>
                        </div>

                        <form onSubmit={handleSave}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label small fw-semibold">Họ và tên</label>
                                    <input
                                        type="text" className="form-control form-control-sm"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Địa chỉ email</label>
                                    <input
                                        type="email" className="form-control form-control-sm"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Số điện thoại</label>
                                    <input
                                        type="text" className="form-control form-control-sm"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Chức danh</label>
                                    <input
                                        type="text" className="form-control form-control-sm"
                                        value={formData.job}
                                        onChange={(e) => setFormData({...formData, job: e.target.value})}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Bộ phận</label>
                                    <input
                                        type="text" className="form-control form-control-sm"
                                        value={formData.department}
                                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
                                <button type="button" className="btn btn-light btn-sm px-3" onClick={() => setIsEditing(false)}>Hủy</button>
                                <button type="submit" className="btn btn-primary btn-sm px-4">Lưu thay đổi</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}