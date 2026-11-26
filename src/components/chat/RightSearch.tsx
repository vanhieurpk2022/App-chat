import { ChevronLeft, XLg } from "react-bootstrap-icons";
import SearchMessage from "./SearchMessage";

interface RightSearchProps {
    oncloseSearchMsg: () => void;
}

export default function RightSearch({ oncloseSearchMsg }: RightSearchProps) {
    return (
        <div className="d-flex flex-column h-100 bg-white">
            <div className="d-flex flex-row align-items-center">
                <span className="m-auto fw-semibold fs-5 d-flex align-items-center justify-content-center" style={{ height: 76 }}>
                    Tìm kiếm tin nhắn
                </span>
                <div onClick={oncloseSearchMsg} className="btn btn-custom">
                    <XLg size={24} />
                </div>
            </div>
            <hr className="my-4 opacity-25" style={{ backgroundColor: "#E5EBE1" }} />

            <SearchMessage />


        </div >
    )
}