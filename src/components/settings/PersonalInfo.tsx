import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

interface ProfileInfo {
    name: string;
    email: string;
    phone: string;
    job: string;
    department: string;
    location: string;
    timezone: string;
    bio: string;
}

const QUICK_STATUSES = [
    'Đang làm việc',
    'Đang họp nhóm',
    'Nghỉ giải lao',
    'Tập trung cao độ'
];

export default function PersonalInfo() {
    const authUser = useSelector((state: RootState) => state.auth.user);

    const [userStatus, setUserStatus] = useState('Đang hoạt động');
    const [customStatus, setCustomStatus] = useState('');
    const [isEditingStatus, setIsEditingStatus] = useState(false);
    const [tempStatus, setTempStatus] = useState('');

    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [isEditing, setIsEditing] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [profileData, setProfileData] = useState<ProfileInfo>(() => ({
        name: authUser || 'Hoàng An',
        email: authUser
            ? (authUser.includes('@') ? authUser : `${authUser}@qmes.local`)
            : 'an.hoang@mam.studio',
        phone: '+84 912 345 678',
        job: 'Nhà thiết kế giao diện',
        department: 'Đội ngũ thiết kế',
        location: 'Hồ Chí Minh, Việt Nam',
        timezone: '(GMT+07:00) Bangkok, Hà Nội',
        bio: 'Thích xây dựng giao diện gọn gàng, dễ dùng và đồng bộ cho làm việc nhóm.'
    }));

    const [formData, setFormData] = useState<ProfileInfo>(profileData);

    useEffect(() => {
        if (!authUser) return;
        setProfileData((prev) => {
            const nextEmail = authUser.includes('@') ? authUser : `${authUser}@qmes.local`;
            const updated: ProfileInfo = {
                ...prev,
                name: authUser,
                email: nextEmail
            };
            setFormData(updated);
            return updated;
        });
    }, [authUser]);

    useEffect(() => {
        return () => {
            if (avatarUrl) {
                URL.revokeObjectURL(avatarUrl);
            }
        };
    }, [avatarUrl]);

    const showSuccessBanner = () => {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2500);
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setFormError('Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP...).');
            return;
        }

        if (avatarUrl) {
            URL.revokeObjectURL(avatarUrl);
        }

        const nextUrl = URL.createObjectURL(file);
        setAvatarUrl(nextUrl);
        setFormError(null);
        showSuccessBanner();
    };

    const handleRemoveAvatar = () => {
        if (avatarUrl) {
            URL.revokeObjectURL(avatarUrl);
        }
        setAvatarUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        showSuccessBanner();
    };

    const handleOpenEdit = () => {
        setFormData(profileData);
        setFormError(null);
        setIsEditing(true);
    };

    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();

        const cleaned: ProfileInfo = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            job: formData.job.trim(),
            department: formData.department.trim(),
            location: formData.location.trim(),
            timezone: formData.timezone.trim(),
            bio: formData.bio.trim()
        };

        if (!cleaned.name || !cleaned.email) {
            setFormError('Họ và tên và địa chỉ email không được để trống.');
            return;
        }

        setProfileData(cleaned);
        setIsEditing(false);
        setFormError(null);
        showSuccessBanner();
    };

    const handleSaveCustomStatus = (e: React.FormEvent) => {
        e.preventDefault();
        setCustomStatus(tempStatus.trim());
        setIsEditingStatus(false);
        showSuccessBanner();
    };

    const initials = profileData.name
        .split(' ')
        .filter(Boolean)
        .map((n) => n[0])
        .join('')
        .slice(-2)
        .toUpperCase() || 'HA';

    const statusBadgeClass =
        userStatus === 'Đừng làm phiền'
            ? 'bg-danger'
            : userStatus === 'Tạm vắng'
                ? 'bg-warning'
                : '';

    return (
        <div className="row g-4">
            {saveSuccess && (
                <div className="col-12">
                    <div className="alert alert-success py-2 px-3 small d-flex align-items-center justify-content-between m-0">
                        <span>
                            <i className="bi bi-check-circle-fill me-2"></i>
                            Đã cập nhật hồ sơ thành công!
                        </span>
                        <button
                            type="button"
                            className="btn-close btn-sm"
                            onClick={() => setSaveSuccess(false)}
                        ></button>
                    </div>
                </div>
            )}

            <div className="col-lg-8">
                <div className="card-box profile-hero-card mb-4">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Avatar"
                            className="rounded-circle object-fit-cover flex-shrink-0"
                            style={{ width: '72px', height: '72px' }}
                        />
                    ) : (
                        <div className="avatar-hero flex-shrink-0">{initials}</div>
                    )}

                    <div className="profile-title">
                        <h3 className="fw-bold m-0">{profileData.name}</h3>

                        <div className="d-flex flex-wrap align-items-center mt-1 gap-2">
                            <div className="d-flex align-items-center">
                                <span className={`status-dot ${statusBadgeClass}`}></span>
                                <span className="text-muted small ms-1">{userStatus}</span>
                            </div>
                            {customStatus && (
                                <span className="badge bg-light text-dark border fw-normal">
                                    {customStatus}
                                </span>
                            )}
                        </div>

                        <div className="d-flex align-items-center gap-3 mt-2">
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleAvatarChange}
                            />
                            <button
                                type="button"
                                className="btn btn-link btn-sm p-0 text-decoration-none text-primary"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <i className="bi bi-camera me-1"></i> Thay ảnh
                            </button>

                            {avatarUrl && (
                                <button
                                    type="button"
                                    className="btn btn-link btn-sm p-0 text-decoration-none text-danger"
                                    onClick={handleRemoveAvatar}
                                >
                                    <i className="bi bi-trash me-1"></i> Xóa ảnh
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="ms-auto">
                        <button
                            type="button"
                            className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm"
                            onClick={handleOpenEdit}
                        >
                            <i className="bi bi-pencil me-1"></i> Chỉnh sửa hồ sơ
                        </button>
                    </div>
                </div>

                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-1">Thông tin cơ bản</h6>
                    <p className="text-muted extra-small mb-4">
                        Giúp đồng đội hiểu và kết nối với bạn dễ dàng hơn.
                    </p>

                    <div className="row g-3">
                        <div className="col-md-6">
                            <div className="field-label">Địa chỉ email</div>
                            <div className="field-value">
                                {profileData.email}{' '}
                                <i
                                    className="bi bi-check-circle-fill text-success ms-1"
                                    style={{ fontSize: '0.8rem' }}
                                ></i>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="field-label">Số điện thoại</div>
                            <div className="field-value">{profileData.phone || 'Chưa cập nhật'}</div>
                        </div>

                        <div className="col-md-6">
                            <div className="field-label">Chức danh</div>
                            <div className="field-value fw-medium">{profileData.job || 'Chưa cập nhật'}</div>
                        </div>

                        <div className="col-md-6">
                            <div className="field-label">Bộ phận</div>
                            <div className="field-value fw-medium">{profileData.department || 'Chưa cập nhật'}</div>
                        </div>

                        <div className="col-md-6">
                            <div className="field-label">Địa điểm</div>
                            <div className="field-value">{profileData.location || 'Chưa cập nhật'}</div>
                        </div>

                        <div className="col-md-6">
                            <div className="field-label">Múi giờ</div>
                            <div className="field-value">{profileData.timezone || 'Chưa cập nhật'}</div>
                        </div>

                        <div className="col-12 pt-2 border-top">
                            <div className="field-label">Giới thiệu bản thân</div>
                            <div className="field-value small text-secondary">
                                {profileData.bio || 'Chưa có mô tả ngắn.'}
                            </div>
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

                    {!isEditingStatus ? (
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-light btn-sm flex-grow-1 text-start d-flex align-items-center justify-content-between text-muted border-0 bg-light-subtle py-2"
                                onClick={() => {
                                    setTempStatus(customStatus);
                                    setIsEditingStatus(true);
                                }}
                            >
                                <span>
                                    <i className="bi bi-emoji-smile me-2"></i>
                                    {customStatus || 'Đặt dòng trạng thái'}
                                </span>
                                <i className="bi bi-pencil-square"></i>
                            </button>

                            {customStatus && (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm px-2"
                                    title="Xóa dòng trạng thái"
                                    onClick={() => {
                                        setCustomStatus('');
                                        showSuccessBanner();
                                    }}
                                >
                                    <i className="bi bi-x-lg"></i>
                                </button>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={handleSaveCustomStatus} className="p-2 border rounded bg-light-subtle">
                            <input
                                type="text"
                                className="form-control form-control-sm mb-2"
                                placeholder="Nhập dòng trạng thái..."
                                value={tempStatus}
                                onChange={(e) => setTempStatus(e.target.value)}
                            />

                            <div className="d-flex flex-wrap gap-1 mb-2">
                                {QUICK_STATUSES.map((item) => (
                                    <button
                                        key={item}
                                        type="button"
                                        className="btn btn-outline-secondary btn-sm py-0 px-2 extra-small"
                                        onClick={() => setTempStatus(item)}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>

                            <div className="d-flex justify-content-end gap-1">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-light py-0 px-2"
                                    onClick={() => setIsEditingStatus(false)}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="btn btn-sm btn-primary py-0 px-2">
                                    Lưu
                                </button>
                            </div>
                        </form>
                    )}
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
                            <button
                                type="button"
                                className="btn-close shadow-none"
                                onClick={() => setIsEditing(false)}
                            ></button>
                        </div>

                        {formError && (
                            <div className="alert alert-danger py-2 small">
                                {formError}
                            </div>
                        )}

                        <form onSubmit={handleSaveProfile}>
                            <div className="row g-3">
                                <div className="col-12">
                                    <label className="form-label small fw-semibold">Họ và tên</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Địa chỉ email</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Chức danh</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={formData.job}
                                        onChange={(e) => setFormData({ ...formData, job: e.target.value })}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Bộ phận</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={formData.department}
                                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Địa điểm</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={formData.location}
                                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label small fw-semibold">Múi giờ</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        value={formData.timezone}
                                        onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label small fw-semibold">Giới thiệu bản thân</label>
                                    <textarea
                                        rows={2}
                                        className="form-control form-control-sm"
                                        value={formData.bio}
                                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="d-flex justify-content-end gap-2 mt-4 pt-2 border-top">
                                <button
                                    type="button"
                                    className="btn btn-light btn-sm px-3"
                                    onClick={() => setIsEditing(false)}
                                >
                                    Hủy
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm px-4">
                                    Lưu thay đổi
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}