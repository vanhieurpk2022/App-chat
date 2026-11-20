import React, { useState } from 'react';

interface LoginDevice {
    id: number;
    deviceName: string;
    location: string;
    lastActive: string;
    isCurrent: boolean;
}

interface SecurityLog {
    id: number;
    title: string;
    detail: string;
    time: string;
}

export default function SecuritySettings() {
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({
        current: '',
        newPass: '',
        confirmPass: ''
    });
    const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'danger'; text: string } | null>(null);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [loginAlertEnabled, setLoginAlertEnabled] = useState(true);
    const [autoLockTimeout, setAutoLockTimeout] = useState('15m');
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [notice, setNotice] = useState<{ type: 'success' | 'warning'; text: string } | null>(null);
    const [devices, setDevices] = useState<LoginDevice[]>([
        {
            id: 1,
            deviceName: 'Windows PC • Chrome',
            location: 'Hồ Chí Minh, Việt Nam',
            lastActive: 'Đang hoạt động',
            isCurrent: true
        },
        {
            id: 2,
            deviceName: 'Android • Ứng dụng Chat',
            location: 'Hồ Chí Minh, Việt Nam',
            lastActive: '2 giờ trước',
            isCurrent: false
        },
        {
            id: 3,
            deviceName: 'Laptop • Edge',
            location: 'Thủ Đức, Hồ Chí Minh',
            lastActive: 'Hôm qua',
            isCurrent: false
        }
    ]);

    const [logs, setLogs] = useState<SecurityLog[]>([
        {
            id: 1,
            title: 'Đăng nhập thành công',
            detail: 'Windows PC • Chrome tại Hồ Chí Minh',
            time: 'Hôm nay'
        },
        {
            id: 2,
            title: 'Xác thực hai bước đang bật',
            detail: 'Bảo vệ phiên đăng nhập bằng mã xác thực',
            time: '3 ngày trước'
        }
    ]);

    const showBanner = (type: 'success' | 'warning', text: string) => {
        setNotice({ type, text });
        setTimeout(() => setNotice(null), 3000);
    };

    const addLog = (title: string, detail: string) => {
        setLogs(prev => [
            { id: Date.now(), title, detail, time: 'Vừa xong' },
            ...prev.slice(0, 4)
        ]);
    };

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
        addLog('Đổi mật khẩu', 'Mật khẩu tài khoản đã được cập nhật');

        setTimeout(() => {
            setShowPasswordModal(false);
            setPasswordMsg(null);
            setPasswords({ current: '', newPass: '', confirmPass: '' });
        }, 1000);
    };

    const handleToggle2FA = (checked: boolean) => {
        setTwoFactorEnabled(checked);
        addLog(
            checked ? 'Bật xác thực hai bước (2FA)' : 'Tắt xác thực hai bước (2FA)',
            'Thay đổi cấu hình bảo mật tài khoản'
        );
        showBanner('success', checked ? 'Đã bật xác thực hai bước.' : 'Đã tắt xác thực hai bước.');
    };

    const handleLogoutDevice = (device: LoginDevice) => {
        setDevices(prev => prev.filter(item => item.id !== device.id));
        addLog('Đăng xuất thiết bị từ xa', `Đã đăng xuất khỏi ${device.deviceName}`);
        showBanner('success', `Đã đăng xuất thiết bị "${device.deviceName}".`);
    };

    const handleLogoutOtherDevices = () => {
        const otherCount = devices.filter(d => !d.isCurrent).length;
        if (otherCount === 0) return;
        setDevices(prev => prev.filter(d => d.isCurrent));
        addLog('Đăng xuất các thiết bị khác', `Đã đăng xuất ${otherCount} phiên đăng nhập khác`);
        showBanner('success', `Đã đăng xuất ${otherCount} thiết bị khác.`);
    };

    const handleConfirmDeactivate = () => {
        setShowDeactivateModal(false);
        addLog('Yêu cầu tạm khóa tài khoản', 'Đã ghi nhận yêu cầu tạm khóa phiên làm việc');
        showBanner('warning', 'Đã ghi nhận yêu cầu tạm khóa tài khoản.');
    };

    const otherDevicesCount = devices.filter(d => !d.isCurrent).length;

    return (
        <div className="row g-4">
            {notice && (
                <div className="col-12">
                    <div className={`alert alert-${notice.type} py-2 px-3 small d-flex justify-content-between align-items-center m-0`}>
                        <span>
                            <i className={`bi ${notice.type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-triangle-fill'} me-2`}></i>
                            {notice.text}
                        </span>
                        <button type="button" className="btn-close btn-sm" onClick={() => setNotice(null)}></button>
                    </div>
                </div>
            )}

            <div className="col-lg-8">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-3">Mật khẩu & Xác thực</h6>

                    <div className="security-list-item border-bottom pb-3 mb-3">
                        <div className="text-primary fs-5"><i className="bi bi-key"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Đổi mật khẩu</div>
                            <div className="text-muted extra-small">Nên dùng mật khẩu mạnh và thay đổi định kỳ</div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => {
                                setPasswordMsg(null);
                                setShowPasswordModal(true);
                            }}
                        >
                            Thay đổi
                        </button>
                    </div>

                    <div className="security-list-item border-bottom pb-3 mb-3">
                        <div className="text-success fs-5"><i className="bi bi-shield-check"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Xác thực hai bước (2FA)</div>
                            <div className="text-muted extra-small">Yêu cầu thêm bước xác nhận khi đăng nhập trên thiết bị lạ</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={twoFactorEnabled}
                                onChange={(e) => handleToggle2FA(e.target.checked)}
                            />
                        </div>
                    </div>

                    <div className="security-list-item border-bottom pb-3 mb-3">
                        <div className="text-warning fs-5"><i className="bi bi-bell-exclamation"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Cảnh báo đăng nhập mới</div>
                            <div className="text-muted extra-small">Thông báo khi có thiết bị hoặc trình duyệt mới đăng nhập</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={loginAlertEnabled}
                                onChange={(e) => {
                                    setLoginAlertEnabled(e.target.checked);
                                    showBanner('success', 'Đã cập nhật cảnh báo đăng nhập.');
                                }}
                            />
                        </div>
                    </div>

                    <div className="security-list-item gap-3">
                        <div className="text-secondary fs-5"><i className="bi bi-clock-history"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Tự động khóa phiên khi không thao tác</div>
                            <div className="text-muted extra-small">Bảo vệ màn hình khi bạn rời khỏi máy tính</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '165px' }}
                            value={autoLockTimeout}
                            onChange={(e) => {
                                setAutoLockTimeout(e.target.value);
                                showBanner('success', 'Đã cập nhật thời gian tự động khóa.');
                            }}
                        >
                            <option value="5m">Sau 5 phút</option>
                            <option value="15m">Sau 15 phút</option>
                            <option value="30m">Sau 30 phút</option>
                            <option value="never">Không tự khóa</option>
                        </select>
                    </div>
                </div>

                <div className="card-box mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-3 gap-2">
                        <div>
                            <h6 className="fw-bold m-0">Thiết bị đăng nhập ({devices.length})</h6>
                            <div className="text-muted extra-small">Quản lý các phiên đang truy cập tài khoản của bạn</div>
                        </div>
                        {otherDevicesCount > 0 && (
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm"
                                onClick={handleLogoutOtherDevices}
                            >
                                Đăng xuất thiết bị khác
                            </button>
                        )}
                    </div>

                    {devices.map((device, index) => (
                        <div
                            key={device.id}
                            className={`security-list-item ${index !== devices.length - 1 ? 'border-bottom pb-3 mb-3' : ''}`}
                        >
                            <div className="text-muted fs-5">
                                <i className={`bi ${device.deviceName.includes('PC') || device.deviceName.includes('Laptop') ? 'bi-laptop' : 'bi-phone'}`}></i>
                            </div>
                            <div className="flex-grow-1">
                                <div className="fw-semibold small">{device.deviceName}</div>
                                <div className="text-muted extra-small">{device.location} • {device.lastActive}</div>
                            </div>
                            {device.isCurrent ? (
                                <span className="badge bg-success-subtle text-success small">Thiết bị này</span>
                            ) : (
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm py-0 px-2 extra-small"
                                    onClick={() => handleLogoutDevice(device)}
                                >
                                    Đăng xuất
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                <div className="card-box">
                    <h6 className="fw-bold text-danger mb-2">Tạm khóa tài khoản</h6>
                    <div className="d-flex justify-content-between align-items-center gap-3">
                        <div className="text-muted extra-small">
                            Tạm ngưng truy cập tài khoản nếu bạn nghi ngờ có hoạt động bất thường.
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-danger btn-sm flex-shrink-0"
                            onClick={() => setShowDeactivateModal(true)}
                        >
                            Tạm khóa
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-2">
                        <i className="bi bi-shield-lock me-1 text-primary"></i> Mức độ bảo vệ
                    </h6>
                    <p className="text-muted extra-small mb-2">
                        2FA: <strong className="text-dark">{twoFactorEnabled ? 'Đã bật' : 'Chưa bật'}</strong> •
                        Cảnh báo đăng nhập: <strong className="text-dark">{loginAlertEnabled ? 'Bật' : 'Tắt'}</strong>
                    </p>
                    <p className="text-muted extra-small m-0">
                        Nên bật cả 2FA và cảnh báo đăng nhập mới để tăng an toàn cho tài khoản.
                    </p>
                </div>

                <div className="card-box">
                    <h6 className="fw-bold mb-3">Hoạt động bảo mật gần đây</h6>
                    <div className="d-flex flex-column gap-3">
                        {logs.map(log => (
                            <div key={log.id} className="border-bottom pb-2 last:border-0">
                                <div className="fw-semibold small">{log.title}</div>
                                <div className="text-muted extra-small">{log.detail}</div>
                                <div className="text-muted extra-small">{log.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {showPasswordModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-card-custom animate-fade-in" style={{ maxWidth: '420px' }}>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="fw-bold m-0">Đổi mật khẩu</h5>
                            <button type="button" className="btn-close shadow-none" onClick={() => setShowPasswordModal(false)}></button>
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
                                    type="password"
                                    className="form-control form-control-sm"
                                    value={passwords.current}
                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    value={passwords.newPass}
                                    onChange={(e) => setPasswords({ ...passwords, newPass: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-semibold">Xác nhận mật khẩu mới</label>
                                <input
                                    type="password"
                                    className="form-control form-control-sm"
                                    value={passwords.confirmPass}
                                    onChange={(e) => setPasswords({ ...passwords, confirmPass: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                                <button type="button" className="btn btn-light btn-sm px-3" onClick={() => setShowPasswordModal(false)}>
                                    Hủy
                                </button>
                                <button type="submit" className="btn btn-primary btn-sm px-3">
                                    Cập nhật mật khẩu
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeactivateModal && (
                <div className="modal-backdrop-custom">
                    <div className="modal-card-custom animate-fade-in" style={{ maxWidth: '400px' }}>
                        <h6 className="fw-bold text-danger mb-2">Xác nhận tạm khóa tài khoản</h6>
                        <p className="text-muted small mb-4">
                            Bạn có chắc muốn tạm khóa tài khoản không? Bạn sẽ cần xác minh lại khi đăng nhập lại.
                        </p>
                        <div className="d-flex justify-content-end gap-2">
                            <button
                                type="button"
                                className="btn btn-light btn-sm px-3"
                                onClick={() => setShowDeactivateModal(false)}
                            >
                                Hủy
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger btn-sm px-3"
                                onClick={handleConfirmDeactivate}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}