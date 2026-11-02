import { ExclamationTriangle, Trash } from "react-bootstrap-icons";
import RightProfileHeader from "./RightProfileHeader";
import RightProfileMain from "./RightProfileMain";
import "../../css/RightProfile.css"

export default function RightProfile() {
    return (
        <div className="border-start p-3">
            <RightProfileHeader />
            <RightProfileMain />

            {/* Thao tác */}
            <div className="d-flex flex-column bg-white rounded-3 overflow-hidden shadow-sm mt-3" style={{ maxWidth: "400px" }}>

                <button className="btn-custom text-start text-dark-emphasis d-flex align-items-center gap-3 p-3 w-100 bg-transparent">
                    <ExclamationTriangle size={20} className="text-secondary-emphasis" />
                    <span className="fs-6 fw-normal">Báo xấu</span>
                </button>

                <button className="btn-custom text-start text-danger d-flex align-items-center gap-3 p-3 w-100 bg-transparent">
                    <Trash size={20} />
                    <span className="fs-6 fw-normal">Xoá lịch sử trò chuyện</span>
                </button>

            </div>


        </div>
    );
}