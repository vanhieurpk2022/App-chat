import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserList, UserListHoder } from "../model/User";
import type { ChatMess, ChatPeopleFormat, Message } from "../model/Message";
import { nowString } from "../model/formatTime";

// đang lấy cho cây panel
export interface ChatTemp {
    UserListHoder: UserListHoder[];
    selectedUser?: string | null;
    chatMess: ChatMess[];
    isRoom: boolean;
    chatRoom: ChatPeopleFormat | null;
    isLoading: boolean;
}
const initialState: ChatTemp = {
    UserListHoder: [],
    selectedUser: null,
    chatMess: [],
    isRoom: false,
    chatRoom: null,
    isLoading: false,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserList[]>) => {
            state.UserListHoder = action.payload.map(user => ({
                userList: user,
                mes: [],
                actionTime: "",
            }));
        },
        selectChat: (state, action: PayloadAction<string>) => {
            state.selectedUser = action.payload;
            state.chatMess = [];
            state.isLoading = true;
        },
        setPeopleMessage: (state, action: PayloadAction<ChatMess[]>) => {
            state.chatRoom = null;;
            state.chatMess = action.payload;
            state.isLoading = false;
        },
        isRoomChat: (state, action: PayloadAction<boolean>) => {
            state.isRoom = action.payload;
        },
        setRoomMessage: (state, action: PayloadAction<ChatPeopleFormat>) => {
            state.chatMess = [];
            state.chatRoom = action.payload;
            state.isLoading = false;
        },
        // khi tin nhắn != selectedUser (Nhận tin nhắn đến)
        getNewMessage: (state, action: PayloadAction<Message>) => {
            const isIncomingRoom = action.payload.type === 1;
            const key = isIncomingRoom ? action.payload.to : action.payload.name;

            // name: người gửi
            // to: Đến phòng
            const isCurrentActiveChat = isIncomingRoom
                ? state.isRoom && state.selectedUser === action.payload.to
                : !state.isRoom && state.selectedUser === action.payload.name;


            const targetHolder = state.UserListHoder.find((item) => item.userList.name === key);

            if (isCurrentActiveChat) {
                if (isIncomingRoom) {
                    state.chatRoom?.chatData.unshift(action.payload);
                } else {
                    state.chatMess.unshift(action.payload);
                }
            } else {
                targetHolder?.mes.push(action.payload);
            }
            if (targetHolder && action.payload.createAt) targetHolder.userList.actionTime = action.payload.createAt;
        },
        // bản thân gửi tin nhắn đi
        // đẩy việc thêm createdAt lên
        addOwnerMessage: (state, action: PayloadAction<ChatMess>) => {
            const name = action.payload.to;
            const holder = state.UserListHoder.find((prev) => prev.userList.name === name);

            if (state.isRoom) state.chatRoom?.chatData.unshift(action.payload);
            else state.chatMess.unshift(action.payload);

            if (holder && action.payload.createAt) holder.userList.actionTime = action.payload.createAt;
        }
    }
})


export const { setUsers, selectChat, setPeopleMessage, isRoomChat, setRoomMessage, addOwnerMessage, getNewMessage } = chatSlice.actions;
export default chatSlice.reducer;

