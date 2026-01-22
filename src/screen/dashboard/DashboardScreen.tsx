import React, { useEffect, useMemo, useState } from "react";
import { ScrollView, ActivityIndicator, View, Text, RefreshControl } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import dashboardStyles from "../../styles/dashboard";

import DashboardHeader from "../../components/Dashboard/DashboardHeader";
import DashboardSummary from "../../components/Dashboard/DashboardSummary";
import DashboardAnnouncement from "../../components/Dashboard/DashboardAnnouncement";
import DashboardPaymentHistory from "../../components/Dashboard/DashboardPaymentHistory";
import DashboardQuickActions from "../../components/Dashboard/DashboardQuickActions";
import DashboardPaymentDetail from "../../components/Dashboard/DashboardPaymentDetail";

import { getDashboardApi } from "../../api/dashboard.api";
import { meApi } from "../../api/auth.api";

const DashboardScreen = ({ navigation }: any) => {
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [dashboard, setDashboard] = useState<any>(null);
    const [me, setMe] = useState<any>(null);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            setError("");
            const [dashJson, meJson] = await Promise.all([getDashboardApi(), meApi()]);
            setDashboard(dashJson?.data);
            setMe(meJson?.data?.user ?? meJson?.data);
        } catch (e: any) {
            setError(e?.response?.data?.message || e?.message || "Gagal memuat dashboard");
        }
    };

    useEffect(() => {
        (async () => {
            setLoading(true);
            await fetchData();
            setLoading(false);
        })();
    }, []);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchData();
        setRefreshing(false);
    };
    const item = useMemo(() => {
        const room = dashboard?.room;
        const usageObj = dashboard?.usage?.usage;
        const invoice = dashboard?.invoice_current?.invoice;

        const name = me?.name || "Tenant";
        const avatarUrl = me?.avatar_url || null;

        return {
            name,
            avatar: avatarUrl ? { uri: avatarUrl } : undefined,
            floor: room?.floor ?? "-",
            waterUsage: Number(usageObj?.water_used ?? 0),
            electricityUsage: Number(usageObj?.elec_used ?? 0),
            price: Number(invoice?.total_amount ?? room?.price_monthly ?? 0),
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
                    <Text onPress={fetchData} style={{ color: "blue" }}>Coba lagi</Text>
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
                <DashboardHeader item={item} />
                <DashboardSummary item={item} />

                <DashboardPaymentDetail onPayPress={() => navigation.navigate("Payment")} item={item} />
                <DashboardPaymentHistory />
                <DashboardAnnouncement />
                <DashboardQuickActions />
            </ScrollView>
        </SafeAreaView>
    );
};

export default DashboardScreen;
