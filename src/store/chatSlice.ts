import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserList, UserListHoder } from "../model/User";
import type { ChatMess, ChatPeopleFormat } from "../model/Message";

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
    selectedUser: "",
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
        }

    }
})

export const { setUsers, selectChat, setPeopleMessage, isRoomChat, setRoomMessage } = chatSlice.actions;
export default chatSlice.reducer;

