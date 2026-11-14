export default function SecuritySettings() {
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
                        <button className="btn btn-outline-secondary btn-sm">Thay đổi</button>
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
                    <h6 className="fw-bold mb-3">Thiết bị đăng nhập</h6>
                    <div className="security-list-item border-bottom pb-3 mb-3">
                        <div className="text-muted fs-5"><i className="bi bi-laptop"></i></div>
                        <div className="flex-grow-1">
                            <div className="fw-semibold small">Windows PC • Chrome (Phiên hiện tại)</div>
                            <div className="text-muted extra-small">Hồ Chí Minh, Việt Nam • Hoạt động gần đây</div>
                        </div>
                        <span className="badge bg-success-subtle text-success small">Đang dùng</span>
                    </div>
                </div>
            </div>
        </div>
    );
}