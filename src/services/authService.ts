import type { Account } from "../model/User";
import { wssEvent } from "../model/webSocketUrl";
import { loginFailed, loginStarted } from "../store/authSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "../wss/ChatWebSocket";

export const authService = {
    login: (info: Account) => (dispatch: AppDispatch) => {
        dispatch(loginStarted(info.user));
        const ok = chatSocket.send(wssEvent.LOGIN, info)
        if (!ok) dispatch(loginFailed("Chưa kết nối được tới server"));
    },
    register: (info: Account) => {

    }
}