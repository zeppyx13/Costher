import messaging from "@react-native-firebase/messaging";
import { Alert } from "react-native";

export async function requestNotificationPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    return enabled;
}

export async function getFCMToken(): Promise<string | null> {
    try {
        const token = await messaging().getToken();
        return token;
    } catch (e) {
        console.log("getFCMToken error:", e);
        return null;
    }
}

export async function registerFCMToken(api: any, token: string) {
    try {
        await api.post("/api/notifications/register-token", { fcm_token: token });
    } catch (e) {
        console.log("registerFCMToken error:", e);
    }
}

export function setupForegroundNotification() {
    return messaging().onMessage(async (remoteMessage) => {
        const title = remoteMessage.notification?.title ?? "Coasther";
        const body = remoteMessage.notification?.body ?? "";
        Alert.alert(title, body);
    });
}