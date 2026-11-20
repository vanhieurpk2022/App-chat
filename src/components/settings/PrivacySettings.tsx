import { useState } from 'react';

export default function PrivacySettings() {
    const [showOnlineStatus, setShowOnlineStatus] = useState(true);
    const [readReceipts, setReadReceipts] = useState(true);
    const [typingIndicator, setTypingIndicator] = useState(true);
    const [showPhone, setShowPhone] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState('workspace');
    const [whoCanMessage, setWhoCanMessage] = useState('everyone');
    const [blockedUsers, setBlockedUsers] = useState<string[]>([
        'Tài khoản thử nghiệm #01'
    ]);
    const [savedNotice, setSavedNotice] = useState(false);

    const handleUnblock = (name: string) => {
        setBlockedUsers(prev => prev.filter(item => item !== name));
        triggerNotice();
    };

    const triggerNotice = () => {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    return (
        <div className="row g-4">
            {savedNotice && (
                <div className="col-12">
                    <div className="alert alert-success py-2 px-3 small m-0">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Đã cập nhật tùy chọn quyền riêng tư.
                    </div>
                </div>
            )}

            <div className="col-lg-8">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-3">Trạng thái & Trò chuyện</h6>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Hiển thị trạng thái hoạt động</div>
                            <div className="text-muted extra-small">Cho phép người khác thấy khi bạn đang online hoặc tạm vắng</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={showOnlineStatus}
                                onChange={(e) => {
                                    setShowOnlineStatus(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Xác nhận đã xem tin nhắn</div>
                            <div className="text-muted extra-small">Hiển thị trạng thái đã đọc khi bạn mở tin nhắn mới</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={readReceipts}
                                onChange={(e) => {
                                    setReadReceipts(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <div className="fw-semibold small">Hiển thị trạng thái đang gõ</div>
                            <div className="text-muted extra-small">Báo cho người trò chuyện biết khi bạn đang nhập tin nhắn</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={typingIndicator}
                                onChange={(e) => {
                                    setTypingIndicator(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-3">Hồ sơ & Kết nối</h6>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3">
                        <div>
                            <div className="fw-semibold small">Ai có thể xem thông tin hồ sơ</div>
                            <div className="text-muted extra-small">Kiểm soát phạm vi hiển thị thông tin cơ bản của bạn</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '210px' }}
                            value={profileVisibility}
                            onChange={(e) => {
                                setProfileVisibility(e.target.value);
                                triggerNotice();
                            }}
                        >
                            <option value="workspace">Mọi người trong không gian</option>
                            <option value="groups">Chỉ thành viên cùng nhóm</option>
                            <option value="only_me">Chỉ mình tôi</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3">
                        <div>
                            <div className="fw-semibold small">Ai có thể nhắn tin cho bạn</div>
                            <div className="text-muted extra-small">Giới hạn người có thể bắt đầu cuộc trò chuyện mới</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '210px' }}
                            value={whoCanMessage}
                            onChange={(e) => {
                                setWhoCanMessage(e.target.value);
                                triggerNotice();
                            }}
                        >
                            <option value="everyone">Tất cả liên hệ</option>
                            <option value="same_group">Chỉ người cùng nhóm</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <div className="fw-semibold small">Hiển thị số điện thoại</div>
                            <div className="text-muted extra-small">Cho phép đồng đội xem số điện thoại trên hồ sơ</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={showPhone}
                                onChange={(e) => {
                                    setShowPhone(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card-box">
                    <h6 className="fw-bold mb-3">Danh sách chặn ({blockedUsers.length})</h6>

                    {blockedUsers.length === 0 ? (
                        <p className="text-muted extra-small m-0">Bạn chưa chặn người dùng nào.</p>
                    ) : (
                        blockedUsers.map((user) => (
                            <div
                                key={user}
                                className="d-flex justify-content-between align-items-center py-2 border-bottom last:border-0"
                            >
                                <span className="small fw-medium">{user}</span>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary btn-sm py-0 px-2 extra-small"
                                    onClick={() => handleUnblock(user)}
                                >
                                    Bỏ chặn
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card-box">
                    <h6 className="fw-bold mb-2">
                        <i className="bi bi-shield-lock me-1 text-primary"></i> Tóm tắt quyền riêng tư
                    </h6>
                    <p className="text-muted extra-small mb-2">
                        Các cài đặt tại đây giúp bạn kiểm soát mức độ hiển thị trạng thái và thông tin cá nhân khi trao đổi trong nhóm.
                    </p>
                    <p className="text-muted extra-small m-0">
                        Mẹo: Khi tắt trạng thái hoạt động, người khác sẽ không thấy dấu hiệu đang trực tuyến của bạn.
                    </p>
                </div>
            </div>
        </div>
    );
}