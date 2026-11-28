import { nowString } from "../model/formatTime";
import { wssEvent } from "../model/webSocketUrl";
import { getNewMessage, selectChat, setOnline, setPeopleMessage, setRoomMessage, setUsers, removeRoom } from "../store/chatSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "./ChatWebSocket";

export function ChatSocketHandle(dispatch: AppDispatch) {
    const offs = [
        chatSocket.on(wssEvent.GET_USER_LIST, (msg) => {
            if (msg.status === "success") {
                dispatch(setUsers(msg.data));
            }
        }),
        chatSocket.on(wssEvent.CHAT_PEOPLE_GET_MES, (msg) => {
            if (msg.status === "success") {
                dispatch(setPeopleMessage(msg.data));
            }
        }),
        chatSocket.on(wssEvent.CHAT_ROOM_CHAT_MES, (msg) => {
            if (msg.status === "success") {
                dispatch(setRoomMessage(msg.data))
            }
        }),
        // lắng nghe người khác gửi tin nhắn đến
        chatSocket.on(wssEvent.SEND_CHAT, (msg) => {
            if (msg.status === "success") {
                dispatch(getNewMessage({ ...msg.data, createAt: nowString() }))
            }
        }),
        chatSocket.on(wssEvent.CHECK_USER_ONLINE, (msg) => {
            if (msg.status === "success") {
                dispatch(setOnline(msg.data.status));
            }
        }),
        chatSocket.on(wssEvent.OUT_ROOM, (msg) => {
            if (msg.status === "success") {
                dispatch(selectChat(null));
                dispatch(removeRoom());
            }
        })


    ]
    return () => offs.forEach((off) => off());
}