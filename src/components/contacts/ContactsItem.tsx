
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import type { Contact } from './ContactsData';

interface ContactsItemProps {
    contact: Contact;
    isSelected: boolean;
    onSelect: (id: number) => void;
    onToggleFavorite: (id: number) => void;
}

export default function ContactsItem(
    {contact, isSelected, onSelect, onToggleFavorite}: ContactsItemProps) {
    const statusClass = contact.status === 'Đang hoạt động' ? 'online' : contact.status === 'Tạm vắng' ? 'away' : 'offline';

    return (
        <div
            className={`contacts-row ${isSelected ? 'active-row' : ''}`}
            onClick={() => onSelect(contact.id)}
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

            <span className="contacts-department">
                {contact.department}
            </span>

            <span className="contacts-status">
                <i className={`status-dot ${statusClass}`} />
                {contact.status}
            </span>

            <button
                className={`contacts-favorite ${contact.favorite ? 'is-favorite' : ''}`}
                onClick={event => {
                    event.stopPropagation();
                    onToggleFavorite(contact.id);
                }}
                title="Yêu thích"
            >
                <FontAwesomeIcon icon={faStar} />
            </button>
        </div>
    );
}