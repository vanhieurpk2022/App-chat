import { useEffect } from "react";
import Card from "../utils/Card";
import ChatListPanelHeader from "../utils/ChatListPanelHeader";
import { userSend } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { chatService } from "../../services/chatService";
import { selectChat, isRoomChat } from "../../store/chatSlice";
import { formatTime } from "../../model/formatTime";




export default function ChatListPanel() {
    const dispatch = useDispatch<AppDispatch>();
    const users = useSelector((state: RootState) => state.chat.UserListHoder);
    const authUser = useSelector((state: RootState) => state.auth.user);
    const getUserSelect = useSelector((state: RootState) => state.chat.selectedUser);

    useEffect(() => {
        if (authUser) {
            userSend.getUserList();
        }

    }, [authUser])

    const handleSelectUser = (userName: string) => {
        dispatch(selectChat(userName))
        // check type
        if (users.find((us) => us.userList.name === userName)?.userList.type === 1) {
            dispatch(isRoomChat(true));
            chatService.chatRoomGetMes(userName, 1);
        } else {
            dispatch(isRoomChat(false));
            chatService.chatPeopleGetMes(userName, 1);
        }

    };

    return (
        <div className="d-flex flex-column h-100 " style={{ minHeight: 0 }}>
            <ChatListPanelHeader />
            <div className="mt-3 d-flex flex-column flex-grow-1 overflow-y-auto overflow-x-hidden gap-2" style={{ minHeight: 0 }}>
                {users.map((user) => (
                    <Card onClick={() => handleSelectUser(user.userList.name)} key={user.userList.name} imgUrl={"https://cdn-icons-png.flaticon.com/512/6596/6596121.png"} isCommunity={user.userList.type == 1}
                        name={user.userList.name} time={formatTime(user.userList.actionTime)} message="" isActive={getUserSelect === user.userList.name} />
                ))}

            </div>


        </div>
    );
}