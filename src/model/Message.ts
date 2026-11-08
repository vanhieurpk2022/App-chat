export interface MessageSingle {
    id?: number;
    name: string;
    to: string;
    mes: string;
    createAt?: string;
    type: number;
}

export interface MessageRoom {
    name: string;
    to: string;
    mes: string;
    type: number;
}

export interface SendChat {
    name: string;
    to: string;
    mes: string;
    type: number;
}