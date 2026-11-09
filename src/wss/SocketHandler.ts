import { wssEvent } from "../model/webSocketUrl";
import { loginFailed, loginSucess, logout } from "../store/authSlice";
import { messageReceived } from "../store/chatSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "./ChatWebSocket";

export function AuthSocketHandler(dispatch: AppDispatch) {
    const offs = [
        chatSocket.on(wssEvent.LOGIN, (msg) => {
            if (msg.status === "success") {
                dispatch(loginSucess(msg.data.RE_LOGIN_CODE));
            } else {
                dispatch(loginFailed(String(msg.data)));
            }
        }),
        chatSocket.on(wssEvent.LOGOUT, () => {
            dispatch(logout());
        }),
        chatSocket.on(wssEvent.CHAT_PEOPLE_GET_MES, (msg) => {
            if (msg.status === "success") {
                dispatch(messageReceived(msg.data))
            }
        })
    ]
    return () => offs.forEach((off) => off());
}