import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserList, UserListHoder } from "../model/User";
import type { ChatMess, ChatPeopleFormat, Message } from "../model/Message";

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
        getNewMessage: (state, action: PayloadAction<Message>) => {
            const userHolder = state.UserListHoder.find((name) => name.userList.name === action.payload.name);
            userHolder?.mes.push(action.payload)
        },
        addOwnMessage: (state, action: PayloadAction<ChatMess>) => {
            pushMessage(state, action.payload);
        }
    }
})

function pushMessage(state: ChatTemp, m: ChatMess) {
    if (m.type === 1) state.chatRoom?.chatData.push(m);   // phòng
    else state.chatMess.push(m);                          // 1-1
}
export const { setUsers, selectChat, setPeopleMessage, isRoomChat, setRoomMessage, addOwnMessage, getNewMessage } = chatSlice.actions;
export default chatSlice.reducer;

