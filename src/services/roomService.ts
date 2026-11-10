import type { InviteUser } from "../model/User";
import type { SocketResponse } from "../wss/request";

export const roomService = {
    createRoom: (name: string) => {

    },
    joinRoom: (name: string): SocketResponse<InviteUser[]> | null => {
        return null;
    },
    outRoom: (name: string) => {

    }
}