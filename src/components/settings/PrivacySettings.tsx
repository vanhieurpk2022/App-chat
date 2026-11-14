export default function PrivacySettings() {
    return (
        <div className="row g-4">
            <div className="col-lg-8">
                <div className="card-box">
                    <h6 className="fw-bold mb-3">Quyền riêng tư hồ sơ</h6>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Hiển thị trạng thái hoạt động</div>
                            <div className="text-muted extra-small">Cho phép đồng nghiệp thấy khi nào bạn trực tuyến</div>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" defaultChecked />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Hiển thị số điện thoại</div>
                            <div className="text-muted extra-small">Chỉ hiển thị với bạn và quản trị viên không gian</div>
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