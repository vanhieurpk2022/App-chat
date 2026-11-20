import type { ChatPeopleFormat } from "../../model/Message";
import { CardMember } from "./CardMember";
import SearchBox from "./SearchBox";

interface ShowMemeberProps {
    chatRoom?: ChatPeopleFormat | null;
}

export function ShowMember({ chatRoom }: ShowMemeberProps) {
    if (!chatRoom) return null;
    return (
        <div className="d-flex flex-column gap-3 ">
            <button type="button" className="btn btn-primary align-self-center mt-3 rounded-3 w-75 fw-medium p-2">
                Thêm thành viên
            </button>


            <span className="fw-semibold text-secondary ms-2" style={{ fontSize: "0.85rem" }}>
                Danh sách thành viên ({chatRoom.userList.length})
            </span>

            <div className="m-auto" style={{ width: "85%" }}>
                <SearchBox />
            </div>

            {/* Một thành viên */}
            <div className="overflow-auto">
                {chatRoom.userList.map((us) => {
                    return <CardMember key={us.name} name={us.name} isOwner={us.name === chatRoom.own} />
                })}

            </div>
        </div >
    );
}