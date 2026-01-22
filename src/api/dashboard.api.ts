import { api } from "../lib/api";

export async function getDashboardApi() {
    const res = await api.get("/api/dashboard");
    return res.data;
}
