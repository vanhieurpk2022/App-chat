import { ExclamationTriangle, Trash, Vr } from "react-bootstrap-icons";
import RightProfileHeader from "./RightProfileHeader";
import RightProfileMain from "./RightProfileMain";
import "../../css/RightProfile.css"

interface RightProfile {
}

export default function RightProfile({ }: RightProfile) {
    return (
        <div className="d-flex flex-column h-100 border-start ">
            <span className="flex-shrink-0 fw-semibold fs-4 border-bottom d-block text-center p-3">
                Thông tin liên hệ
            </span>
            <div className="flex-grow-1 overflow-auto p-3" style={{ minHeight: 0 }}>
                <RightProfileHeader />
                <hr />
                <RightProfileMain />
                {/* Thao tác */}
                <hr />
                <button className="btn-custom btn text-start text-dark-emphasis d-flex align-items-center gap-3 p-3 w-100 ">
                    <ExclamationTriangle size={20} className="text-secondary-emphasis" />
                    <span className="fs-6 fw-normal">Báo xấu</span>
                </button>

                <button className="btn-custom btn text-start text-danger d-flex align-items-center gap-3 p-3 w-100">
                    <Trash size={20} />
                    <span className="fs-6 fw-normal">Xoá lịch sử trò chuyện</span>
                </button>

            </div>




        </div>
    );
}