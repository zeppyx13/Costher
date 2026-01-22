import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const API_BASE_URL = "http://10.0.2.2:5000";

export const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 15000,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
