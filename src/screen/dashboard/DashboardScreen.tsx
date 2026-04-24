import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import dashboardStyles from "../../styles/dashboard";
import profileStyles from "../../styles/profile";
import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import DashboardAnnouncement from "../../components/Dashboard/DashboardAnnouncement";
import DashboardPaymentHistory from "../../components/Dashboard/DashboardPaymentHistory";
import DashboardQuickActions from "../../components/Dashboard/DashboardQuickActions";
import DashboardPaymentDetail from "../../components/Dashboard/DashboardPaymentDetail";
import colors from "../../styles/colors";
import { getDashboardApi } from "../../api/dashboard.api";
import { meApi } from "../../api/auth.api";
import { getMyInvoicesApi } from "../../api/invoice.api";
import { getAnnouncementsApi } from "../../api/announcement.api";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useRoomTelemetry } from "../../api/useRoomTelemetry";
import { getTariffApi } from "../../api/tariff.api";

const DashboardScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [invoices, setInvoices] = useState<any[]>([]);
    const [announcements, setAnnouncements] = useState<any[]>([]);
    const [tariff, setTariff] = useState<any>(null);

    const [dashboard, setDashboard] = useState<any>(null);
    const [me, setMe] = useState<any>(null);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        try {
            setError("");

            const [dashJson, meJson, invjson, annJson, tariffJson] = await Promise.all([
                getDashboardApi(),
                meApi(),
                getMyInvoicesApi({ page: 1, limit: 5 }),
                getAnnouncementsApi({ page: 1, limit: 5, is_active: 1 }),
                getTariffApi(),
            ]);
            setTariff(tariffJson ?? null);
            setDashboard(dashJson?.data ?? null);
            setMe(meJson?.data?.user ?? meJson?.data ?? null);
            setInvoices(invjson?.data?.invoices ?? []);
            setAnnouncements(annJson?.data?.announcements ?? []);
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || "Gagal memuat dashboard");
        }
    }, []);

    useEffect(() => {
        (async () => {
            setLoading(true);
            await load();
            setLoading(false);
        })();
    }, [load]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await load();
        setRefreshing(false);
    }, [load]);

    const item = useMemo(() => {
        const room = dashboard?.room;
        const usageObj = dashboard?.usage?.usage;
        const invoice = dashboard?.invoice_current?.invoice;

        const name = me?.name || "Tenant";
        const avatarUrl = me?.avatar_url || null;

        return {
            name,
            avatar: avatarUrl ? { uri: avatarUrl } : undefined,
            roomId: room?.id,

            number: room?.number || "-",
            floor: room?.floor ?? "-",

            waterUsage: Number(usageObj?.water_used ?? 0),
            electricityUsage: Number(usageObj?.elec_used ?? 0),

            price: Number(invoice?.total_amount ?? room?.price_monthly ?? 0),
            monthlyRent: Number(room?.price_monthly ?? 0),
        };
    }, [dashboard, me]);

    const { liveTelemetry, isSocketConnected } = useRoomTelemetry(item.roomId);

    const handleLogout = () => {
        Alert.alert(
            "Keluar dari Akun",
            "Apakah kamu yakin ingin logout?",
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Ya, Keluar",
                    style: "destructive",
                    onPress: async () => {
                        await AsyncStorage.removeItem("token");
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "Home" }],
                        });
                    },
                },
            ]
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={dashboardStyles.container}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size="large" />
                    <Text style={{ marginTop: 10 }}>Memuat dashboard...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (error || !dashboard?.lease) {
        return (
            <SafeAreaView style={dashboardStyles.container}>
                <View style={{
                    flex: 1, justifyContent: "center",
                    alignItems: "center", padding: 24,
                }}>
                    <Ionicons name="home-outline" size={64} color="#ccc" />
                    <Text style={{
                        fontFamily: "Poppins-SemiBold", fontSize: 18,
                        color: "#2F2F2F", marginTop: 16, textAlign: "center",
                    }}>
                        Belum Ada Kamar Aktif
                    </Text>
                    <Text style={{
                        fontFamily: "Inter-Regular", fontSize: 14,
                        color: "#666", textAlign: "center", marginTop: 8, lineHeight: 22,
                    }}>
                        Kamu belum memiliki kamar aktif. Booking kamar sekarang untuk mulai menggunakan Coasther.
                    </Text>
                    <TouchableOpacity
                        style={{
                            backgroundColor: colors.deepMaroon,
                            paddingHorizontal: 32, paddingVertical: 14,
                            borderRadius: 14, marginTop: 24,
                            flexDirection: "row", alignItems: "center", gap: 8,
                        }}
                        onPress={() => navigation.navigate("Room")}
                    >
                        <Ionicons name="search" size={18} color={colors.elegantGold} />
                        <Text style={{
                            fontFamily: "Poppins-SemiBold",
                            fontSize: 15, color: colors.elegantGold,
                        }}>
                            Cari Kamar
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginTop: 16 }}
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={{
                            fontFamily: "Inter-Medium", fontSize: 13, color: "#999",
                        }}>
                            Bukan akun kamu? Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={dashboardStyles.container}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 130 }}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <DashboardHeader item={item} navigation={navigation} dashboard={dashboard} me={me} />

                <DashboardSummary
                    item={item}
                    liveTelemetry={liveTelemetry}
                    isSocketConnected={isSocketConnected}
                />

                <DashboardPaymentDetail
                    item={item}
                    invoice={dashboard?.invoice_current?.invoice ?? null}
                    tariff={tariff}
                    onPayPress={() =>
                        navigation.navigate("Payment", {
                            dashboard,
                            me,
                            tariff,
                        })
                    }
                />

                <DashboardPaymentHistory items={invoices} />
                <DashboardAnnouncement items={announcements} />
                <DashboardQuickActions navigation={navigation} roomId={item.roomId} dashboard={dashboard} />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;