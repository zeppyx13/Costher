import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator, RefreshControl, ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import { getMyInvoicesApi } from "../../api/invoice.api";

const statusConfig: Record<string, { label: string; color: string; bg: string; icon: string }> = {
    unpaid: { label: "Belum Bayar", color: "#dc2626", bg: "#FEF2F2", icon: "time-outline" },
    paid: { label: "Lunas", color: "#16a34a", bg: "#F0FDF4", icon: "checkmark-circle-outline" },
    overdue: { label: "Terlambat", color: "#d97706", bg: "#FFFBEB", icon: "warning-outline" },
};

const fmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });

function formatMonth(m: string) {
    if (!m) return "-";
    const [y, mo] = m.split("-");
    const names = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    return `${names[Number(mo) - 1]} ${y}`;
}

export default function InvoiceHistoryScreen({ navigation }: any) {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

    const load = useCallback(async () => {
        try {
            const res = await getMyInvoicesApi({ status: filterStatus, page: 1, limit: 50 });
            setInvoices(res?.data?.invoices ?? []);
        } catch { }
    }, [filterStatus]);

    useEffect(() => {
        (async () => { setLoading(true); await load(); setLoading(false); })();
    }, [load]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true); await load(); setRefreshing(false);
    }, [load]);

    const filters = [
        { label: "Semua", value: undefined },
        { label: "Belum Bayar", value: "unpaid" },
        { label: "Lunas", value: "paid" },
        { label: "Terlambat", value: "overdue" },
    ];

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={s.headerTitle}>Riwayat Tagihan</Text>
                    <Text style={s.headerSub}>Semua tagihan bulananmu</Text>
                </View>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
                {filters.map((f) => (
                    <TouchableOpacity
                        key={String(f.value)}
                        onPress={() => setFilterStatus(f.value)}
                        style={[s.filterChip, filterStatus === f.value && s.filterChipActive]}
                    >
                        <Text style={[s.filterText, filterStatus === f.value && s.filterTextActive]}>{f.label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {loading ? (
                <View style={s.center}><ActivityIndicator size="large" color={colors.deepMaroon} /></View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    showsVerticalScrollIndicator={false}
                >
                    {invoices.length === 0 ? (
                        <View style={s.empty}>
                            <Ionicons name="receipt-outline" size={48} color="#ccc" />
                            <Text style={s.emptyText}>Belum ada tagihan</Text>
                        </View>
                    ) : (
                        invoices.map((inv) => {
                            const st = statusConfig[inv.status] ?? statusConfig.unpaid;
                            return (
                                <View key={inv.id} style={s.card}>
                                    <View style={s.cardLeft}>
                                        <View style={[s.iconCircle, { backgroundColor: st.bg }]}>
                                            <Ionicons name={st.icon as any} size={20} color={st.color} />
                                        </View>
                                        <View>
                                            <Text style={s.cardMonth}>{formatMonth(inv.month)}</Text>
                                            <Text style={s.cardSub}>
                                                Jatuh tempo: {inv.due_date
                                                    ? new Date(inv.due_date).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })
                                                    : "-"}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={s.cardRight}>
                                        <Text style={s.cardAmount}>{fmt.format(Number(inv.total_amount ?? 0))}</Text>
                                        <View style={[s.badge, { backgroundColor: st.bg }]}>
                                            <Text style={[s.badgeText, { color: st.color }]}>{st.label}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    header: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center" },
    headerTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: colors.deepMaroon },
    headerSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    filterRow: { backgroundColor: "#fff", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#EAEAEA", flexGrow: 0 },
    filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#F9F9F9" },
    filterChipActive: { backgroundColor: colors.deepMaroon, borderColor: colors.deepMaroon },
    filterText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#555" },
    filterTextActive: { color: "#fff" },
    empty: { alignItems: "center", paddingTop: 60, gap: 12 },
    emptyText: { fontFamily: "Inter-Regular", fontSize: 14, color: "#999" },
    card: { backgroundColor: "#fff", borderRadius: 16, padding: 14, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center", elevation: 1 },
    cardLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
    iconCircle: { width: 40, height: 40, borderRadius: 20, justifyContent: "center", alignItems: "center" },
    cardMonth: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F" },
    cardSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999", marginTop: 2 },
    cardRight: { alignItems: "flex-end", gap: 6 },
    cardAmount: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: colors.deepMaroon },
    badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
    badgeText: { fontFamily: "Inter-Medium", fontSize: 11 },
});