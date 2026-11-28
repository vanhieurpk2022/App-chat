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
    highlightId: number | null;
    highlightKeyWord: string | null;
    isOnline: boolean;
}
const initialState: ChatTemp = {
    UserListHoder: [],
    selectedUser: null,
    chatMess: [],
    isRoom: false,
    chatRoom: null,
    isLoading: false,
    highlightId: null,
    highlightKeyWord: null,
    isOnline: false,
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<UserList[]>) => {
            state.UserListHoder = action.payload.map(user => ({
                userList: user,
                mes: null,
                actionTime: "",
                unReadCount: 0,
            }));
        },
        selectChat: (state, action: PayloadAction<string | null>) => {
            state.selectedUser = action.payload;
            state.chatMess = [];
            state.isLoading = true;

            // reset Read
            const holder = state.UserListHoder.find((item) => item.userList.name === action.payload);
            if (holder) {
                holder.unReadCount = 0;
            }
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
            const conversationKey = isIncomingRoom ? action.payload.to : action.payload.name;

            const isCurrentActiveChat = isIncomingRoom
                ? state.isRoom && state.selectedUser === action.payload.to
                : !state.isRoom && state.selectedUser === action.payload.name;

            // 1. Đẩy vào khung chat nếu đang mở màn hình chat đó
            if (isCurrentActiveChat) {
                if (isIncomingRoom) {
                    state.chatRoom?.chatData.unshift(action.payload);
                } else {
                    state.chatMess.unshift(action.payload);
                }
            }

            // 2. Tìm cuộc hội thoại trong danh sách bên trái
            const targetIndex = state.UserListHoder.findIndex(
                (item) => item.userList.name === conversationKey
            );

            if (targetIndex !== -1) {
                const holder = state.UserListHoder[targetIndex];

                // cập nhật tin nhắn mới nhất vào holder.mes để hiện preview trên Card
                holder.mes = action.payload;
                holder.userList.actionTime = action.payload.createAt ?? "";

                // ĐANG MỞ xem thì unReadCount = 0, nếu CHƯA MỞ thì tăng thêm 1
                if (isCurrentActiveChat) {
                    holder.unReadCount = 0;
                } else {
                    holder.unReadCount = (holder.unReadCount || 0) + 1;
                }

                // Đẩy cuộc hội thoại lên vị trí đầu tiên của danh sách
                state.UserListHoder.splice(targetIndex, 1);
                state.UserListHoder.unshift(holder);
            } else {
                // Người lạ nhắn đến lần đầu -> Thêm mới vào đầu danh sách
                state.UserListHoder.unshift({
                    userList: {
                        name: conversationKey,
                        type: action.payload.type,
                        actionTime: action.payload.createAt ?? ""
                    },
                    mes: action.payload,
                    unReadCount: isCurrentActiveChat ? 0 : 1
                });
            }
        },
        // bản thân gửi tin nhắn đi
        // đẩy việc thêm createdAt lên
        addOwnerMessage: (state, action: PayloadAction<ChatMess>) => {
            if (state.isRoom) state.chatRoom?.chatData.unshift(action.payload);
            else state.chatMess.unshift(action.payload);

            if (state.selectedUser) {
                const targetIndex = state.UserListHoder.findIndex((item) => item.userList.name === state.selectedUser);
                if (targetIndex !== -1) {
                    const holder = state.UserListHoder[targetIndex];
                    holder.mes = action.payload;
                    holder.userList.actionTime = action.payload.createAt ?? "";
                    holder.unReadCount = 0;

                    // di chuyển tin nhắn lên đầu
                    state.UserListHoder.splice(targetIndex, 1);
                    state.UserListHoder.unshift(holder);
                }
            }
        },
        setHighlightId: (state, action: PayloadAction<number | null>) => {
            state.highlightId = action.payload;
        },
        setHighlightKeyWords: (state, action: PayloadAction<string | null>) => {
            state.highlightKeyWord = action.payload;
        },
        setOnline: (state, action: PayloadAction<boolean>) => {
            state.isOnline = action.payload;
        },
        removeRoom: (state) => {
            if (!state.chatRoom) return;
            state.UserListHoder = state.UserListHoder.filter((prev) => prev.userList.name !== state.selectedUser);
        }
    }
})


export const { setUsers, selectChat, setPeopleMessage, isRoomChat, setRoomMessage, addOwnerMessage, getNewMessage, setHighlightId, setHighlightKeyWords, setOnline, removeRoom } = chatSlice.actions;
export default chatSlice.reducer;

