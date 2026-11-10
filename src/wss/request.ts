export interface SocketResponse<T> {
    status: string;
    event: string;
    data?: T;
    mes?: string;
}
