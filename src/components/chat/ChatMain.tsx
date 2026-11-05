import { CameraVideo, EmojiSmile, HandThumbsUpFill, LayoutSidebarReverse, PlusLg, Search, Telephone } from "react-bootstrap-icons";

interface ChatMainProps {
    onShow: () => void;
    isShow: boolean;
}


export default function ChatMain({ onShow, isShow }: ChatMainProps) {

    return (
        <div className="h-100 w-100 p-2 d-flex flex-column ">
            {/* Header */}
            <div className="d-flex flex-row align-items-center gap-3 border-bottom w-100 p-3">

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
                <div className="d-flex align-items-center gap-3 ms-auto me-3">
                    <Telephone size={20} />
                    <CameraVideo size={20} />
                    <Search size={20} />
                    <div onClick={onShow} className="d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ backgroundColor: isShow ? "#DBEAFE" : "transparent", cursor: "pointer" }}>
                        <LayoutSidebarReverse size={20} color={isShow ? "#2563EB" : ""} />
                    </div>
                </div>


            </div>
            {/* Main Chat */}
            <div className="d-flex flex-column">
                {/* Message Opponent */}
                <div className="d-flex flex-row gap-4 mt-3 ms-3">
                    <div className="rounded-circle overflow-hidden mt-auto" style={{ height: '32px', width: '32px' }}>
                        <img src="https://placehold.co/600x400" width={"100%"} height={"100%"} style={{ objectFit: "cover" }} />
                    </div>
                    <div className="bg-white shadow p-3 rounded-3" style={{ maxWidth: "calc(60% - 48px)" }}>
                        <span className="" >Chào An! Mình vừa hoàn thiện hướng hình ảnh cho website Mộc. Bạn xem qua cùng mình nhé 🌿</span>
                    </div>
                </div>

                {/* Message you */}
                <div className="d-flex flex-row gap-3 mt-3 justify-content-end me-3">
                    <div className="bg-primary-subtle shadow p-3 rounded-3" style={{ maxWidth: "calc(60% - 48px)" }}>
                        <span className="" >Chào An! Mình vừa hoàn thiện hướng hình ảnh cho website Mộc. Bạn xem qua cùng mình nhé 🌿</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column mt-auto mb-2 ">
                {/* Công cụ */}
                <div className="position-relative w-100">
                    {/* Icon trái */}
                    <PlusLg
                        className="position-absolute start-0 top-50 translate-middle-y ms-3"
                        size={24}
                    />

                    <input
                        className="form-control form-control-lg"
                        style={{ paddingLeft: "56px", paddingRight: "96px" }}
                        placeholder="Aa"
                    />

                    {/* Icon phải */}
                    <div className="position-absolute end-0 top-50 translate-middle-y me-3 d-flex gap-3 align-items-center">
                        <EmojiSmile size={24} />
                        <HandThumbsUpFill
                            className="text-warning"
                            size={24}
                        />
                    </div>
                </div>
            </div>

        </div>
    );
}