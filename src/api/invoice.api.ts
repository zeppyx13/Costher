import { api } from "../lib/api";

export async function getMyInvoicesApi(params?: {
    page?: number;
    limit?: number;
    status?: string;
}) {
    const res = await api.get("/api/tenants/my-invoices", { params });
    return res.data;
}
