import { useEffect, useState } from "react";
import { getSocket } from "../lib/socket";

export type TelemetryPayload = {
    room_id?: number;
    flow_rate_lpm?: number;
    water_total_liter?: number;
    voltage?: number;
    current?: number;
    power?: number;
    energy_kwh_total?: number;
    frequency?: number;
    pf?: number;
    recorded_at?: string;
};

export function useRoomTelemetry(roomId?: number) {
    const [liveTelemetry, setLiveTelemetry] = useState<TelemetryPayload | null>(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);

    useEffect(() => {
        if (!roomId) return;

        const socket = getSocket();

        const handleConnect = () => {
            setIsSocketConnected(true);
            socket.emit("join-room", { room_id: roomId });
        };

        const handleDisconnect = () => {
            setIsSocketConnected(false);
        };

        const handleTelemetry = (payload: TelemetryPayload) => {
            if (!payload) return;

            if (payload.room_id && Number(payload.room_id) !== Number(roomId)) {
                return;
            }

            setLiveTelemetry(payload);
        };

        if (socket.connected) {
            handleConnect();
        }

        socket.on("connect", handleConnect);
        socket.on("disconnect", handleDisconnect);
        socket.on("telemetry_update", handleTelemetry);

        return () => {
            socket.off("connect", handleConnect);
            socket.off("disconnect", handleDisconnect);
            socket.off("telemetry_update", handleTelemetry);
        };
    }, [roomId]);

    return {
        liveTelemetry,
        isSocketConnected,
    };
}