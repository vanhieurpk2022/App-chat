import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginSuccess } from '../../store/authSlice';

interface LoginFormProps {
    onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        const cleanUser = username.trim();
        if (!cleanUser || !password) {
            setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.');
            return;
        }
        if (password.length < 4) {
            setError('Mật khẩu phải có ít nhất 4 ký tự.');
            return;
        }
        setLoading(true);
        setTimeout(() => {
            dispatch(
                loginSuccess({
                    user: cleanUser,
                    token: 'token_' + Date.now()
                })
            );
            setLoading(false);
            navigate('/chat');
        }, 500);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <h4 className="fw-bold mb-1">Chào mừng trở lại</h4>
                <p className="text-muted small">Đăng nhập để tiếp tục trò chuyện cùng đồng đội</p>
            </div>

            {error && (
                <div className="alert alert-danger py-2 px-3 small">
                    <i className="bi bi-exclamation-circle me-2"></i>
                    {error}
                </div>
            )}

            <div className="mb-3">
                <label className="form-label small fw-semibold">Tên đăng nhập hoặc Email</label>
                <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light">
                        <i className="bi bi-person"></i>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Ví dụ: hoang_an hoặc an@mam.studio"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
            </div>

            <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                    <label className="form-label small fw-semibold mb-1">Mật khẩu</label>
                    <span className="text-primary extra-small" style={{ cursor: 'pointer' }}>
                        Quên mật khẩu?
                    </span>
                </div>
                <div className="input-group input-group-sm">
                    <span className="input-group-text bg-light">
                        <i className="bi bi-lock"></i>
                    </span>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập mật khẩu của bạn"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div className="form-check mb-4">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberCheck"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label small text-muted" htmlFor="rememberCheck">
                    Ghi nhớ phiên đăng nhập
                </label>
            </div>

            <button
                type="submit"
                className="btn btn-primary btn-sm w-100 py-2 fw-semibold rounded-3"
                disabled={loading}
            >
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div className="text-center mt-4 small text-muted">
                Chưa có tài khoản?{' '}
                <button
                    type="button"
                    className="btn btn-link btn-sm p-0 text-decoration-none fw-semibold"
                    onClick={onSwitchToRegister}
                >
                    Đăng ký ngay
                </button>
            </div>
        </form>
    );
}