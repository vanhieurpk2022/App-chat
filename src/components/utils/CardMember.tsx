import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardMemberProps {
    imgUrl?: string;
    name: string;
    isOwner: boolean;
}

export function CardMember({ imgUrl, name, isOwner }: CardMemberProps) {
    return (
        <div className="card-panel card-button d-flex flex-row align-items-center gap-3 px-3 py-2 rounded-3" style={{ cursor: "pointer" }}>
            {/* Avatar */}
            <div className="flex-shrink-0 rounded-circle overflow-hidden position-relative" style={{ width: 44, height: 44 }}>
                <img src={imgUrl ?? "https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} alt="" width="100%" height="100%" style={{ objectFit: "cover" }} />

                {isOwner &&
                    <div className="position-absolute bottom-0 end-0 bg-white shadow-sm rounded-circle">
                        <FontAwesomeIcon icon={faKey} className="px-1 text-warning" style={{ width: "12px" }} />
                    </div>
                }
            </div>
            {/* Tên + vai trò */}
            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                <span className="fw-semibold text-truncate">{name}</span>
                {isOwner &&
                    <span className="text-secondary" style={{ fontSize: "0.75rem" }}>Trưởng cộng đồng</span>

                }
            </div>
        </div>
    );
}