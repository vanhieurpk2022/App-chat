import { useEffect, useState } from "react";
import ChatListPanel from "../components/chat/ChatListPanel";
import ChatMain from "../components/chat/ChatMain";
import RightProfile from "../components/chat/RightProfile";
import LeftSideBar from "../components/utils/LeftSideBar";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import ChatBlank from "../components/chat/ChatBlank";
import users from "../assets/Users.svg"
import user from "../assets/User.svg"
import NotifyDisconnect from "../components/chat/NotifyDisconnect";
import RightSearch from "../components/chat/RightSearch";

export default function Chat() {
    const [rightProfile, setRightProfile] = useState<"profile" | "search" | null>(null);
    const { isRoom, chatRoom, chatMess, selectedUser } = useSelector((s: RootState) => s.chat);
    const [searchMessage, setSearchMessage] = useState(false);


    const view = isRoom
        ? { title: chatRoom?.name, messages: chatRoom?.chatData ?? [], countNumber: chatRoom?.userList.length }
        : { title: selectedUser, messages: chatMess ?? [] };

    useEffect(() => {
        setRightProfile(null);
    }, [view.title, isRoom]);

    const toggleProfile = () => {
        setRightProfile((prev) => (prev === "profile" ? null : "profile"));
    };

    const toggleSearch = () => {
        setRightProfile((prev) => (prev === "search" ? null : "search"));
    };

    return <>
        {/* <NotifyDisconnect /> */}
        <div className="d-flex vh-100">

            <div style={{ width: "72px" }} className="flex-shrink-0">
                <LeftSideBar isChat={true} />
            </div>

            <div style={{ width: "350px" }} className="flex-shrink-0 p-3">
                <ChatListPanel roomImg={users} userImg={user} />
            </div>

            <div className="flex-grow-1 d-flex flex-column h-100 w-100" style={{ minWidth: 0 }}>
                {selectedUser ?
                    <ChatMain onSearch={toggleSearch} imgUrl={isRoom ? users : user} isRoom={isRoom} countNumber={view.countNumber} messages={view.messages} title={view.title} isShow={rightProfile === "profile"} onShow={toggleProfile} />
                    : <ChatBlank />}
            </div>

            {rightProfile && (
                <div style={{ width: "380px", backgroundColor: "#FFFFFF" }} className="flex-shrink-0 overflow-auto">
                    {rightProfile === "profile" ? (
                        <RightProfile
                            onSearchMsg={false} // Hoặc truyền thẳng hàm toggleSearch nếu trong RightProfile cũng có nút "Tìm tin nhắn"
                            userImg={user}
                            roomImg={users}
                            chatRoom={isRoom ? chatRoom : null}
                            title={view.title ?? ""}
                            countNumber={isRoom ? view.countNumber : 0}
                            isRoom={isRoom}
                        />
                    ) : (
                        <RightSearch oncloseSearchMsg={() => setRightProfile(null)} />
                    )}
                </div>
            )}


        </div>
    </>
}