import { useState } from "react";
import ChatListPanel from "../components/chat/ChatListPanel";
import ChatMain from "../components/chat/ChatMain";
import RightProfile from "../components/chat/RightProfile";
import LeftSideBar from "../components/utils/LeftSideBar";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import ChatBlank from "../components/chat/ChatBlank";
import NotifyDisconnect from "../components/chat/NotifyDisconnect";

export default function Chat() {
    const [rightProfile, setRightProfile] = useState(false);
    const isRoom = useSelector((s: RootState) => s.chat.isRoom);
    const chatRoom = useSelector((s: RootState) => s.chat.chatRoom);
    const chatMess = useSelector((s: RootState) => s.chat.chatMess);
    const getSelectUser = useSelector((s: RootState) => s.chat.selectedUser);

    const view = isRoom
        ? { title: chatRoom?.name, messages: chatRoom?.chatData ?? [], countNumber: chatRoom?.userList.length }
        : { title: getSelectUser, messages: chatMess ?? [] };


    return <>
        {/* <NotifyDisconnect /> */}
        <div className="d-flex vh-100">

            <div style={{ width: "72px" }} className="flex-shrink-0">
                <LeftSideBar isChat={true} />
            </div>

            <div style={{ width: "350px", border: "1px solid #E8ECE5" }} className="flex-shrink-0 border-end p-3">
                <ChatListPanel />
            </div>

            <div className="flex-grow-1 d-flex flex-column h-100 w-100" style={{ minWidth: 0 }}>
                {getSelectUser ?
                    <ChatMain isRoom={isRoom} countNumber={view.countNumber} messages={view.messages} title={view.title} isShow={rightProfile} onShow={() => setRightProfile(prev => !prev)} />
                    : <ChatBlank />}
            </div>

            {
                (rightProfile) &&
                <div style={{ width: "380px", backgroundColor: "#FFFFFF" }} className="flex-shrink-0 border-start overflow-auto " >
                    <RightProfile />
                </div>
            }

        </div>
    </>
}