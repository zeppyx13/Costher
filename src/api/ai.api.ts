import { api } from "../lib/api";

export async function getRoomInsightApi(roomId: number, days = 30) {
    const res = await api.get(`/api/ai/rooms/${roomId}/insight`, {
        params: { days },
    });
    return res.data?.data ?? res.data;
}

export async function getRoomPredictionApi(roomId: number) {
    const res = await api.get(`/api/ai/rooms/${roomId}/prediction`);
    return res.data?.data ?? res.data;
}