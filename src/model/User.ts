import type { ChatMess } from "./Message";

export interface Account {
    user: string;
    pass: string;
}

export interface UserList {
    name: string;
    type: number;
    actionTime: string;
}

export interface InviteUser {
    id: number;
    name: string;
}

export interface UserListHoder {
    userList: UserList; // lấy thông tin user cho leftSideBar
    mes: ChatMess[]; // giữ tin nhắn mới
    actionTime?: string; // cho biết thời gian user đứng ở chat đó
}


