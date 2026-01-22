import { api } from "../lib/api";

export async function getAnnouncementsApi(params?: {
    page?: number;
    limit?: number;
    is_active?: 0 | 1;
}) {
    const res = await api.get("/api/announcements", { params });
    return res.data;
}
