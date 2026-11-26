import { useState } from "react";
import SearchBox from "../utils/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import CardMessage from "../utils/CardMessage";
import { formatClock } from "../../model/formatTime";
import user from "../../assets/User.svg"
import { decodeEmoji, isUrl } from "../../model/EncodingEmoji";
import Highlighter from "react-highlight-words";
import { setHighlightId } from "../../store/chatSlice";


export default function SearchMessage() {
    const [search, setSearch] = useState<string>("");
    const { isRoom, chatRoom, chatMess } = useSelector((s: RootState) => s.chat);
    const dispatch = useDispatch();


    const keyword = search.trim().toLowerCase();
    const chatMain = (isRoom ? chatRoom?.chatData : chatMess) ?? [];
    const results = keyword ? chatMain.filter((msg) => !isUrl(msg.mes) && (decodeEmoji(msg.mes)).toLowerCase().includes(keyword)) : [];

    const handleSelectResult = (msgId: number | null) => {
        if (msgId == null) return;

        const el = document.getElementById(`msg-${msgId}`);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
        }

        dispatch(setHighlightId(msgId));
        setTimeout(() => dispatch(setHighlightId(null)), 2000);
    };


    return (
        <div className="d-flex flex-column gap-3 ">

            <div className="m-auto" style={{ width: "85%" }}>
                <SearchBox keyWord={search} onChange={setSearch} placeHolder="Tìm tin nhắn" />
            </div>
            <span className="fw-semibold text-secondary ms-2" style={{ fontSize: "0.85rem" }}>
                Tin nhắn
            </span>
            {/* Một thành viên */}
            <div className="overflow-auto flex-grow-1" style={{ minHeight: 0 }}>
                {results.length > 0 ? (
                    results.map((us) => (
                        <CardMessage
                            onClick={() => handleSelectResult(us.id ?? null)}
                            key={us.id}
                            name={us.name}
                            imgUrl={user}
                            message={
                                <Highlighter
                                    highlightTag="span"
                                    highlightClassName="bg-warning-subtle text-dark fw-semibold rounded px-1"
                                    searchWords={[keyword]}
                                    autoEscape
                                    textToHighlight={decodeEmoji(us.mes)}
                                />}
                            time={formatClock(us.createAt)} />
                    ))
                ) : (!search) ? (
                    <div className="text-center text-muted small">Nhập từ khóa để bắt đầu tìm kiếm</div>
                )
                    : <div className="text-center text-muted small">Không tìm thấy tin nhắn</div>

                }
            </div>
        </div >
    );
}