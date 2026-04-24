import { api } from "../lib/api";

export async function getMyComplaintsApi(params?: { status?: string; page?: number; limit?: number }) {
    const res = await api.get("/api/complaints", { params });
    return res.data;
}

export async function createComplaintApi(payload: { title: string; description: string }) {
    const res = await api.post("/api/complaints", payload);
    return res.data;
}

export async function closeComplaintApi(id: number) {
    const res = await api.patch(`/api/complaints/${id}`, { status: "closed" });
    return res.data;
}