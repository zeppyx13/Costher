import { api } from "../lib/api";

export async function getweatherApi() {
    const res = await api.get("/api/weather/current");
    return res.data;
}