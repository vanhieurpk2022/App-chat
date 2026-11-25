import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthLayout() {
    const [mode, setMode] = useState<'login' | 'register'>('login');

    return (
        <div
            className="min-vh-100 d-flex align-items-center justify-content-center p-3"
            style={{ backgroundColor: '#f4f6f9' }}
        >
            <div
                className="bg-white rounded-4 shadow-sm border p-4 p-md-5 w-100"
                style={{ maxWidth: '430px' }}
            >
                <div className="d-flex align-items-center gap-2 mb-4">
                    <div
                        className="d-flex align-items-center justify-content-center rounded-3 bg-primary text-white fw-bold"
                        style={{ width: '36px', height: '36px' }}
                    >
                        <i className="bi bi-chat-dots-fill"></i>
                    </div>
                    <div>
                        <div className="fw-bold lh-1">QMes Chat</div>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                            Kết nối & làm việc nhóm
                        </small>
                    </div>
                </div>

                {mode === 'login' ? (
                    <LoginForm onSwitchToRegister={() => setMode('register')} />
                ) : (
                    <RegisterForm onSwitchToLogin={() => setMode('login')} />
                )}
            </div>
        </div>
    );
}