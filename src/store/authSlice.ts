import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const AUTH_KEY = "auth";

interface AuthState {
    user: string | null;
    reLoginCode: string | null;
    pendingUser: string | null;
    status: "idle" | "loading" | "error";
    error: string | null;
}

function loadSaved() {
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        if (raw) return JSON.parse(raw) as { user: string; reLoginCode: string };
    } catch (error) {

    }
    return { user: null, reLoginCode: null };
}

const initialState: AuthState = {
    ...loadSaved(),
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
        }

    }
})

export const { loginStarted, loginSucess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;