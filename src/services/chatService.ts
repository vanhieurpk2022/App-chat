import type { ChatMess, ChatPeopleFormat } from "../model/Message";
import { wssEvent } from "../model/webSocketUrl";
import { chatSocket } from "../wss/ChatWebSocket";
import type { SocketResponse } from "../wss/request";

export const chatService = {
    chatPeopleGetMes: (name: string, page: number) => {
        chatSocket.send(wssEvent.CHAT_PEOPLE_GET_MES, { name, page });
    },
    chatRoomGetMes: (name: string, page: number) => {
        chatSocket.send(wssEvent.CHAT_ROOM_CHAT_MES, { name, page });
    },
    sendChat: (type: string, to: string, mes: string): SocketResponse<void> | null => {
        return null;
    }
}

