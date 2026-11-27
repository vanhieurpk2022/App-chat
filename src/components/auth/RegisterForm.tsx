import React, { useState } from 'react';

interface RegisterFormProps {
    onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!fullName.trim() || !username.trim() || !password) {
            setError('Vui lòng điền đầy đủ tất cả các trường thông tin.');
            return;
        }

        if (username.trim().length < 3) {
            setError('Tên đăng nhập phải có ít nhất 3 ký tự.');
            return;
        }

        if (password.length < 6) {
            setError('Mật khẩu phải có ít nhất 6 ký tự.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không trùng khớp.');
            return;
        }

        setSuccess(true);
        setTimeout(() => {
            onSwitchToLogin();
        }, 1200);
    };

    return (
        <form onSubmit={handleRegister}>
            <div className="mb-3">
                <h4 className="fw-bold mb-1">Tạo tài khoản mới</h4>
                <p className="text-muted small">Tham gia không gian làm việc nhóm QMes</p>
            </div>

            {error && (
                <div className="alert alert-danger py-2 px-3 small">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                </div>
            )}

            {success && (
                <div className="alert alert-success py-2 px-3 small">
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Đăng ký thành công! Đang chuyển sang trang đăng nhập...
                </div>
            )}

            <div className="mb-3">
                <label className="form-label small fw-semibold">Họ và tên hiển thị</label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ví dụ: Nguyễn Minh Luân"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label small fw-semibold">Tên đăng nhập</label>
                <input
                    type="text"
                    className="form-control form-control-sm"
                    placeholder="Ví dụ: minhluan26"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label small fw-semibold">Mật khẩu</label>
                <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="Tối thiểu 6 ký tự"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="mb-4">
                <label className="form-label small fw-semibold">Xác nhận mật khẩu</label>
                <input
                    type="password"
                    className="form-control form-control-sm"
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-sm w-100 py-2 fw-semibold rounded-3"
                disabled={success}
            >
                Đăng ký tài khoản
            </button>

            <div className="text-center mt-4 small text-muted">
                Đã có tài khoản?{' '}
                <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold"
                    onClick={onSwitchToLogin}
                >
                    Đăng nhập
                </button>
            </div>
        </form>
    );
}