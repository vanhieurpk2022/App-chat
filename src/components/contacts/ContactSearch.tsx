
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSliders } from '@fortawesome/free-solid-svg-icons';

interface ContactSearchProps {
    search: string;
    onSearchChange: (value: string) => void;
    department: string;
    onDepartmentChange: (value: string) => void;
    status: string;
    onStatusChange: (value: string) => void;
    sortBy: string;
    onSortChange: (value: string) => void;
}

export default function ContactSearch(
    {search, onSearchChange, department, onDepartmentChange, status, onStatusChange, sortBy, onSortChange
    }: ContactSearchProps) {
    const departments = ['Tất cả', 'Thiết kế', 'Phát triển', 'Vận hành', 'Nội dung'];

    return (
        <div className="contacts-toolbar">
            <div className="contacts-search">
                <FontAwesomeIcon icon={faSearch} />
                <input
                    type="text"
                    placeholder="Tìm theo tên, email hoặc bộ phận"
                    value={search}
                    onChange={event => onSearchChange(event.target.value)}
                />
            </div>

            <div className="contacts-filter-row">
                <div className="contacts-filter-left">
                    <div className="contacts-select-wrap">
                        <FontAwesomeIcon icon={faSliders} />
                        <select
                            value={department}
                            onChange={event => onDepartmentChange(event.target.value)}
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
                            onChange={event => onStatusChange(event.target.value)}
                        >
                            <option value="Tất cả">Trạng thái</option>
                            <option value="Đang hoạt động">Đang hoạt động</option>
                            <option value="Tạm vắng">Tạm vắng</option>
                            <option value="Hoạt động hôm qua">Hoạt động hôm qua</option>
                            <option value="Hoạt động 2 giờ trước">Hoạt động 2 giờ trước</option>
                        </select>
                    </div>
                </div>

                <div className="contacts-sort">
                    <span>Sắp xếp:</span>
                    <select
                        value={sortBy}
                        onChange={event => onSortChange(event.target.value)}
                    >
                        <option value="default">Mặc định</option>
                        <option value="name-asc">Tên A–Z</option>
                        <option value="name-desc">Tên Z–A</option>
                        <option value="department">Bộ phận</option>
                        <option value="status">Trạng thái</option>
                    </select>
                </div>
            </div>
        </div>
    );
}