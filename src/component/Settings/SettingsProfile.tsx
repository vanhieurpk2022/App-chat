import React, { useState } from 'react';
import './SettingsProfile.css';
export default function SettingsProfile() {
    const [activeMenu, setActiveMenu] = useState('personal');
    const [status, setStatus] = useState('Đang hoạt động');

    return (
        <div className="app-layout">
            <aside className="sidebar-narrow">
                <div className="nav-top">
                    <a href="#chat" className="nav-icon" title="Tin nhắn"><i className="bi bi-chat-dots"></i></a>
                    <a href="#contacts" className="nav-icon" title="Danh bạ"><i className="bi bi-person-lines-fill"></i></a>
                    <a href="#settings" className="nav-icon active" title="Cài đặt"><i className="bi bi-gear"></i></a>
                    <a href="#archive" className="nav-icon" title="Lưu trữ"><i className="bi bi-archive"></i></a>
                    <a href="#bookmark" className="nav-icon" title="Đánh dấu"><i className="bi bi-bookmark"></i></a>
                </div>
                <div className="nav-bottom">
                    <a href="#theme" className="nav-icon" title="Giao diện"><i className="bi bi-moon"></i></a>
                    <a href="#help" className="nav-icon" title="Trợ giúp"><i className="bi bi-question-circle"></i></a>
                    <div className="user-avatar-mini" title="Hoàng An">HA</div>
                </div>
            </aside>
        </div>
    )
}
