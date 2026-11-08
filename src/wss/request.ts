export interface ApiResponse<T> {
    status: string;
    event: string;
    data: T;
}
