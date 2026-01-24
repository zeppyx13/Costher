import { api } from "../lib/api";

export type ReviewByRoomItem = {
    id: number;
    name: string;
    rating: number;
    comment: string;
    created_at: string;
};

export async function getReviewsByRoomApi(roomId: number) {
    const res = await api.get(`/api/reviews/rooms/${roomId}`);
    const json = res.data;

    const rows =
        json?.data?.reviews ??
        json?.reviews ??
        [];

    // normalisasi field backend → frontend
    const reviews: ReviewByRoomItem[] = Array.isArray(rows)
        ? rows.map((r: any) => ({
            id: r.id,
            name: r.user_name ?? "Penghuni",
            rating: Number(r.rating ?? 0),
            comment: r.comment ?? "",
            created_at: r.created_at,
        }))
        : [];

    return {
        success: Boolean(json?.success),
        message: json?.message ?? "OK",
        data: {
            reviews,
        },
    } as {
        success: boolean;
        message: string;
        data: {
            reviews: ReviewByRoomItem[];
        };
    };
}
