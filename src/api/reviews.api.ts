import { api } from "../lib/api";

export type ReviewItem = {
    name: string;
    number: string;
    rating: number;
    comment: string;
    created_at: string;
};

export async function getReviewsApi(params?: {
    page?: number;
    limit?: number;
    room_id?: number;
}) {
    const res = await api.get("/api/reviews", { params });
    const json = res.data;

    const rows =
        json?.data?.reviews ??
        json?.data?.rows ??
        json?.reviews ??
        json?.rows ??
        [];

    return {
        success: Boolean(json?.success),
        message: json?.message ?? "OK",
        data: {
            reviews: Array.isArray(rows) ? (rows as ReviewItem[]) : [],
        },
    };
}
