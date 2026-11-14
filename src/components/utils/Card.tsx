import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
    imgUrl: string;
    name: string;
    time: string;
    message: string;
    isActive?: boolean;
    status?: boolean;
    countMess?: number;
    isCommunity?: boolean;
    onClick: () => void;
}

export default function Card({ imgUrl, name, time, message, isActive = false, status = false, countMess = 0, isCommunity = false, onClick }: CardProps) {
    const hasUnread = countMess > 0;

    return (
        <div
            onClick={onClick}
            className={`${isActive ? "active" : ""} card-panel card-button d-flex flex-row align-items-center gap-3 px-3 py-2 rounded-3`}
            style={{ cursor: "pointer" }}>
            {/* Avatar */}
            <div className="position-relative flex-shrink-0">
                <div className="rounded-circle overflow-hidden" style={{ width: 52, height: 52 }}>
                    <img src={imgUrl} alt="" width="100%" height="100%" style={{ objectFit: "cover" }} />
                </div>
                {status && (
                    <span className="position-absolute bottom-0 end-0 bg-success rounded-circle border border-2 border-white" style={{ width: 14, height: 14 }} />
                )}
            </div>

            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                {/* Tên + giờ */}
                <div className="d-flex align-items-center gap-2">
                    <span className="flex-grow-1 fw-semibold text-truncate d-flex align-items-center gap-2" style={{ minWidth: 0 }}>
                        {isCommunity && <FontAwesomeIcon icon={faUsers} className="small flex-shrink-0" />}
                        <span className="text-truncate">{name}</span>
                    </span>
                    <span className={`flex-shrink-0 text-nowrap ${hasUnread ? "text-primary fw-semibold" : "text-secondary"}`} style={{ fontSize: "0.75rem" }}>
                        {time}
                    </span>
                </div>

                {/* Tin nhắn + số chưa đọc */}
                <div className="d-flex align-items-center gap-2 mt-1">
                    <span className={`flex-grow-1 small text-truncate ${hasUnread ? "text-body fw-medium" : "text-secondary"}`} style={{ minWidth: 0 }}>
                        {message}
                    </span>

                    {hasUnread && (
                        <span className="bg-primary text-white rounded-pill flex-shrink-0 d-inline-flex align-items-center justify-content-center fw-semibold" style={{ minWidth: 20, height: 20, padding: "0 6px", fontSize: "0.7rem" }}>
                            {countMess > 99 ? "99+" : countMess}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}