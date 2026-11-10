import type { MessageSingle } from "../model/Message";
import type { Account } from "../model/User";
import { wssEvent } from "../model/webSocketUrl";
import { loginFailed, loginStarted } from "../store/authSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "./ChatWebSocket";

export const login = (info: Account) => (dispatch: AppDispatch) => {
    dispatch(loginStarted(info.user));
    const ok = chatSocket.send(wssEvent.LOGIN, info)
    if (!ok) dispatch(loginFailed("Chưa kết nối được tới server"));
}

export const register = (info: Account) => {

}

export const sendChat = (chat: MessageSingle) => {

}