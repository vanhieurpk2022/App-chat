
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import type { Contact } from './ContactsData';
import ContactsItem from './ContactsItem';

interface ContactsListProps {
    pageContacts: Contact[];
    selectedId: number | null;
    filteredCount: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onSelect: (id: number) => void;
    onToggleFavorite: (id: number) => void;
    onPageChange: (page: number) => void;
}

export default function ContactsList(
    {pageContacts, selectedId, filteredCount, currentPage, totalPages, pageSize, onSelect, onToggleFavorite, onPageChange
    }: ContactsListProps) {
    return (
        <>
            <div className="contacts-table-heading">
                <span>LIÊN HỆ</span>
                <span>BỘ PHẬN</span>
                <span>TRẠNG THÁI</span>
                <span />
            </div>

            <div className="contacts-list">
                {pageContacts.length > 0 ? (
                    pageContacts.map(contact => (
                        <ContactsItem
                            key={contact.id}
                            contact={contact}
                            isSelected={selectedId === contact.id}
                            onSelect={onSelect}
                            onToggleFavorite={onToggleFavorite}
                        />
                    ))
                ) : (
                    <div className="contacts-empty">
                        Không tìm thấy liên hệ phù hợp.
                    </div>
                )}
            </div>

            <footer className="contacts-pagination">
                <span>
                    Hiển thị {filteredCount === 0 ? 0 : (currentPage - 1) * pageSize + 1}
                    {' '}đến {Math.min(currentPage * pageSize, filteredCount)}
                    {' '}trong {filteredCount} liên hệ
                </span>

                <div>
                    <button
                        disabled={currentPage === 1}
                        onClick={() => onPageChange(currentPage - 1)}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>

                    {Array.from({ length: totalPages }, (_, index) => index + 1).map(page => (
                        <button
                            key={page}
                            className={currentPage === page ? 'current-page' : ''}
                            onClick={() => onPageChange(page)}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                        disabled={currentPage === totalPages}
                        onClick={() => onPageChange(currentPage + 1)}
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
            </footer>
        </>
    );
}