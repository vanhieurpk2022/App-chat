export default function NotificationSettings() {
    return (
        <div className="row g-4">
            <div className="col-lg-8">
                <div className="card-box">
                    <h6 className="fw-bold mb-3">Tùy chọn thông báo</h6>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Thông báo tin nhắn mới</div>
                            <div className="text-muted extra-small">Phát âm thanh và hiển thị popup khi có tin nhắn</div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <div className="fw-semibold small">Thông báo qua Email</div>
                            <div className="text-muted extra-small">Nhận thông báo tóm tắt hoạt động qua email hàng tuần</div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}