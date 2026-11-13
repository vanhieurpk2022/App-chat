import { faCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
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
    return (
        <div onClick={onClick} className={`${isActive && 'active'}  card-panel d-flex flex-row gap-3 p-3 rounded-3 card-button`} style={{ cursor: "pointer" }}>
            <div className="position-relative d-inline-block">
                <div className="rounded-circle overflow-hidden" style={{ width: 66, height: 66 }}>
                    <img src={imgUrl} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                </div>
                {status && <FontAwesomeIcon className="position-absolute bottom-0 end-0 text-success" stroke="white" strokeWidth={"40"} icon={faCircle} />}
            </div>

            <div className="d-flex flex-column flex-grow-1" style={{ minWidth: 0 }}>
                <div className="d-flex gap-2">
                    <span className="flex-grow-1 fw-semibold text-truncate" style={{ minWidth: 0 }}>{isCommunity ? <FontAwesomeIcon icon={faUsers} /> : ""} {name}</span>
                    <span className="small flex-shrink-0">{time}</span>
                </div>

                <div className="d-flex gap-2 py-2 align-items-center">
                    <span className="flex-grow-1 small text-secondary text-truncate" style={{ minWidth: 0 }}>
                        {message}
                    </span>

                    {countMess > 0 && (
                        <span className="small px-2 bg-primary text-white rounded-circle flex-shrink-0">
                            {countMess}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}