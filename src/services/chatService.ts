import type { ChatMess, ChatPeopleFormat } from "../model/Message";
import type { SocketResponse } from "../wss/request";

export const chatService = {
    chatPeopleGetMes: (name: string, page: number): SocketResponse<ChatPeopleFormat> | null => {
        return null;
    },
    chatPeopleGetUser: (name: string, page: number): SocketResponse<ChatMess> | null => {
        return null;
    },
    sendChat: (type: string, to: string, mes: string): SocketResponse<void> | null => {
        return null;
    }
}