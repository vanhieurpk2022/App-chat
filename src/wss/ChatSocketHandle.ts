import { wssEvent } from "../model/webSocketUrl";
import { setPeopleMessage, setRoomMessage, setUsers } from "../store/chatSlice";
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
        })


    ]
    return () => offs.forEach((off) => off());
}