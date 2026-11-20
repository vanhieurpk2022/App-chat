import { wssEvent } from "../model/webSocketUrl";
import { chatSocket } from "../wss/ChatWebSocket";

export const userSend = {
    checkUserOnline: (user: string) => {
        chatSocket.send(wssEvent.CHECK_USER_ONLINE, { user });
    },
    checkUserExits: (user: string) => {
        chatSocket.send(wssEvent.CHECK_USER_EXITS, { user });
    },
    getUserList: () => {
        chatSocket.send(wssEvent.GET_USER_LIST, {});
    }


}
