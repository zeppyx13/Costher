import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from "../lib/api";

export async function loginApi(email: string, password: string) {
    const res = await api.post("/api/auth/login", { email, password });
    return res.data;
}

export async function registerApi(payload: {
    name: string;
    email: string;
    password: string;
    phone?: string;
}) {
    const res = await api.post("/api/auth/register", payload);
    return res.data;
}

export async function meApi() {
    const res = await api.get("/api/auth/me");
    return res.data;
}

export async function sendOtpApi(email: string) {
    const res = await api.post("/api/auth/forgot-password/otp", { email });
    return res.data;
}

export async function resetPasswordOtpApi(payload: {
    email: string;
    otp: string;
    password: string;
}) {
    const res = await api.post("/api/auth/forgot-password/otp/reset", payload);
    return res.data;
}

export async function sendDeleteAccountOtpApi(email: string) {
    const res = await api.post("/api/auth/delete-account/otp", { email });
    return res.data;
}

export async function confirmDeleteAccountApi(payload: {
    email: string;
    otp: string;
}) {
    const res = await api.post("/api/auth/delete-account/confirm", payload);
    return res.data;
}

export const useAuth = () => {
    const [me, setMe] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const t = await AsyncStorage.getItem("token");
                setToken(t);
                if (t) {
                    const res = await meApi();
                    setMe(res?.data?.user ?? res?.data ?? null);
                }
            } catch (e) {
                setMe(null);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return { me, token, loading };
};
