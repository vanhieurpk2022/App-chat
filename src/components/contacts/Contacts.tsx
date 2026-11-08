
import { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faCircle,
    faStar,
    faUserPlus,
    faSearch,
    faSliders,
    faEnvelope,
    faBriefcase,
    faLocationDot,
    faPhone,
    faComment,
    faEllipsis,
    faPen,
    faPlus,
    faChevronLeft,
    faChevronRight,
    faUserGroup
} from '@fortawesome/free-solid-svg-icons';

import LeftSideBar from '../utils/LeftSideBar';
import { contactsData, type Contact } from './ContactsData';
import './Contacts.css';

const PAGE_SIZE = 10;

export default function Contacts() {
    const [contacts, setContacts] = useState<Contact[]>(contactsData);
    const [selectedId, setSelectedId] = useState<number>(1);
    const [search, setSearch] = useState('');
    const [department, setDepartment] = useState('Tất cả');
    const [status, setStatus] = useState('Tất cả');
    const [category, setCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const selectedContact = contacts.find(item => item.id === selectedId) ?? contacts[0];

    const filteredContacts = useMemo(() => {
        return contacts.filter(contact => {
            const keyword = search.toLowerCase();

            const matchesSearch =
                contact.name.toLowerCase().includes(keyword) ||
                contact.email.toLowerCase().includes(keyword) ||
                contact.department.toLowerCase().includes(keyword);

            const matchesDepartment =
                department === 'Tất cả' || contact.department === department;

            const matchesStatus =
                status === 'Tất cả' || contact.status === status;

            const matchesCategory =
                category === 'all' ||
                (category === 'active' && contact.status === 'Đang hoạt động') ||
                (category === 'favorite' && contact.favorite);

            return matchesSearch && matchesDepartment && matchesStatus && matchesCategory;
        });
    }, [contacts, search, department, status, category]);

    const totalPages = Math.max(1, Math.ceil(filteredContacts.length / PAGE_SIZE));

    const pageContacts = filteredContacts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const changeCategory = (value: string) => {
        setCategory(value);
        setCurrentPage(1);
    };

    const toggleFavorite = (id: number) => {
        setContacts(prev =>
            prev.map(contact =>
                contact.id === id
                    ? { ...contact, favorite: !contact.favorite }
                    : contact
            )
        );
    };

    const activeCount = contacts.filter(
        item => item.status === 'Đang hoạt động'
    ).length;

    const favoriteCount = contacts.filter(item => item.favorite).length;

    const departments = ['Tất cả', 'Thiết kế', 'Phát triển', 'Vận hành', 'Nội dung'];

    return (
        <div className="contacts-app">

            {/* Sidebar điều hướng chính */}
            <div className="contacts-main-sidebar">
                <LeftSideBar isUser={true} />
            </div>

            {/* Sidebar Danh bạ */}
            <aside className="contacts-sidebar">
                <div className="contacts-workspace">
                    <span>/</span>
                    <span>Không gian sáng tạo</span>
                    <span>⌄</span>
                </div>

                <div className="contacts-sidebar-heading">
                    <h2>Danh bạ</h2>
                    <p>Kết nối trong không gian của bạn</p>
                </div>

                <div className="contacts-menu">
                    <button
                        className={`contacts-menu-item ${category === 'all' ? 'selected' : ''}`}
                        onClick={() => changeCategory('all')}
                    >
                        <FontAwesomeIcon icon={faUsers} />
                        <span>Tất cả liên hệ</span>
                        <small>{contacts.length}</small>
                    </button>

                    <button
                        className={`contacts-menu-item ${category === 'active' ? 'selected' : ''}`}
                        onClick={() => changeCategory('active')}
                    >
                        <FontAwesomeIcon icon={faCircle} />
                        <span>Đang hoạt động</span>
                        <small>{activeCount}</small>
                    </button>

                    <button
                        className={`contacts-menu-item ${category === 'favorite' ? 'selected' : ''}`}
                        onClick={() => changeCategory('favorite')}
                    >
                        <FontAwesomeIcon icon={faStar} />
                        <span>Yêu thích</span>
                        <small>{favoriteCount}</small>
                    </button>

                    <button className="contacts-menu-item">
                        <FontAwesomeIcon icon={faUserPlus} />
                        <span>Lời mời kết nối</span>
                        <small>2</small>
                    </button>
                </div>

                <div className="contacts-group-heading">
                    <span>NHÓM CỦA BẠN</span>
                    <button title="Thêm nhóm">
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                <div className="contacts-groups">
                    <button>
                        <i className="group-dot dot-purple" />
                        <span>Đội ngũ thiết kế</span>
                        <small>6</small>
                    </button>
                    <button>
                        <i className="group-dot dot-green" />
                        <span>Dự án Mộc</span>
                        <small>5</small>
                    </button>
                    <button>
                        <i className="group-dot dot-blue" />
                        <span>Mầm Studio</span>
                        <small>12</small>
                    </button>
                </div>

                <div className="contacts-invite">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <h4>Cùng nhau làm điều hay</h4>
                    <p>Mời đồng đội tham gia và kết nối trong Mầm Studio.</p>
                    <button>+ Mời thành viên</button>
                </div>

                <div className="contacts-sync">
                    <span>♧</span> Danh bạ đã được đồng bộ
                </div>
            </aside>

            {/* Khu vực danh sách liên hệ */}
            <main className="contacts-center">

                <header className="contacts-center-header">
                    <div>
                        <strong>
                            {category === 'all' && 'Tất cả liên hệ'}
                            {category === 'active' && 'Đang hoạt động'}
                            {category === 'favorite' && 'Yêu thích'}
                        </strong>
                        <span className="contacts-total">{filteredContacts.length}</span>
                    </div>

                    <button className="contacts-add-button">
                        <FontAwesomeIcon icon={faUserPlus} />
                        Thêm liên hệ
                    </button>
                </header>

                <div className="contacts-toolbar">
                    <div className="contacts-search">
                        <FontAwesomeIcon icon={faSearch} />
                        <input
                            type="text"
                            placeholder="Tìm theo tên, email hoặc bộ phận"
                            value={search}
                            onChange={event => {
                                setSearch(event.target.value);
                                setCurrentPage(1);
                            }}
                        />
                        <span>⌘ K</span>
                    </div>

                    <div className="contacts-filter-row">
                        <div className="contacts-filter-left">
                            <div className="contacts-select-wrap">
                                <FontAwesomeIcon icon={faSliders} />
                                <select
                                    value={department}
                                    onChange={event => {
                                        setDepartment(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    {departments.map(item => (
                                        <option key={item} value={item}>
                                            {item === 'Tất cả' ? 'Bộ phận' : item}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="contacts-select-wrap">
                                <select
                                    value={status}
                                    onChange={event => {
                                        setStatus(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                >
                                    <option value="Tất cả">Trạng thái</option>
                                    <option value="Đang hoạt động">Đang hoạt động</option>
                                    <option value="Tạm vắng">Tạm vắng</option>
                                    <option value="Hoạt động hôm qua">Hoạt động hôm qua</option>
                                    <option value="Hoạt động 2 giờ trước">Hoạt động 2 giờ trước</option>
                                </select>
                            </div>
                        </div>

                        <span className="contacts-sort">Sắp xếp: <b>Gần đây</b>⌄</span>
                    </div>
                </div>

                <div className="contacts-table-heading">
                    <span>LIÊN HỆ</span>
                    <span>BỘ PHẬN</span>
                    <span>TRẠNG THÁI</span>
                    <span />
                </div>

                <div className="contacts-list">
                    {pageContacts.length > 0 ? pageContacts.map(contact => (
                        <div
                            key={contact.id}
                            className={`contacts-row ${selectedId === contact.id ? 'active-row' : ''}`}
                            onClick={() => setSelectedId(contact.id)}
                        >
                            <div className="contacts-person">
                                {contact.avatar ? (
                                    <img src={contact.avatar} alt={contact.name} />
                                ) : (
                                    <div className="contacts-avatar-placeholder">
                                        {contact.initials}
                                    </div>
                                )}

                                <div>
                                    <strong>{contact.name}</strong>
                                    <small>{contact.job}</small>
                                </div>
                            </div>

                            <span className="contacts-department">{contact.department}</span>

                            <span className="contacts-status">
                                <i className={`status-dot ${
                                    contact.status === 'Đang hoạt động'
                                        ? 'online'
                                        : contact.status === 'Tạm vắng'
                                            ? 'away'
                                            : 'offline'
                                }`} />
                                {contact.status}
                            </span>

                            <button
                                className={`contacts-favorite ${contact.favorite ? 'is-favorite' : ''}`}
                                onClick={event => {
                                    event.stopPropagation();
                                    toggleFavorite(contact.id);
                                }}
                                title="Yêu thích"
                            >
                                <FontAwesomeIcon icon={faStar} />
                            </button>
                        </div>
                    )) : (
                        <div className="contacts-empty">
                            Không tìm thấy liên hệ phù hợp.
                        </div>
                    )}
                </div>

                <footer className="contacts-pagination">
                    <span>
                        Hiển thị {filteredContacts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
                        {' '}đến {Math.min(currentPage * PAGE_SIZE, filteredContacts.length)}
                        {' '}trong {filteredContacts.length} liên hệ
                    </span>

                    <div>
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(page => page - 1)}
                        >
                            <FontAwesomeIcon icon={faChevronLeft} />
                        </button>

                        {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                            <button
                                key={page}
                                className={currentPage === page ? 'current-page' : ''}
                                onClick={() => setCurrentPage(page)}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(page => page + 1)}
                        >
                            <FontAwesomeIcon icon={faChevronRight} />
                        </button>
                    </div>
                </footer>
            </main>

            {/* Khu vực chi tiết liên hệ */}
            <aside className="contacts-detail">
                <header className="contacts-detail-header">
                    <strong>Thông tin liên hệ</strong>
                    <button title="Tùy chọn">
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                </header>

                {selectedContact && (
                    <>
                        <section className="contacts-profile">
                            {selectedContact.avatar ? (
                                <img
                                    className="contacts-profile-avatar"
                                    src={selectedContact.avatar}
                                    alt={selectedContact.name}
                                />
                            ) : (
                                <div className="contacts-profile-avatar contacts-profile-placeholder">
                                    {selectedContact.initials}
                                </div>
                            )}

                            <h2>{selectedContact.name}</h2>
                            <p>{selectedContact.job}</p>

                            <span className="contacts-team-badge">
                                <FontAwesomeIcon icon={faUserGroup} />
                                Mầm Studio
                            </span>

                            <div className="contacts-actions">
                                <button className="message-button">
                                    <FontAwesomeIcon icon={faComment} />
                                    Nhắn tin
                                </button>
                                <button className="call-button">
                                    <FontAwesomeIcon icon={faPhone} />
                                    Gọi điện
                                </button>
                                <button
                                    className={`detail-favorite ${selectedContact.favorite ? 'is-favorite' : ''}`}
                                    onClick={() => toggleFavorite(selectedContact.id)}
                                >
                                    <FontAwesomeIcon icon={faStar} />
                                </button>
                            </div>
                        </section>

                        <section className="contacts-info-section">
                            <h4>Thông tin cá nhân</h4>

                            <div className="contacts-info-item">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <div>
                                    <small>Địa chỉ email</small>
                                    <p>{selectedContact.email}</p>
                                </div>
                            </div>

                            <div className="contacts-info-item">
                                <FontAwesomeIcon icon={faBriefcase} />
                                <div>
                                    <small>Bộ phận</small>
                                    <p>{selectedContact.department}</p>
                                </div>
                            </div>

                            <div className="contacts-info-item">
                                <FontAwesomeIcon icon={faLocationDot} />
                                <div>
                                    <small>Địa điểm & giờ địa phương</small>
                                    <p>{selectedContact.location} · 10:42</p>
                                </div>
                            </div>
                        </section>

                        <section className="contacts-common-groups">
                            <div className="contacts-section-title">
                                <h4>Nhóm chung</h4>
                                <small>{selectedContact.groups.length} nhóm</small>
                            </div>

                            {selectedContact.groups.map((group, index) => (
                                <div className="contacts-common-group" key={group}>
                                    <div className={`common-group-avatar group-color-${index}`}>
                                        {group === 'Đội ngũ thiết kế' ? 'TK' : group === 'Dự án Mộc' ? 'M' : 'MS'}
                                    </div>
                                    <div>
                                        <strong>{group}</strong>
                                        <small>{group === 'Đội ngũ thiết kế' ? '6 thành viên · Nhóm nội bộ' : '5 thành viên · Dự án'}</small>
                                    </div>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </div>
                            ))}
                        </section>

                        <section className="contacts-note">
                            <div className="contacts-section-title">
                                <h4>Ghi chú riêng</h4>
                                <button title="Chỉnh sửa ghi chú">
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                            </div>
                            <p>{selectedContact.note}</p>
                            <small>♙ Chỉ bạn nhìn thấy ghi chú này</small>
                        </section>
                    </>
                )}
            </aside>
        </div>
    );
}