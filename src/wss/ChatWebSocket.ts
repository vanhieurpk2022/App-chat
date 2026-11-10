import type { SocketResponse } from "./request";

// src/lib/chatSocket.ts
type Handler = (msg: SocketResponse<any>) => void;

class ChatSocket {
    private ws: WebSocket | null = null;
    private handlers = new Map<string, Set<Handler>>();

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(import.meta.env.VITE_WS_URL);

            this.ws.onopen = () => resolve();
            this.ws.onerror = () => reject(new Error("Không kết nối được server"));

            this.ws.onmessage = (e) => {
                const msg: SocketResponse<any> = JSON.parse(e.data);
                this.handlers.get(msg.event)?.forEach((h) => h(msg));
            };
        });
    }

    send(event: string, data: unknown): boolean {
        const ws = this.ws;
        if (!ws || ws.readyState !== WebSocket.OPEN) {
            console.warn("Chưa kết nối....", event);
            return false;
        }
        ws.send(JSON.stringify({ action: "onchat", data: { event, data } }))
        return true;
    }

    // Lắng nghe một event, trả về hàm để hủy lắng nghe
    on(event: string, handler: Handler) {
        if (!this.handlers.has(event)) this.handlers.set(event, new Set());
        this.handlers.get(event)!.add(handler);
        return () => this.handlers.get(event)?.delete(handler);
    }

    close() {
        this.ws?.close();
    }
}

export const chatSocket = new ChatSocket();