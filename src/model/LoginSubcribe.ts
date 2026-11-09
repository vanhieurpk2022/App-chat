import { store } from "../store/store";

export const AUTH_KEY = "auth";

export function loadSaved(authKey: string) {
    try {
        const raw = localStorage.getItem(authKey);
        if (raw) return JSON.parse(raw) as { user: string; reLoginCode: string };
    } catch (error) {

    }
    return { user: null, reLoginCode: null };
}

export function persistAuth() {
    let last = {
        user: store.getState().auth.user,
        code: store.getState().auth.reLoginCode,
    }

    return store.subscribe(() => {
        const { user, reLoginCode } = store.getState().auth;

        if (user === last.user && reLoginCode === last.code) return;
        last = { user, code: reLoginCode };

        try {
            if (user && reLoginCode) {
                localStorage.setItem(AUTH_KEY, JSON.stringify({ user, reLoginCode }));
            } else {
                localStorage.removeItem(AUTH_KEY)
            }
        } catch (error) {

        }
    })
}