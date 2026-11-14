import { Bell, ChevronLeft, ExclamationTriangle, People, Person, PersonAdd, Trash } from "react-bootstrap-icons";
import RightProfileMain from "./RightProfileMain";
import "../../css/RightProfile.css"
import { ShowMember } from "../utils/ShowMember";
import { useEffect, useState } from "react";
import type { ChatPeopleFormat } from "../../model/Message";

interface RightProfile {
    isRoom: boolean;
    countNumber?: number;
    title: string;
    chatRoom?: ChatPeopleFormat | null;
}

export default function RightProfile({ isRoom, countNumber = 0, title, chatRoom }: RightProfile) {
    const [showMember, setShowMember] = useState(false);

    const handleShowMember = () => {
        setShowMember(true)
    }

    useEffect(() => {
        setShowMember(false);
    }, [title, isRoom]);
    return (
        <div className="d-flex flex-column h-100 bg-white">
            <div className="d-flex flex-row align-items-center">
                {showMember && isRoom ? <>
                    <div onClick={() => setShowMember(false)} className="btn btn-custom">
                        <ChevronLeft size={24} />
                    </div>

                    <span className="m-auto fw-semibold fs-5 d-flex align-items-center justify-content-center" style={{ height: 76 }}>
                        Thành viên
                    </span>
                </>
                    :
                    <span className="m-auto fw-semibold fs-5 d-flex align-items-center justify-content-center" style={{ height: 76 }}>
                        Thông tin liên hệ
                    </span>
                }

            </div>
            <hr className="my-4 opacity-25" />


            {showMember ?
                <ShowMember chatRoom={chatRoom} />
                :
                <div className="flex-grow-1 overflow-auto px-3 pb-3" style={{ minHeight: 0 }}>
                    {/* Header */}
                    <div >
                        <div className="d-flex flex-column align-items-center justify-content-center pt-4">
                            <div className="rounded-circle overflow-hidden shadow-sm mb-3 flex-shrink-0" style={{ width: "96px", height: "96px" }}>
                                <img src="https://placehold.co/400" width={"100%"} height={"100%"} style={{ objectFit: "cover" }} alt="" />
                            </div>
                            <span className="fs-4 fw-semibold text-break text-center px-2">{title}</span>


                            <div className="d-flex flex-row justify-content-center mt-4 gap-2">
                                <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "80px" }}>
                                    <button className="icon-button rounded-circle btn border-0 bg-secondary-subtle d-inline-flex align-items-center justify-content-center p-0 flex-shrink-0"
                                        style={{ cursor: "pointer", width: 48, height: 48 }}>
                                        <Person size={"20"} />
                                    </button>
                                    <span className="text-secondary" style={{ fontSize: "0.8rem", lineHeight: 1.2 }}>Hồ sơ</span>
                                </div>

                                <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "80px" }}>
                                    <button className="icon-button rounded-circle btn border-0 bg-secondary-subtle d-inline-flex align-items-center justify-content-center p-0 flex-shrink-0"
                                        style={{ cursor: "pointer", width: 48, height: 48 }}>
                                        <Bell size={"20"} />
                                    </button>
                                    <span className="text-secondary" style={{ fontSize: "0.8rem", lineHeight: 1.2 }}>Thông báo</span>
                                </div>

                                <div className="d-flex flex-column align-items-center gap-2 text-center" style={{ width: "80px" }}>
                                    <button className="icon-button rounded-circle btn border-0 bg-secondary-subtle d-inline-flex align-items-center justify-content-center p-0 flex-shrink-0"
                                        style={{ cursor: "pointer", width: 48, height: 48 }}>
                                        <PersonAdd size={"20"} />
                                    </button>
                                    <span className="text-secondary" style={{ fontSize: "0.8rem", lineHeight: 1.2 }}>Tạo nhóm trò chuyện</span>
                                </div>

                            </div>

                        </div>
                    </div >
                    <hr className="my-4 opacity-25 w-100" />

                    {isRoom &&
                        <div className="d-flex flex-column mb-3">
                            <span className="px-3 mb-1 fs-6 fw-semibold">Thành viên</span>
                            <button onClick={() => handleShowMember()} className="btn btn-custom border-0 rounded-3 d-flex flex-row gap-3 px-3 py-2 align-items-center">
                                <People size={20} className="flex-shrink-0" />
                                <span>{countNumber} thành viên</span>
                            </button>
                        </div>

                    }
                    {/* đổ userList thành viên có trong nhóm */}
                    <RightProfileMain />

                    {/* Thao tác */}
                    <hr className="my-4 opacity-25" />
                    <button className="btn-custom btn border-0 rounded-3 text-start text-dark-emphasis d-flex align-items-center gap-3 px-3 py-2 w-100 mb-1">
                        <ExclamationTriangle size={20} className="text-secondary-emphasis flex-shrink-0" />
                        <span className="fs-6 fw-normal">Báo xấu</span>
                    </button>

                    <button className="btn-custom btn border-0 rounded-3 text-start text-danger d-flex align-items-center gap-3 px-3 py-2 w-100">
                        <Trash size={20} className="flex-shrink-0" />
                        <span className="fs-6 fw-normal">Xoá lịch sử trò chuyện</span>
                    </button>

                </div>
            }




        </div >
    );
}