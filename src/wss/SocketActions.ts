import type { Account } from "../model/User";
import { wssEvent } from "../model/webSocketUrl";
import { loginFailed, loginStarted } from "../store/authSlice";
import { registerFailed, registerStarted } from "../store/registerSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "./ChatWebSocket";

export const login = (info: Account) => (dispatch: AppDispatch) => {
    dispatch(loginStarted(info.user));
    const ok = chatSocket.send(wssEvent.LOGIN, info)
    if (!ok) dispatch(loginFailed("Chưa kết nối được tới server"));
}

export const register = (info: Account) => (dispatch: AppDispatch) => {
    dispatch(registerStarted());
    const ok = chatSocket.send(wssEvent.REGISTER, info);
    if (!ok) dispatch(registerFailed("Chưa kết nối được tới server"));
}

