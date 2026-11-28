import {useMemo, useState, type FormEvent} from 'react';
import { useNavigate } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUsers,
    faCircle,
    faStar,
    faUserPlus,
    faEnvelope,
    faBriefcase,
    faLocationDot,
    faPhone,
    faComment,
    faEllipsis,
    faPen,
    faPlus,
    faChevronRight,
    faUserGroup
} from '@fortawesome/free-solid-svg-icons';

import LeftSideBar from '../utils/LeftSideBar';
import ContactSearch from './ContactSearch';
import ContactsList from './ContactsList';
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
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditingNote, setIsEditingNote] = useState(false);
    const [noteDraft, setNoteDraft] = useState('');
    const [sortBy, setSortBy] = useState('default');
    const [groups, setGroups] = useState<string[]>(() =>
        Array.from(new Set(contactsData.flatMap(contact => contact.groups)))
    );
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');
    const [groupError, setGroupError] = useState('');
    const [isManageGroupsOpen, setIsManageGroupsOpen] = useState(false);
    const [groupDraft, setGroupDraft] = useState<string[]>([]);
    const navigate = useNavigate();

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

            const matchesGroup =
                selectedGroup === null || contact.groups.includes(selectedGroup);

            return (matchesSearch && matchesDepartment && matchesStatus && matchesCategory && matchesGroup);
        });
    }, [contacts, search, department, status, category, selectedGroup]);

    const sortedContacts = useMemo(() => {
        const result = [...filteredContacts];
        switch (sortBy) {
            case 'name-asc':
                result.sort((a, b) =>
                    a.name.localeCompare(b.name, 'vi')
                );
                break;
            case 'name-desc':
                result.sort((a, b) =>
                    b.name.localeCompare(a.name, 'vi')
                );
                break;
            case 'department':
                result.sort((a, b) =>
                    a.department.localeCompare(b.department, 'vi')
                );
                break;
            case 'status':
                result.sort((a, b) =>
                    a.status.localeCompare(b.status, 'vi')
                );
                break;
            default:
                break;
        }
        return result;
    }, [filteredContacts, sortBy]);

    const totalPages = Math.max(1, Math.ceil(filteredContacts.length / PAGE_SIZE));

    const pageContacts = sortedContacts.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const changeCategory = (value: string) => {
        setCategory(value);
        setSelectedGroup(null);
        setCurrentPage(1);
    };

    const handleSelectGroup = (groupName: string) => {
        setSelectedGroup(groupName);
        setCategory('all');
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

    const handleSaveNote = () => {
        if (!selectedContact) return;

        setContacts(prev =>
            prev.map(contact =>
                contact.id === selectedContact.id
                    ? { ...contact, note: noteDraft.trim() }
                    : contact
            )
        );

        setIsEditingNote(false);
    };

    const handleCancelNote = () => {
        setNoteDraft(selectedContact?.note ?? '');
        setIsEditingNote(false);
    };

    const handleAddContact = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = String(formData.get('name') || '').trim();
        const email = String(formData.get('email') || '').trim();
        const job = String(formData.get('job') || '').trim();
        const department = String(formData.get('department') || '');
        const location = String(formData.get('location') || '').trim();

        if (!name || !email || !job || !department || !location) {
            return;
        }

        const initials = name
            .split(/\s+/)
            .map(word => word[0])
            .slice(-2)
            .join('')
            .toUpperCase();

        const newContact: Contact = {
            id: Math.max(0, ...contacts.map(contact => contact.id)) + 1, name, email, job, department,
            status: 'Đang hoạt động', location, avatar: '', initials, favorite: false, groups: [], note: ''
        };

        setContacts(prev => [newContact, ...prev]);

        // Chuyển về danh sách tất cả liên hệ
        setCategory('all');
        setSearch('');
        setDepartment('Tất cả');
        setStatus('Tất cả');
        setCurrentPage(1);

        // Chọn liên hệ vừa tạo
        setSelectedId(newContact.id);

        // Đóng biểu mẫu
        setIsAddModalOpen(false);
    };

    const handleCreateGroup = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const groupName = newGroupName.trim();
        if (!groupName) {
            setGroupError('Vui lòng nhập tên nhóm.');
            return;
        }
        const isDuplicate = groups.some(
            group => group.toLowerCase() === groupName.toLowerCase()
        );
        if (isDuplicate) {
            setGroupError('Tên nhóm này đã tồn tại.');
            return;
        }
        setGroups(prev => [...prev, groupName]);
        setNewGroupName('');
        setGroupError('');
        setIsGroupModalOpen(false);
    };

    const handleOpenManageGroups = () => {
        if (!selectedContact) return;

        // Lấy các nhóm mà liên hệ hiện tại đang tham gia
        setGroupDraft([...selectedContact.groups]);
        setIsManageGroupsOpen(true);
    };

    const handleSaveContactGroups = () => {
        if (!selectedContact) return;

        setContacts(prev =>
            prev.map(contact =>
                contact.id === selectedContact.id
                    ? { ...contact, groups: [...groupDraft] }
                    : contact
            )
        );

        setIsManageGroupsOpen(false);
    };

    const activeCount = contacts.filter(
        item => item.status === 'Đang hoạt động'
    ).length;

    const favoriteCount = contacts.filter(item => item.favorite).length;

    return (
        <div className="contacts-app">

            <div className="contacts-main-sidebar">
                <LeftSideBar isUser={true} />
            </div>

            <aside className="contacts-sidebar">
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
                    <button title="Thêm nhóm" onClick={() => {
                            setNewGroupName('');
                            setGroupError('');
                            setIsGroupModalOpen(true);
                    }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </div>

                <div className="contacts-groups">
                    {groups.map((group, index) => {
                        const memberCount = contacts.filter(contact => contact.groups.includes(group)).length;

                        return (
                            <button key={group} className={selectedGroup === group ? 'selected' : ''} onClick={() => handleSelectGroup(group)}>
                                <i className={`group-dot dot-${index % 3}`} />
                                <span>{group}</span>
                                <small>{memberCount}</small>
                            </button>
                        );
                    })}
                </div>

                <div className="contacts-invite">
                    <FontAwesomeIcon icon={faUserPlus} />
                    <h4>Cùng nhau làm điều hay</h4>
                    <p>Mời đồng đội tham gia và kết nối trong Mầm Studio.</p>
                    <button>+ Mời thành viên</button>
                </div>

                <div className="contacts-sync">
                    Danh bạ đã được đồng bộ
                </div>
            </aside>

            <main className="contacts-center">

                <header className="contacts-center-header">
                    <div>
                        <strong>
                            {selectedGroup ? selectedGroup
                                : category === 'all' ? 'Tất cả liên hệ'
                                    : category === 'active' ? 'Đang hoạt động'
                                        : 'Yêu thích'}
                        </strong>
                        <span className="contacts-total">{filteredContacts.length}</span>
                    </div>

                    <button className="contacts-add-button" onClick={() => setIsAddModalOpen(true)}>
                        <FontAwesomeIcon icon={faUserPlus} />
                        Thêm liên hệ
                    </button>
                </header>

                <ContactSearch
                    search={search}
                    onSearchChange={value => {
                        setSearch(value);
                        setCurrentPage(1);
                    }}
                    department={department}
                    onDepartmentChange={value => {
                        setDepartment(value);
                        setCurrentPage(1);
                    }}
                    status={status}
                    onStatusChange={value => {
                        setStatus(value);
                        setCurrentPage(1);
                    }}
                    sortBy={sortBy}
                    onSortChange={value => {
                        setSortBy(value);
                        setCurrentPage(1);
                    }}
                />

                <ContactsList
                    pageContacts={pageContacts}
                    selectedId={selectedId}
                    filteredCount={filteredContacts.length}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    pageSize={PAGE_SIZE}
                    onSelect={setSelectedId}
                    onToggleFavorite={toggleFavorite}
                    onPageChange={setCurrentPage}
                />
            </main>

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
                                <button type="button"
                                    onClick={() => {
                                        if (!selectedContact) return;
                                        navigate(`/chat?contactId=${encodeURIComponent(String(selectedContact.id))}`);
                                    }}>
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
                                <h4>Nhóm của liên hệ</h4>
                                <button type="button" onClick={handleOpenManageGroups} title="Quản lý nhóm">
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
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
                                {!isEditingNote && (
                                    <button title="Chỉnh sửa ghi chú" onClick={() => {setNoteDraft(selectedContact.note ?? '');setIsEditingNote(true);}}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                )}
                            </div>
                            {isEditingNote ? (
                                <div className="contacts-note-editor"><textarea value={noteDraft} onChange={event => setNoteDraft(event.target.value)} placeholder="Nhập ghi chú riêng..." rows={4}/>
                                    <div className="contacts-note-actions">
                                        <button type="button" onClick={handleCancelNote}>Hủy</button>
                                        <button type="button" onClick={handleSaveNote}>Lưu ghi chú</button>
                                    </div>
                                </div>
                            ):(<p> {selectedContact.note || 'Chưa có ghi chú riêng.'}</p>)}
                            <small>Chỉ bạn nhìn thấy ghi chú này</small>
                        </section>
                    </>
                )}
            </aside>
            {isAddModalOpen && (
                <div className="contacts-modal-overlay">
                    <div className="contacts-modal">
                        <div className="contacts-modal-header">
                            <h3>Thêm liên hệ mới</h3>

                            <button
                                type="button"
                                onClick={() => setIsAddModalOpen(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleAddContact}>
                            <label>Họ và tên</label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Nhập họ và tên"
                                required
                            />

                            <label>Email</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="example@email.com"
                                required
                            />

                            <label>Chức vụ</label>
                            <input
                                name="job"
                                type="text"
                                placeholder="Nhập chức vụ"
                                required
                            />

                            <label>Bộ phận</label>
                            <select name="department" required defaultValue="">
                                <option value="" disabled>Chọn bộ phận</option>
                                <option value="Thiết kế">Thiết kế</option>
                                <option value="Phát triển">Phát triển</option>
                                <option value="Vận hành">Vận hành</option>
                                <option value="Nội dung">Nội dung</option>
                            </select>

                            <label>Địa điểm</label>
                            <input
                                name="location"
                                type="text"
                                placeholder="Nhập địa điểm"
                                required
                            />

                            <div className="contacts-modal-actions">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                >
                                    Hủy
                                </button>

                                <button type="submit">
                                    Thêm liên hệ
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isGroupModalOpen && (
                <div className="contacts-modal-overlay">
                    <div className="contacts-modal">
                        <div className="contacts-modal-header">
                            <h3>Tạo nhóm mới</h3>
                            <button type="button" onClick={() => setIsGroupModalOpen(false)}> × </button>
                        </div>

                        <form onSubmit={handleCreateGroup}>
                            <label>Tên nhóm</label>
                            <input
                                type="text"
                                value={newGroupName}
                                onChange={event => {
                                    setNewGroupName(event.target.value);
                                    setGroupError('');
                                }}
                                placeholder="Nhập tên nhóm..."
                                autoFocus
                            />

                            {groupError && (
                                <p className="contacts-form-error">{groupError}</p>
                            )}
                            <div className="contacts-modal-actions">
                                <button type="button" onClick={() => setIsGroupModalOpen(false)}>
                                    Hủy
                                </button>
                                <button type="submit">
                                    Tạo nhóm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isManageGroupsOpen && selectedContact && (
                <div className="contacts-modal-overlay">
                    <div className="contacts-modal">
                        <div className="contacts-modal-header">
                            <h3>Quản lý nhóm</h3>
                            <button type="button" onClick={() => setIsManageGroupsOpen(false)}> × </button>
                        </div>

                        <p className="contacts-manage-description"> Chọn nhóm mà {selectedContact.name} muốn tham gia. </p>

                        <div className="contacts-group-checkboxes">
                            {groups.map(group => (
                                <label key={group}>
                                    <input
                                        type="checkbox"
                                        checked={groupDraft.includes(group)}
                                        onChange={event => {
                                            if (event.target.checked) {
                                                setGroupDraft(prev => [
                                                    ...prev,
                                                    group
                                                ]);
                                            } else {
                                                setGroupDraft(prev =>
                                                    prev.filter(item => item !== group)
                                                );
                                            }
                                        }}
                                    />
                                    <span>{group}</span>
                                </label>
                            ))}
                        </div>

                        <div className="contacts-modal-actions">
                            <button type="button" onClick={() => setIsManageGroupsOpen(false)}>
                                Hủy
                            </button>

                            <button type="button" onClick={handleSaveContactGroups}>
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}