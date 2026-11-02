import ChatListPanel from "../components/chat/ChatListPanel";
import ChatMain from "../components/chat/ChatMain";
import RightProfile from "../components/chat/RightProfile";
import LeftSideBar from "../components/utils/LeftSideBar";

export default function Chat() {

    return (
        <div className="d-flex vh-100">
            <div style={{ width: "80px" }} className="flex-shrink-0">
                <LeftSideBar isChat={true} />
            </div>

            <div style={{ width: "400px" }} className="flex-shrink-0 border-end">
                <ChatListPanel />
            </div>

            <div className="flex-grow-1 d-flex flex-column" style={{ minWidth: 0 }}>
                <ChatMain />
            </div>

            <div style={{ width: "300px" }} className="flex-shrink-0 border-start overflow-auto">
                <RightProfile />
            </div>
        </div>
    );
}