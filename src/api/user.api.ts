import { api } from "../lib/api";

export async function updateMeApi(payload: {
    name?: string;
    phone?: string;
    avatar_url?: string;
}) {
    const res = await api.put("/api/users/me", payload);
    return res.data;
}
