import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { MessageSingle } from "../model/Message";

interface ChatState {
    messages: MessageSingle[];
    status: "idle" | "loading" | "error";
    error: string | null;
}

// chat 1-1
const initialState: ChatState = { messages: [], status: 'idle', error: null };

const chatSlice = createSlice({
    name: "chatSingle",
    initialState: initialState,
    reducers: {
        messageReceived: (state, action: PayloadAction<MessageSingle>) => {
            state.messages.push(action.payload);
        }

    }
});

export const { messageReceived } = chatSlice.actions;
export default chatSlice.reducer;