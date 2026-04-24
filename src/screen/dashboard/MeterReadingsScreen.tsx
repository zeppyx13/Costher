import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator, Dimensions, RefreshControl,
    ScrollView, StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import { api } from "../../lib/api";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 48;
const CHART_HEIGHT = 160;

type Reading = { id: number; reading_value: string; recorded_at: string };

function MiniChart({ readings, color }: { readings: Reading[]; color: string }) {
    if (readings.length < 2) {
        return (
            <View style={[s.chartBox, { justifyContent: "center", alignItems: "center" }]}>
                <Text style={{ color: "#aaa", fontSize: 13 }}>Data belum cukup</Text>
            </View>
        );
    }

    const values = readings.map((r) => Number(r.reading_value));
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const pointW = CHART_WIDTH / (readings.length - 1);

    // Hitung delta per reading (pemakaian harian)
    const deltas = readings.slice(1).map((r, i) =>
        Math.max(0, Number(r.reading_value) - Number(readings[i].reading_value))
    );
    const maxDelta = Math.max(...deltas, 0.001);

    return (
        <View style={s.chartBox}>
            {/* Bar chart sederhana untuk delta */}
            <View style={{ flexDirection: "row", alignItems: "flex-end", height: CHART_HEIGHT, gap: 2 }}>
                {deltas.map((d, i) => {
                    const barH = Math.max(4, (d / maxDelta) * CHART_HEIGHT);
                    return (
                        <View
                            key={i}
                            style={{
                                flex: 1,
                                height: barH,
                                backgroundColor: color,
                                borderRadius: 3,
                                opacity: 0.7 + (i / deltas.length) * 0.3,
                            }}
                        />
                    );
                })}
            </View>
            {/* Label tanggal awal & akhir */}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 6 }}>
                <Text style={s.chartLabel}>
                    {new Date(readings[0].recorded_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                </Text>
                <Text style={s.chartLabel}>
                    {new Date(readings[readings.length - 1].recorded_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short" })}
                </Text>
            </View>
        </View>
    );
}

export default function MeterReadingsScreen({ navigation }: any) {
    const [activeTab, setActiveTab] = useState<"water" | "electricity">("water");
    const [waterData, setWaterData] = useState<any>(null);
    const [elecData, setElecData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        try {
            setError("");
            const [wRes, eRes] = await Promise.all([
                api.get("/api/tenants/my-meter-readings", { params: { type: "water", limit: 30 } }),
                api.get("/api/tenants/my-meter-readings", { params: { type: "electricity", limit: 30 } }),
            ]);
            setWaterData(wRes.data?.data ?? null);
            setElecData(eRes.data?.data ?? null);
        } catch (e: any) {
            setError(e?.response?.data?.message ?? "Gagal memuat data meter");
        }
    }, []);

    useEffect(() => {
        (async () => { setLoading(true); await load(); setLoading(false); })();
    }, [load]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true); await load(); setRefreshing(false);
    }, [load]);

    const activeData = activeTab === "water" ? waterData : elecData;
    const readings: Reading[] = activeData?.readings ?? [];
    const unit = activeData?.unit === "m3" ? "m³" : "kWh";
    const isWater = activeTab === "water";
    const tabColor = isWater ? "#3b82f6" : "#f59e0b";

    // Hitung statistik
    const values = readings.map((r) => Number(r.reading_value));
    const totalUsed = values.length >= 2
        ? Math.max(0, values[values.length - 1] - values[0])
        : 0;
    const lastValue = values[values.length - 1] ?? 0;
    const deltas = readings.slice(1).map((r, i) =>
        Math.max(0, Number(r.reading_value) - Number(readings[i].reading_value))
    );
    const avgDaily = deltas.length > 0
        ? deltas.reduce((a, b) => a + b, 0) / deltas.length
        : 0;

    return (
        <SafeAreaView style={s.container}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={s.headerTitle}>Pemakaian Meter</Text>
                    <Text style={s.headerSub}>Historis pembacaan sensor</Text>
                </View>
                <View style={s.iotBadge}>
                    <Ionicons name="hardware-chip-outline" size={14} color={colors.elegantGold} />
                    <Text style={s.iotBadgeText}>IoT</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={s.tabRow}>
                {(["water", "electricity"] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[s.tab, activeTab === tab && s.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Ionicons
                            name={tab === "water" ? "water" : "flash"}
                            size={16}
                            color={activeTab === tab ? "#fff" : tab === "water" ? "#3b82f6" : "#f59e0b"}
                        />
                        <Text style={[s.tabText, activeTab === tab && s.tabTextActive]}>
                            {tab === "water" ? "Air" : "Listrik"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <View style={s.center}><ActivityIndicator size="large" color={colors.deepMaroon} /></View>
            ) : error ? (
                <View style={s.center}>
                    <Ionicons name="alert-circle-outline" size={48} color="#dc2626" />
                    <Text style={s.errorText}>{error}</Text>
                    <TouchableOpacity onPress={load} style={s.retryBtn}>
                        <Text style={s.retryText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {/* Stat Cards */}
                    <View style={s.statRow}>
                        <View style={[s.statCard, { borderLeftColor: tabColor }]}>
                            <Text style={s.statLabel}>Meter Terakhir</Text>
                            <Text style={[s.statValue, { color: tabColor }]}>
                                {lastValue.toFixed(3)} {unit}
                            </Text>
                        </View>
                        <View style={[s.statCard, { borderLeftColor: tabColor }]}>
                            <Text style={s.statLabel}>Pemakaian Periode</Text>
                            <Text style={[s.statValue, { color: tabColor }]}>
                                {totalUsed.toFixed(3)} {unit}
                            </Text>
                        </View>
                    </View>

                    <View style={[s.statCard, { borderLeftColor: tabColor, marginBottom: 16 }]}>
                        <Text style={s.statLabel}>Rata-rata Harian</Text>
                        <Text style={[s.statValue, { color: tabColor }]}>
                            {avgDaily.toFixed(4)} {unit}/hari
                        </Text>
                    </View>

                    {/* Chart */}
                    <View style={s.sectionCard}>
                        <View style={s.sectionHeader}>
                            <Ionicons
                                name={isWater ? "bar-chart" : "stats-chart"}
                                size={18} color={tabColor}
                            />
                            <Text style={s.sectionTitle}>
                                Grafik Pemakaian {isWater ? "Air" : "Listrik"}
                            </Text>
                        </View>
                        <Text style={s.chartNote}>Delta per pembacaan (pemakaian)</Text>
                        <MiniChart readings={readings} color={tabColor} />
                    </View>

                    {/* Tabel Readings */}
                    <View style={s.sectionCard}>
                        <View style={s.sectionHeader}>
                            <Ionicons name="list" size={18} color={tabColor} />
                            <Text style={s.sectionTitle}>
                                Riwayat Pembacaan ({readings.length} data)
                            </Text>
                        </View>

                        {readings.length === 0 ? (
                            <Text style={{ color: "#aaa", textAlign: "center", padding: 20 }}>
                                Belum ada data meter
                            </Text>
                        ) : (
                            [...readings].reverse().slice(0, 30).map((r, i, arr) => {
                                const prev = arr[i + 1];
                                const delta = prev
                                    ? Math.max(0, Number(r.reading_value) - Number(prev.reading_value))
                                    : null;
                                return (
                                    <View key={r.id}>
                                        <View style={s.readingRow}>
                                            <View>
                                                <Text style={s.readingValue}>
                                                    {Number(r.reading_value).toFixed(3)} {unit}
                                                </Text>
                                                <Text style={s.readingDate}>
                                                    {new Date(r.recorded_at).toLocaleString("id-ID", {
                                                        day: "2-digit", month: "short",
                                                        hour: "2-digit", minute: "2-digit",
                                                    })}
                                                </Text>
                                            </View>
                                            {delta !== null && (
                                                <View style={[s.deltaBadge, { backgroundColor: `${tabColor}15` }]}>
                                                    <Text style={[s.deltaText, { color: tabColor }]}>
                                                        +{delta.toFixed(4)}
                                                    </Text>
                                                </View>
                                            )}
                                        </View>
                                        {i < arr.length - 1 && <View style={s.divider} />}
                                    </View>
                                );
                            })
                        )}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
    header: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center" },
    headerTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: colors.deepMaroon, flex: 1 },
    headerSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    iotBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.deepMaroon, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    iotBadgeText: { fontFamily: "Inter-Medium", fontSize: 11, color: colors.elegantGold },
    tabRow: { flexDirection: "row", gap: 8, padding: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#F9F9F9" },
    tabActive: { backgroundColor: colors.deepMaroon, borderColor: colors.deepMaroon },
    tabText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#555" },
    tabTextActive: { color: "#fff" },
    statRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
    statCard: { flex: 1, backgroundColor: "#fff", borderRadius: 14, padding: 14, borderLeftWidth: 3, elevation: 1, marginBottom: 0 },
    statLabel: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    statValue: { fontFamily: "Poppins-SemiBold", fontSize: 15, marginTop: 4 },
    sectionCard: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1 },
    sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
    sectionTitle: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F" },
    chartBox: { backgroundColor: "#F8F8F8", borderRadius: 12, padding: 12 },
    chartLabel: { fontFamily: "Inter-Regular", fontSize: 11, color: "#999" },
    chartNote: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999", marginBottom: 10 },
    readingRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 10 },
    readingValue: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F" },
    readingDate: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999", marginTop: 2 },
    deltaBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    deltaText: { fontFamily: "Inter-Medium", fontSize: 12 },
    divider: { height: 1, backgroundColor: "#F0F0F0" },
    errorText: { marginTop: 12, fontFamily: "Inter-Regular", fontSize: 13, color: "#dc2626", textAlign: "center" },
    retryBtn: { marginTop: 16, paddingHorizontal: 24, paddingVertical: 10, backgroundColor: colors.deepMaroon, borderRadius: 12 },
    retryText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#fff" },
});