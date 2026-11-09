import { wssEvent } from "../model/webSocketUrl";
import { loginFailed, loginSucess, logout } from "../store/authSlice";
import { registerFailed, registerSuccess } from "../store/registerSlice";
import type { AppDispatch } from "../store/store";
import { chatSocket } from "./ChatWebSocket";

export function AuthSocketHandler(dispatch: AppDispatch) {
    const offs = [
        chatSocket.on(wssEvent.LOGIN, (msg) => {
            if (msg.status === "success") {
                dispatch(loginSucess(msg.data.RE_LOGIN_CODE));
            } else {
                dispatch(loginFailed(String(msg.mes)));
            }
        }),
        chatSocket.on(wssEvent.LOGOUT, () => {
            dispatch(logout());
        }),
        chatSocket.on(wssEvent.REGISTER, (msg) => {
            if (msg.status === "success") {
                dispatch(registerSuccess());
            } else {
                dispatch(registerFailed(String(msg.mes)));
            }
        })
    ]
    return () => offs.forEach((off) => off());
}