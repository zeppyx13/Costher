import { api } from "../lib/api";

export async function createMidtransPayment(invoice_id: number) {
    const res = await api.post("/api/payments/midtrans", { invoice_id });
    return res.data;
}
