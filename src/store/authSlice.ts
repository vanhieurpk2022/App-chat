import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { AUTH_KEY, loadSaved } from "../model/LoginSubcribe";

interface AuthState {
    user: string | null;
    reLoginCode: string | null;
    pendingUser: string | null;
    status: "idle" | "loading" | "error" | "reconnecting";
    error: string | null;
}

const initialState: AuthState = {
    ...loadSaved(AUTH_KEY),
    pendingUser: null,
    status: "idle",
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginStarted: (state, action: PayloadAction<string>) => {
            state.pendingUser = action.payload;
            state.status = "loading";
            state.error = null;
        },
        loginSucess: (state, action: PayloadAction<string>) => {
            state.user = state.pendingUser ?? state.user;
            state.reLoginCode = action.payload;
            state.pendingUser = null;
            state.status = "idle";
        },
        loginFailed: (state, action: PayloadAction<string>) => {
            state.pendingUser = null;
            state.status = "error";
            state.error = action.payload;
        },
        logout: (state) => {
            state.user = null;
            state.reLoginCode = null;
            state.pendingUser = null;
            state.status = "idle";
            state.error = null;
        },
        reLoginStarted: (state) => {
            state.status = "reconnecting";
            state.error = null;
        },
        reLoginSuccess: (state, action: PayloadAction<string>) => {
            state.reLoginCode = action.payload;
            state.status = "idle";
        },
        reLoginFailed: (state, action: PayloadAction<string>) => {
            state.user = null;
            state.reLoginCode = null;
            state.status = "error";
            state.error = action.payload;
        }
    }
})

export const { loginStarted, loginSucess, loginFailed, logout, reLoginStarted, reLoginSuccess, reLoginFailed } = authSlice.actions;
export default authSlice.reducer;