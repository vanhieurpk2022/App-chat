import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Account } from "../model/User";

interface InitState {
    user: Account | null;
    error: string | null;
    status: "idle" | "loading" | "success" | "error";
}

const initialState: InitState = {
    user: null,
    error: null,
    status: "idle"
}

const registerSlice = createSlice({
    name: "chat/register",
    initialState,
    reducers: {
        registerStarted: (state) => {
            state.status = "loading";
        },
        registerFailed: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.status = "idle";
        },
        registerSuccess: (state) => {
            state.status = "success";
        }
    }
})

export const { registerStarted, registerFailed, registerSuccess } = registerSlice.actions;
export default registerSlice.reducer;