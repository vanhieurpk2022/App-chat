import { useState } from "react";
import type { ChatPeopleFormat } from "../../model/Message";
import { CardMember } from "./CardMember";
import SearchBox from "./SearchBox";

interface ShowMemeberProps {
    chatRoom?: ChatPeopleFormat | null;
}

export function ShowMember({ chatRoom }: ShowMemeberProps) {
    const [search, setSearch] = useState<string>("");
    if (!chatRoom) return null;
    const results = search.trim() ? chatRoom.userList.filter((name) => name.name.toLowerCase().includes(search)) : chatRoom.userList;

    return (
        <div className="d-flex flex-column gap-3 ">
            <span className="fw-semibold text-secondary ms-2" style={{ fontSize: "0.85rem" }}>
                Danh sách thành viên ({chatRoom.userList.length})
            </span>

            <div className="m-auto" style={{ width: "85%" }}>
                <SearchBox keyWord={search} onChange={setSearch} placeHolder="Tìm bạn bè" />
            </div>

            {/* Một thành viên */}
            <div className="overflow-auto">

                {results.length > 0 ? (
                    results.map((us) => (
                        <CardMember key={us.name} name={us.name} isOwner={us.name === chatRoom.own} />
                    ))
                ) : (
                    <div className="text-center text-muted small">Không tìm thấy thành viên</div>
                )}

            </div>
        </div >
    );
}