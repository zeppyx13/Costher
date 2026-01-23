import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
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

const DashboardScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [invoices, setInvoices] = useState<any[]>([]);
    const [announcements, setAnnouncements] = useState<any[]>([]);

    const [dashboard, setDashboard] = useState<any>(null);
    const [me, setMe] = useState<any>(null);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        try {
            setError("");

            const [dashJson, meJson, invjson, annJson] = await Promise.all([
                getDashboardApi(),
                meApi(),
                getMyInvoicesApi({ page: 1, limit: 5 }),
                getAnnouncementsApi({ page: 1, limit: 5, is_active: 1 }),
            ]);
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

            number: room?.number || "-",
            floor: room?.floor ?? "-",

            waterUsage: Number(usageObj?.water_used ?? 0),
            electricityUsage: Number(usageObj?.elec_used ?? 0),

            price: Number(invoice?.total_amount ?? room?.price_monthly ?? 0),

            monthlyRent: Number(room?.price_monthly ?? 0),
        };
    }, [dashboard, me]);

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

    if (error) {
        return (
            <SafeAreaView style={dashboardStyles.container}>
                <View style={{ padding: 16 }}>
                    <Text style={{ marginBottom: 10, color: "red" }}>{error}</Text>
                    <TouchableOpacity
                        style={profileStyles.logoutButton}
                        activeOpacity={0.7}
                        onPress={() => navigation.navigate("Home")}
                    >
                        <View style={profileStyles.logoutIconWrapper}>
                            <Ionicons name="log-out-outline" size={20} color={colors.elegantGold} />
                        </View>

                        <Text style={profileStyles.logoutText}>Keluar dari Akun</Text>
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
                <DashboardSummary item={item} />

                <DashboardPaymentDetail
                    item={item}
                    onPayPress={() =>
                        navigation.navigate("Payment", {
                            dashboard,
                            me,
                        })
                    }
                />

                <DashboardPaymentHistory items={invoices} />
                <DashboardAnnouncement items={announcements} />

                <DashboardQuickActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
