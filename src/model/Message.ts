import type { InviteUser } from "./User";

export interface ChatMess {
    id?: number;
    name: string;
    to: string;
    mes: string;
    createAt?: string;
    type: number;
}

export interface Message {
    id: number;
    name: string;
    type: number;
    to: string;
    mes: string;
}

export interface ChatPeopleFormat {
    id: string;
    name: string;
    own: string;
    createTime: string;
    userList: InviteUser[]; // user ở trong phòng
    chatData: ChatMess[]; // 
}
