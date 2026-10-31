import { CameraVideo, LayoutSidebarReverse, Search, Telephone } from "react-bootstrap-icons";

export default function ChatMain() {

    return (
        <div className="w-100 ms-2 border-start  ">
            <div className="d-flex flex-row align-items-center gap-3 border-bottom w-100 p-3">
                {/* Header */}
                <div className="rounded-circle overflow-hidden flex-shrink-0 " style={{ width: "44px", height: "44px" }}>
                    <img style={{ objectFit: 'cover' }} src="https://placehold.co/600x400" width={100} height={100} alt="" />
                </div>

                <div >
                    <span className="fs-5 fw-semibold">Nguyễn Mai</span>
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-success flex-grow-0" style={{ width: "10px", height: "10px" }}></div>
                        <span className="small text-secondary">Đang hoạt động</span>
                    </div>
                </div>
                {/* Icon */}
                <div className="d-flex align-items-center gap-3 ms-auto me-3">
                    <Telephone size={20} />
                    <CameraVideo size={20} />
                    <Search size={20} />
                    <div className="d-inline-flex align-items-center justify-content-center p-2 rounded-3" style={{ backgroundColor: "#DBEAFE" }}>
                        <LayoutSidebarReverse size={20} color="#2563EB" />
                    </div>
                </div>


            </div>
        </div>
    );
}