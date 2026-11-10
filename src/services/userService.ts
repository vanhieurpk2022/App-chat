import type { UserList } from "../model/User";
import type { SocketResponse } from "../wss/request";

export const userService = {
    checkUserOnline: (user: string) => {

    },
    checkUserExits: (user: string) => {

    },
    getUserList: (): SocketResponse<UserList[]> | null => {
        return null;
    }

}