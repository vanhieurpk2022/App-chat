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
    name: string;
    to: string;
    mes: string;
    type: number;
}



export interface ChatPeopleFormat {
    name: string;
    user: InviteUser;
    chatMess: ChatMess;
}