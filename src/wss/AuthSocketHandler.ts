import { wssEvent } from "../model/webSocketUrl";
import { loginFailed, loginSuccess, logout } from "../store/authSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "./ChatWebSocket";

export function AuthSocketHandler(dispatch: AppDispatch) {
    const offs = [
        chatSocket.on(wssEvent.LOGIN, (msg) => {
            if (msg.status === "success") {
                dispatch(loginSuccess(msg.data.RE_LOGIN_CODE));
            } else {
                dispatch(loginFailed(String(msg.mes)));
            }
        }),

        chatSocket.on(wssEvent.LOGOUT, (msg) => {
            if (msg.status === "success") dispatch(logout());

        }),

        chatSocket.on(wssEvent.REGISTER, (msg) => {
            // register
        }),

        chatSocket.on(wssEvent.RE_LOGIN, () => {
            // RE LOGIN
        }),


    ]
    return () => offs.forEach((off) => off());
}