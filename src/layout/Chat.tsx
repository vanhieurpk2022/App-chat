import { useState } from "react";
import ChatListPanel from "../components/chat/ChatListPanel";
import ChatMain from "../components/chat/ChatMain";
import RightProfile from "../components/chat/RightProfile";
import LeftSideBar from "../components/utils/LeftSideBar";

export default function Chat() {
    const [rightProfile, setRightProfile] = useState(false);


    return (
        <div className="d-flex vh-100">
            <div style={{ width: "80px" }} className="flex-shrink-0">
                <LeftSideBar isChat={true} />
            </div>

            <div style={{ width: "400px" }} className="flex-shrink-0 border-end">
                <ChatListPanel />
            </div>

            <div className="flex-grow-1 d-flex flex-column h-100 w-100" style={{ minWidth: 0 }}>
                <ChatMain isShow={rightProfile} onShow={() => setRightProfile(prev => !prev)} />
            </div>

            {
                (rightProfile) &&
                <div style={{ width: "500px" }} className="flex-shrink-0 border-start overflow-auto">
                    <RightProfile />
                </div>
            }

        </div>
    );
}