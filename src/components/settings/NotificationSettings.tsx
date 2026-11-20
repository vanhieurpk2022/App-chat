import { useState } from 'react';

export default function NotificationSettings() {
    const [directMessageNotif, setDirectMessageNotif] = useState(true);
    const [groupMessageNotif, setGroupMessageNotif] = useState(true);
    const [mentionOnlyInGroup, setMentionOnlyInGroup] = useState(false);
    const [callNotif, setCallNotif] = useState(true);
    const [friendRequestNotif, setFriendRequestNotif] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [notificationSound, setNotificationSound] = useState('default');
    const [showMessagePreview, setShowMessagePreview] = useState(true);
    const [emailDigest, setEmailDigest] = useState(false);
    const [dndEnabled, setDndEnabled] = useState(false);
    const [dndStart, setDndStart] = useState('22:00');
    const [dndEnd, setDndEnd] = useState('07:00');

    const [savedNotice, setSavedNotice] = useState(false);

    const triggerNotice = () => {
        setSavedNotice(true);
        setTimeout(() => setSavedNotice(false), 2500);
    };

    return (
        <div className="row g-4">

            <div className="col-lg-8">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-1">Thông báo trò chuyện & hoạt động</h6>
                    <p className="text-muted extra-small mb-3">
                        Chọn những hoạt động bạn muốn nhận thông báo ngay lập tức.
                    </p>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Tin nhắn trực tiếp</div>
                            <div className="text-muted extra-small">Nhận thông báo khi có tin nhắn riêng từ đồng đội</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={directMessageNotif}
                                onChange={(e) => {
                                    setDirectMessageNotif(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Tin nhắn nhóm</div>
                            <div className="text-muted extra-small">Nhận thông báo từ các nhóm dự án bạn tham gia</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={groupMessageNotif}
                                onChange={(e) => {
                                    setGroupMessageNotif(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Chỉ báo khi được nhắc tên (@mention)</div>
                            <div className="text-muted extra-small">Giảm làm phiền trong các nhóm đông thành viên</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={mentionOnlyInGroup}
                                disabled={!groupMessageNotif}
                                onChange={(e) => {
                                    setMentionOnlyInGroup(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Cuộc gọi thoại & video đến</div>
                            <div className="text-muted extra-small">Đổ chuông và hiển thị cửa sổ cuộc gọi đến</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={callNotif}
                                onChange={(e) => {
                                    setCallNotif(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <div className="fw-semibold small">Lời mời kết nối danh bạ</div>
                            <div className="text-muted extra-small">Báo khi có thành viên mới gửi lời mời kết nối</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={friendRequestNotif}
                                onChange={(e) => {
                                    setFriendRequestNotif(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-3">Âm thanh & Hiển thị</h6>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Âm thanh thông báo</div>
                            <div className="text-muted extra-small">Phát âm báo khi nhận tin nhắn mới</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={soundEnabled}
                                onChange={(e) => {
                                    setSoundEnabled(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom gap-3">
                        <div>
                            <div className="fw-semibold small">Kiểu chuông thông báo</div>
                            <div className="text-muted extra-small">Chọn âm thanh báo tin nhắn yêu thích</div>
                        </div>
                        <select
                            className="form-select form-select-sm"
                            style={{ width: '190px' }}
                            value={notificationSound}
                            disabled={!soundEnabled}
                            onChange={(e) => {
                                setNotificationSound(e.target.value);
                                triggerNotice();
                            }}
                        >
                            <option value="default">Mặc định</option>
                            <option value="chime">Chuông gió</option>
                            <option value="bubble">Bọt nước</option>
                            <option value="note">Nốt nhạc ngắn</option>
                        </select>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
                        <div>
                            <div className="fw-semibold small">Xem trước nội dung tin nhắn</div>
                            <div className="text-muted extra-small">Hiển thị đoạn trích nội dung tin nhắn trên thông báo nổi</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={showMessagePreview}
                                onChange={(e) => {
                                    setShowMessagePreview(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <div className="fw-semibold small">Tóm tắt qua Email</div>
                            <div className="text-muted extra-small">Gửi email tổng hợp tin nhắn bị lỡ khi bạn ngoại tuyến</div>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={emailDigest}
                                onChange={(e) => {
                                    setEmailDigest(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card-box">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <h6 className="fw-bold m-0">Lịch Không làm phiền</h6>
                            <p className="text-muted extra-small m-0 mt-1">
                                Tự động tắt âm báo trong khung giờ nghỉ ngơi của bạn.
                            </p>
                        </div>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={dndEnabled}
                                onChange={(e) => {
                                    setDndEnabled(e.target.checked);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>

                    <div className="row g-3 pt-2 border-top">
                        <div className="col-md-6">
                            <label className="form-label small fw-semibold">Bắt đầu từ</label>
                            <input
                                type="time"
                                className="form-control form-control-sm"
                                value={dndStart}
                                disabled={!dndEnabled}
                                onChange={(e) => {
                                    setDndStart(e.target.value);
                                    triggerNotice();
                                }}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label small fw-semibold">Kết thúc lúc</label>
                            <input
                                type="time"
                                className="form-control form-control-sm"
                                value={dndEnd}
                                disabled={!dndEnabled}
                                onChange={(e) => {
                                    setDndEnd(e.target.value);
                                    triggerNotice();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-4">
                <div className="card-box mb-4">
                    <h6 className="fw-bold mb-2">
                        <i className="bi bi-bell-fill me-1 text-primary"></i> Xem trước thông báo
                    </h6>
                    <p className="text-muted extra-small mb-3">
                        Cách thông báo hiển thị khi có tin nhắn mới gửi đến bạn:
                    </p>

                    <div className="p-3 rounded-3 border bg-light-subtle">
                        <div className="d-flex align-items-center justify-content-between mb-1">
                            <span className="fw-bold small">Nguyễn Mai</span>
                            <span className="text-muted extra-small">Vừa xong</span>
                        </div>
                        <div className="text-muted small">
                            {showMessagePreview
                                ? 'Chào An! Mình vừa hoàn thiện hướng hình ảnh cho website Mộc...'
                                : 'Bạn có 1 tin nhắn mới'}
                        </div>
                    </div>
                </div>

                <div className="card-box">
                    <h6 className="fw-bold mb-2">Trạng thái hiện tại</h6>
                    <div className="d-flex align-items-center gap-2 small">
                        <span className={`badge ${dndEnabled ? 'bg-danger-subtle text-danger' : 'bg-success-subtle text-success'}`}>
                            {dndEnabled ? `Tắt tiếng (${dndStart} - ${dndEnd})` : 'Đang bật thông báo'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}