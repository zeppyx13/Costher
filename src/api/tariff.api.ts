import { api } from "../lib/api";

export type Tariff = {
    id: number;
    water_rate: number;
    water_free_quota: number;
    electricity_rate: number;
    electricity_free_quota: number;
    late_fee_flat: number;
    updated_at: string;
};

export async function getTariffApi(): Promise<Tariff> {
    const res = await api.get("/api/tariff");
    const json = res.data;
    return json?.data ?? json;
}