import { CameraVideo, EmojiSmile, HandThumbsUpFill, LayoutSidebarReverse, PlusLg, Search, Telephone } from "react-bootstrap-icons";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

interface ChatMainProps {
    onShow: () => void;
    isShow: boolean;
}


export default function ChatMain({ onShow, isShow }: ChatMainProps) {
    const [showEmoji, setEmoij] = useState(false);
    return (
        <div className="h-100 w-100 d-flex flex-column ">
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
                    <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ cursor: "pointer" }}>
                        <Telephone size={24} />
                    </button>
                    <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ cursor: "pointer" }}>
                        <CameraVideo size={24} />
                    </button>
                    <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ cursor: "pointer" }}>
                        <Search size={20} />
                    </button>


                    <button onClick={onShow} className="btn-profile border-0 btn d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                        style={{ backgroundColor: isShow ? "#DBEAFE" : "transparent", cursor: "pointer" }}>
                        <LayoutSidebarReverse size={20} color={isShow ? "#2563EB" : ""} />
                    </button>
                </div>


            </div>
            {/* Main Chat */}
            <div className="d-flex flex-column h-100" style={{ backgroundColor: "#F8F9F6" }}>
                {/* Message Opponent */}
                <div className="d-flex flex-row gap-4 mt-3 ms-3 ">
                    <div className="rounded-circle overflow-hidden mt-auto" style={{ height: '32px', width: '32px' }}>
                        <img src="https://placehold.co/600x400" width={"100%"} height={"100%"} style={{ objectFit: "cover" }} />
                    </div>
                    <div className="bg-white shadow p-3 rounded-3 position-relative" style={{ maxWidth: "calc(60% - 48px)" }}>
                        <span className="text-break">Chào An! Mình vừa hoàn thiện hướng hình ảnh cho website Mộc. Bạn xem qua cùng mình nhé 🌿</span>
                        <br />
                        <span className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>  11:00 </span>
                    </div>

                </div>

                {/* Message you */}
                <div className="d-flex flex-row gap-3 mt-3 justify-content-end me-3">
                    <div className="bg-primary-subtle shadow p-3 rounded-3 " style={{ maxWidth: "calc(60% - 48px)" }}>
                        <span className="" >Chào An! Mình vừa hoàn thiện hướng hình ảnh cho website Mộc. Bạn xem qua cùng mình nhé 🌿</span>
                        <br />
                        <span className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>  11:00 </span>

                    </div>

                </div>
            </div>
            <div className="d-flex flex-column position-relative mt-auto mb-3  ">
                {/* Công cụ */}
                <div className="position-relative d-flex ms-3" style={{ width: "98%" }}>
                    {/* Icon trái */}
                    <PlusLg className="position-absolute start-0 top-50 translate-middle-y ms-3" style={{ cursor: "pointer" }} size={24} />
                    <input className=" form-control form-control-lg" style={{ paddingLeft: "56px", paddingRight: "96px" }} placeholder="Aa" />

                    {/* Icon phải */}
                    <div className="position-absolute end-0 top-50 translate-middle-y me-3 d-flex gap-3 align-items-center">
                        <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                            style={{ cursor: "pointer" }}>
                            <EmojiSmile size={24} onClick={() => setEmoij(prev => !prev)} />
                        </button>

                        <button className="btn-profile btn border-0 d-inline-flex align-items-center justify-content-center p-2 rounded-3"
                            style={{ cursor: "pointer" }}>
                            <HandThumbsUpFill className="text-warning" size={24} />
                        </button>
                    </div>

                </div>
                {showEmoji && (
                    <div className="position-absolute end-0 mb-5 bottom-0 me-2">
                        <EmojiPicker />
                    </div>
                )}

            </div>

        </div >
    );
}