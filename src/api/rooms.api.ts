import { api } from "../lib/api";

export type RoomApi = {
    id: number;
    number: string;              // "A01"
    floor: number;
    price_monthly: number;
    deposit: number;
    is_available: 0 | 1;
    description?: string | null;
    main_image_url?: string | null;
    created_at?: string;
    updated_at?: string | null;
    is_occupied?: 0 | 1;
};

export async function getRoomsApi(params?: {
    page?: number;
    limit?: number;
    search?: string;
    is_available?: 0 | 1;
}) {
    const res = await api.get("/api/rooms/all", { params });
    const json = res.data;

    const rooms =
        json?.data?.rooms ??
        json?.data?.rows ??
        json?.rooms ??
        json?.rows ??
        [];

    const meta = json?.data?.meta ?? json?.meta ?? {};

    return {
        success: Boolean(json?.success),
        message: json?.message ?? "OK",
        data: {
            rooms: Array.isArray(rooms) ? rooms : [],
            total: Number(meta?.total ?? json?.data?.total ?? json?.total ?? 0),
            page: Number(meta?.page ?? json?.data?.page ?? json?.page ?? 1),
            limit: Number(meta?.limit ?? json?.data?.limit ?? json?.limit ?? (params?.limit ?? 20)),
        },
    } as {
        success: boolean;
        message: string;
        data: { rooms: RoomApi[]; total: number; page: number; limit: number };
    };
}
