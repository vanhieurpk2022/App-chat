import { faComments } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function ChatBlank() {


    return (
        <div
            className="h-100 w-100 d-flex flex-column justify-content-center align-items-center text-center px-4"
            style={{ backgroundColor: "#EBECF0" }}
        >
            <div
                className="rounded-circle bg-white shadow-sm d-flex justify-content-center align-items-center mb-4"
                style={{ width: 96, height: 96 }}
            >
                <FontAwesomeIcon icon={faComments} size="3x" className="text-primary" />
            </div>

            <h4 className="fw-semibold mb-2">Chào mừng đến với QMess</h4>
            <p className="text-secondary mb-0" style={{ maxWidth: 360 }}>
                Chọn một cuộc trò chuyện để bắt đầu
            </p>
        </div>
    );
}