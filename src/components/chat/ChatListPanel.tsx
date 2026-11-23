import { useEffect, useState } from "react";
import Card from "../utils/Card";
import ChatListPanelHeader from "../utils/ChatListPanelHeader";
import { userSend } from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { chatService } from "../../services/chatService";
import { selectChat, isRoomChat } from "../../store/chatSlice";
import { formatTime } from "../../model/formatTime";
import logoRoom from "../../assets/Gemini_Generated_Image_gb6akfgb6akfgb6a.png"
import logoUser from "../../assets/6596121.png"



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
        dispatch(selectChat(userName));
        const target = users.find((us) => us.userList.name === userName);
        const isGroup = target?.userList.type === 1;

        dispatch(isRoomChat(isGroup));
        if (isGroup) {
            chatService.chatRoomGetMes(userName, 1);
        } else {
            chatService.chatPeopleGetMes(userName, 1);
        }

    };

    return (
        <div className="d-flex flex-column h-100 " style={{ minHeight: 0 }}>
            <ChatListPanelHeader />
            <div className="mt-3 d-flex flex-column flex-grow-1 overflow-y-auto overflow-x-hidden gap-2" style={{ minHeight: 0 }}>
                {users.map((user) => (
                    <Card onClick={() => handleSelectUser(user.userList.name)} key={user.userList.name} imgRoom={logoRoom} imgUser={logoUser} isCommunity={user.userList.type == 1}
                        name={user.userList.name} time={formatTime(user.userList.actionTime)} message={user.mes?.mes ?? ""} isActive={getUserSelect === user.userList.name} countMess={user.unReadCount} />
                ))}

            </div>


        </div>
    );
}