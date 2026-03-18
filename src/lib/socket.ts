// src/lib/socket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://10.0.2.2:5000";

let socket: Socket | null = null;

export function getSocket(): Socket {
    if (!socket) {
        socket = io(SOCKET_URL, {
            transports: ["websocket"],
            autoConnect: true,
        });
    }

    return socket;
}

export function disconnectSocket() {
    if (socket) {
        socket.disconnect();
        socket = null;
    }
}