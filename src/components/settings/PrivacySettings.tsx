import React, { useState } from 'react';

export default function PrivacySettings() {
    const [showOnlineStatus, setShowOnlineStatus] = useState(true);
    const [readReceipts, setReadReceipts] = useState(true);
    const [typingIndicator, setTypingIndicator] = useState(true);
    const [showPhone, setShowPhone] = useState(false);
    const [showEmail, setShowEmail] = useState(true);
    const [profileVisibility, setProfileVisibility] = useState('workspace');
    const [whoCanMessage, setWhoCanMessage] = useState('everyone');
    const [whoCanAddGroup, setWhoCanAddGroup] = useState('contacts');
    const [blockedUsers, setBlockedUsers] = useState<string[]>([
        'Tài khoản thử nghiệm #01'
    ]);
    const [newBlockInput, setNewBlockInput] = useState('');
    const [saveSearchHistory, setSaveSearchHistory] = useState(true);
    const [noticeText, setNoticeText] = useState<string | null>(null);

    const triggerNotice = (msg = '') => {
        setNoticeText(msg);
        setTimeout(() => setNoticeText(null), 2500);
    };

    const handleAddBlock = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = newBlockInput.trim();
        if (!trimmed) return;
        if (!blockedUsers.includes(trimmed)) {
            setBlockedUsers(prev => [...prev, trimmed]);
            triggerNotice(`Đã thêm "${trimmed}" vào danh sách chặn.`);
        }
        setNewBlockInput('');
    };

    const handleUnblock = (name: string) => {
        setBlockedUsers(prev => prev.filter(item => item !== name));
        triggerNotice(`Đã bỏ chặn "${name}".`);
    };

    const handleClearLocalData = () => {
        triggerNotice('Đã xóa lịch sử tìm kiếm và bộ nhớ đệm cục bộ.');
    };

    return (
        <div className="row g-4">
            {noticeText && (
                <div className="col-12">
                    <div className="alert alert-success py-2 px-3 small m-0">
                        <i className="bi bi-check-circle-fill me-2"></i>
                        {noticeText}
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
                    <h6 className="fw-bold mb-3">Hồ sơ, Nhóm & Kết nối</h6>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3">
                        <div>
                            <div className="fw-semibold small">Ai có thể xem thông tin hồ sơ</div>
                            <div className="text-muted extra-small">Kiểm soát phạm vi hiển thị chức danh, bộ phận và múi giờ</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '215px' }}
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
                            <div className="fw-semibold small">Ai có thể nhắn tin trực tiếp</div>
                            <div className="text-muted extra-small">Giới hạn người có thể bắt đầu cuộc trò chuyện mới với bạn</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '215px' }}
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

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3">
                        <div>
                            <div className="fw-semibold small">Ai có thể thêm bạn vào nhóm</div>
                            <div className="text-muted extra-small">Kiểm soát lời mời tham gia phòng chat nhóm mới</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '215px' }}
                            value={whoCanAddGroup}
                            onChange={(e) => {
                                setWhoCanAddGroup(e.target.value);
                                triggerNotice();
                            }}
                        >
                            <option value="everyone">Mọi người trong không gian</option>
                            <option value="contacts">Chỉ liên hệ trong danh bạ</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Hiển thị địa chỉ email</div>
                            <div className="text-muted extra-small">Cho phép đồng đội thấy email công việc trên thẻ thông tin</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={showEmail}
                                onChange={(e) => {
                                    setShowEmail(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
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

                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-1">Danh sách chặn ({blockedUsers.length})</h6>
                    <p className="text-muted extra-small mb-3">
                        Người bị chặn sẽ không thể gửi tin nhắn hoặc gọi điện cho bạn.
                    </p>

                    <form onSubmit={handleAddBlock} className="d-flex gap-2 mb-3">
                        <input
                            type="text"
                            className="form-control form-control-sm"
                            placeholder="Nhập tên hoặc email người dùng muốn chặn..."
                            value={newBlockInput}
                            onChange={(e) => setNewBlockInput(e.target.value)}
                        />
                        <button type="submit" className="btn btn-outline-danger btn-sm px-3 flex-shrink-0">
                            Chặn
                        </button>
                    </form>

                    {blockedUsers.length === 0 ? (
                        <p className="text-muted extra-small m-0">Bạn chưa chặn người dùng nào.</p>
                    ) : (
                        blockedUsers.map((user, index) => (
                            <div
                                key={user}
                                className={`d-flex justify-content-between align-items-center py-2 ${index !== blockedUsers.length - 1 ? 'border-bottom' : ''}`}
                            >
                                <div className="d-flex align-items-center gap-2">
                                    <i className="bi bi-slash-circle text-danger small"></i>
                                    <span className="small fw-medium">{user}</span>
                                </div>
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

                <div className="card-box">
                    <h6 className="fw-bold mb-3">Dữ liệu & Lịch sử</h6>

                    <div className="d-flex justify-content-between align-items-center py-2 border-bottom mb-3">
                        <div>
                            <div className="fw-semibold small">Lưu lịch sử tìm kiếm gần đây</div>
                            <div className="text-muted extra-small">Ghi nhớ các từ khóa tìm kiếm bạn bè và tin nhắn trên trình duyệt</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={saveSearchHistory}
                                onChange={(e) => {
                                    setSaveSearchHistory(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-semibold small">Dọn dẹp dữ liệu tạm trên thiết bị</div>
                            <div className="text-muted extra-small">Xóa lịch sử tìm kiếm và bộ nhớ đệm giao diện</div>
                        </div>
                        <button
                            type="button"
                            className="btn btn-outline-secondary btn-sm"
                            onClick={handleClearLocalData}
                        >
                            Xóa dữ liệu tạm
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-2">
                        <i className="bi bi-shield-lock me-1 text-primary"></i> Tóm tắt quyền riêng tư
                    </h6>
                    <ul className="list-unstyled text-muted extra-small d-flex flex-column gap-2 m-0">
                        <li>
                            • Trạng thái online: <strong className="text-dark">{showOnlineStatus ? 'Đang hiển thị' : 'Đang ẩn'}</strong>
                        </li>
                        <li>
                            • Xác nhận đã xem: <strong className="text-dark">{readReceipts ? 'Bật' : 'Tắt'}</strong>
                        </li>
                        <li>
                            • Hiển thị số điện thoại: <strong className="text-dark">{showPhone ? 'Công khai' : 'Chỉ mình tôi'}</strong>
                        </li>
                        <li>
                            • Tài khoản đã chặn: <strong className="text-dark">{blockedUsers.length}</strong>
                        </li>
                    </ul>
                </div>

                <div className="card-box">
                    <h6 className="fw-bold mb-2">Lưu ý bảo mật</h6>
                    <p className="text-muted extra-small m-0">
                        Khi tắt trạng thái hoạt động hoặc xác nhận đã xem, bạn cũng sẽ không nhìn thấy thông tin tương ứng từ người khác.
                    </p>
                </div>
            </div>
        </div>
    );
}