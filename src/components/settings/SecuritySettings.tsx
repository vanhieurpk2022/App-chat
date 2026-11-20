import React, { useState } from 'react';

export default function SecuritySettings() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', newPass: '', confirmPass: '' });
    const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);

    const [devices, setDevices] = useState([
        { id: 1, name: 'Windows PC • Chrome', location: 'Hồ Chí Minh, Việt Nam', time: 'Đang hoạt động', isCurrent: true },
        { id: 2, name: 'Redmi 14 • App Mobile', location: 'Thủ Đức, Hồ Chí Minh', time: '2 giờ trước', isCurrent: false }
    ]);

    const handleChangePassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwords.newPass.length < 6) {
            setPasswordMsg({ type: 'danger', text: 'Mật khẩu mới phải có ít nhất 6 ký tự.' });
            return;
        }
        if (passwords.newPass !== passwords.confirmPass) {
            setPasswordMsg({ type: 'danger', text: 'Mật khẩu xác nhận không khớp!' });
            return;
        }
        setPasswordMsg({ type: 'success', text: 'Đổi mật khẩu thành công!' });
        setTimeout(() => {
            setShowPasswordModal(false);
            setPasswordMsg(null);
            setPasswords({ current: '', newPass: '', confirmPass: '' });
        }, 1200);
    };

    const handleRevokeDevice = (id: number) => {
        setDevices(prev => prev.filter(d => d.id !== id));
    };

    return (
        <div className="row g-4">
            <div className="col-lg-8">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-3">Mật khẩu & Đăng nhập</h6>
                    <div className="security-list-item border-bottom pb-3 mb-3">
                        <div className="text-primary fs-5"><i className="bi bi-key"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Đổi mật khẩu</div>
                            <div className="text-muted extra-small">Cập nhật mật khẩu định kỳ để bảo vệ tài khoản</div>
                        </div>
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => setShowPasswordModal(true)}
                        >
                            Thay đổi
                        </button>
                    </div>

                    <div className="security-list-item">
                        <div className="text-success fs-5"><i className="bi bi-shield-check"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Xác thực hai bước (2FA)</div>
                            <div className="text-muted extra-small">Bảo vệ tài khoản bổ sung qua ứng dụng xác thực</div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                        </div>
                    </div>
                </div>

                <div className="card-box">
                    <h6 className="fw-bold mb-3">Thiết bị đăng nhập ({devices.length})</h6>
                    {devices.map((device, index) => (
                        <div
                            key={device.id}
                            className={`security-list-item ${index !== devices.length - 1 ? 'border-bottom pb-3 mb-3' : ''}`}
                        >
                            <div className="text-muted fs-5">
                                <i className={`bi ${device.name.includes('PC') ? 'bi-laptop' : 'bi-phone'}`}></i>
                            </div>
                            <div className="flex-grow-1">
                                <div className="fw-semibold small">{device.name}</div>
                                <div className="text-muted extra-small">{device.location} • {device.time}</div>
                            </div>
                            {device.isCurrent ? (
                                <span className="badge bg-success-subtle text-success small">Thiết bị này</span>
                            ) : (
                                <button
                                    className="btn btn-outline-danger btn-sm py-0 px-2 extra-small"
                                    onClick={() => handleRevokeDevice(device.id)}
                                >
                                    Đăng xuất
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {showPasswordModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-card-custom animate-fade-in" style={{ maxWidth: '420px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold m-0">Đổi mật khẩu</h5>
                            <button className="btn-close shadow-none" onClick={() => setShowPasswordModal(false)}></button>
                        </div>

                        {passwordMsg && (
                            <div className={`alert alert-${passwordMsg.type} py-2 small`}>
                                {passwordMsg.text}
                            </div>
                        )}

                        <form onSubmit={handleChangePassword}>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Mật khẩu hiện tại</label>
                                <input
                                    type="password" className="form-control form-control-sm"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Mật khẩu mới</label>
                                <input
                                    type="password" className="form-control form-control-sm"
                                    value={passwords.newPass}
                                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Xác nhận mật khẩu mới</label>
                                <input
                                    type="password" className="form-control form-control-sm"
                                    value={passwords.confirmPass}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                                <button type="button" className="btn btn-light btn-sm px-3" onClick={() => setShowPasswordModal(false)}>Hủy</button>
                                <button type="submit" className="btn btn-primary btn-sm px-3">Cập nhật mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}