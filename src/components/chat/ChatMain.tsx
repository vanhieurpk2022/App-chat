import { CameraVideo, CircleFill, EmojiSmile, HandThumbsUpFill, LayoutSidebarReverse, Person, PlusLg, Search, Telephone } from "react-bootstrap-icons";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import type { ChatMess } from "../../model/Message";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";

interface ChatMainProps {
    title?: string | null;
    messages: ChatMess[];
    onShow: () => void;
    isShow: boolean;
    isRoom: boolean;
    countNumber?: number;
}


export default function ChatMain({ onShow, isShow, messages, title, isRoom, countNumber }: ChatMainProps) {
    const [showEmoji, setEmoij] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const user = useSelector((state: RootState) => state.auth.user);

    const list = [...(messages)].reverse();
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "instant" });
    }, [messages])



    return (
        <div className="h-100 w-100 d-flex flex-column ">
            {/* Header */}
            <div className="d-flex flex-row align-items-center gap-3 border-bottom w-100 p-3">

                <div className="rounded-circle overflow-hidden flex-shrink-0 " style={{ width: "44px", height: "44px" }}>
                    <img style={{ objectFit: 'cover' }} src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png" width={100} height={100} alt="" />
                </div>

                <div >
                    <span className="fs-5 fw-semibold">{title}</span>
                    <div className="d-flex align-items-center gap-2">
                        <div className="rounded-circle bg-success flex-grow-0" style={{ width: "10px", height: "10px" }}></div>
                        {isRoom ?
                            <div className="d-flex flex-row align-items-center gap-2">
                                <small>Cộng đồng </small>
                                <CircleFill className="text-secondary" size={5} />
                                <div className="d-flex flex-row align-items-center  gap-2">
                                    <Person />
                                    <small>{countNumber} thành viên</small>
                                </div>


                            </div>
                            : <span className="small text-secondary">Đang hoạt động</span>}

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
            <div className="d-flex flex-column h-100 overflow-auto pb-5" style={{ backgroundColor: "#EBECF0" }}>
                {
                    list.map((mess, i) => {

                        const prev = list[i - 1];
                        const next = list[i + 1];

                        const isFirstOfGroup = !prev || prev.name !== mess.name; // đầu cụm tin liên tiếp
                        const isLastOfGroup = !next || next.name !== mess.name;  // cuối cụm
                        const mt = isFirstOfGroup ? "mt-3" : "mt-1";             // tin cùng cụm sát nhau hơn
                        const time = mess.createAt?.slice(11, 16);

                        if (mess.name === user) {
                            return (
                                <div key={mess.id} className={`d-flex flex-column align-items-end me-3 ${mt}`}>
                                    <div className="bg-primary-subtle shadow px-3 py-2 rounded-3 text-break" style={{ maxWidth: "calc(60% - 48px)" }}>
                                        {mess.mes}
                                    </div>
                                    {isLastOfGroup && (
                                        <span className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>{time}</span>
                                    )}
                                </div>
                            );
                        }
                        return (
                            <div key={mess.id} className={`d-flex flex-row gap-4 ms-3 ${mt}`}>
                                <div className="rounded-circle overflow-hidden mt-auto flex-shrink-0" style={{ height: 32, width: 32 }}>
                                    {isLastOfGroup && (
                                        <img src="https://placehold.co/600x400" alt="" width="100%" height="100%" style={{ objectFit: "cover" }} />
                                    )}
                                </div>

                                <div style={{ maxWidth: "calc(60% - 48px)" }}>
                                    <div className="bg-white shadow px-3 py-2 rounded-3">
                                        {isRoom && isFirstOfGroup && (
                                            <>
                                                <small className="text-secondary">{mess.name}</small>
                                                <br />
                                            </>
                                        )}
                                        <span className="text-break">{mess.mes}</span>
                                    </div>
                                    {isLastOfGroup && (
                                        <div className="text-secondary mt-1" style={{ fontSize: "0.75rem" }}>{time}</div>
                                    )}
                                </div>
                            </div>
                        );


                    })
                }
                <div ref={bottomRef}></div>


            </div>
            <div className="d-flex flex-column position-relative mt-auto p-3">
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