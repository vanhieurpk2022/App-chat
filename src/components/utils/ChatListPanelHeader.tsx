import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import SearchBox from "./SearchBox";

interface ChatListPanelHeaderProps {
}

export default function ChatListPanelHeader({ }: ChatListPanelHeaderProps) {
    return (
        <div >
            <div className="d-flex flex-column gap-3">

                {/* Header */}
                <div className="d-flex flex-row">
                    <span className="fs-4 fw-semibold">Trò chuyện</span>
                    <div className="p-1 rounded-3 ms-auto " style={{ backgroundColor: "#E8F0E5", cursor: "pointer" }}>
                        <FontAwesomeIcon icon={faPenToSquare} className=" text-success" size="xl" />
                    </div>
                </div>


                {/* box Seach */}
                <div>
                    <SearchBox />
                </div>

                <div className="d-flex flex-row gap-4 ">
                    <Link to="#" className="active text-reset text-decoration-none rounded-3 p-2 small" >Tất cả</Link>
                    <Link to="#" className="text-reset text-decoration-none p-2 rounded-3 p-2 small" >Chưa đọc</Link>
                    <Link to="#" className="text-reset text-decoration-none p-2 rounded-3 p-2 small" >Nhóm</Link>
                </div>
            </div>
        </div>
    );

}