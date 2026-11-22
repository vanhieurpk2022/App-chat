import { wssEvent } from "../model/webSocketUrl";
import { chatSocket } from "../wss/ChatWebSocket";

export const chatService = {
    chatPeopleGetMes: (name: string, page: number) => {
        chatSocket.send(wssEvent.CHAT_PEOPLE_GET_MES, { name, page });
    },
    chatRoomGetMes: (name: string, page: number) => {
        chatSocket.send(wssEvent.CHAT_ROOM_CHAT_MES, { name, page });
    },
    sendChat: (type: string, to: string, mes: string) => {
        chatSocket.send(wssEvent.SEND_CHAT, { type, to, mes });
    }
}

