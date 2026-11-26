import { useState } from "react";
import SearchBox from "../utils/SearchBox";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CardMessage from "../utils/CardMessage";
import { formatClock } from "../../model/formatTime";
import user from "../../assets/User.svg"
import { checkIsFile, decodeEmoji, isUrl, normalize } from "../../model/EncodingEmoji";


export default function SearchMessage() {
    const [search, setSearch] = useState<string>("");
    const isRoom = useSelector((s: RootState) => s.chat.isRoom);
    const chatRoom = useSelector((s: RootState) => s.chat.chatRoom);
    const chatMess = useSelector((s: RootState) => s.chat.chatMess);

    const chatMain = (isRoom ? chatRoom?.chatData : chatMess) ?? [];
    const results = normalize(search.trim()) ? chatMain.filter((msg) => !isUrl(msg.mes) && normalize(msg.mes).includes(search)) : [];

    return (
        <div className="d-flex flex-column gap-3 ">

            <div className="m-auto" style={{ width: "85%" }}>
                <SearchBox keyWord={search} onChange={setSearch} placeHolder="Tìm tin nhắn" />
            </div>
            <span className="fw-semibold text-secondary ms-2" style={{ fontSize: "0.85rem" }}>
                Tin nhắn
            </span>
            {/* Một thành viên */}
            <div className="overflow-auto">
                {results.length > 0 ? (
                    results.map((us) => (
                        <CardMessage key={us.id} name={us.name} imgUrl={user} message={decodeEmoji(us.mes)} time={formatClock(us.createAt)} />
                    ))
                ) : (!search && results.length === 0) ? (
                    <div className="text-center text-muted small">Nhập từ khóa để bắt đầu tìm kiếm</div>
                )
                    : <div className="text-center text-muted small">Không tìm thấy tin nhắn</div>

                }
            </div>
        </div >
    );
}