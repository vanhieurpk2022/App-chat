import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NotifyDisconnect() {
    return (
        <div className="d-flex flex-row align-items-center justify-content-center gap-2">
            <FontAwesomeIcon icon={faTriangleExclamation} className="text-danger" />
            <span>Mất kết nối. Đang thử kết nối lại...</span>
        </div>
    )
}