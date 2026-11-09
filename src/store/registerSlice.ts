import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "../model/User";

interface RegisterState {
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
    userExists: boolean | null;
}

const initialState: RegisterState = {
    error: null,
    status: "idle",
    userExists: null,
}

const registerSlice = createSlice({
    name: "chat/register",
    initialState,
    reducers: {
        registerStarted: (state) => {
            state.status = "loading";
            state.error = null;
        },
        registerFailed: (state, action: PayloadAction<string>) => {
            state.status = "error";
            state.error = action.payload;
        },
        registerSuccess: (state) => {
            state.status = "success";
        },
        checkAccountExits: (state, action: PayloadAction<boolean>) => {
            state.userExists = action.payload;
        },
        checkAccountExitsReset: (state) => {
            state.userExists = null;
        },
        registerReset: () => initialState,
    }
})

export const { registerStarted, registerFailed, registerSuccess, checkAccountExits, checkAccountExitsReset, registerReset } = registerSlice.actions;
export default registerSlice.reducer;