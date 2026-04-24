import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import { getRoomInsightApi, getRoomPredictionApi } from "../../api/ai.api";

const fmt = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
});

const riskConfig: Record<string, { color: string; label: string; icon: string }> = {
    low: { color: "#16a34a", label: "Rendah", icon: "checkmark-circle" },
    medium: { color: "#d97706", label: "Sedang", icon: "warning" },
    high: { color: "#dc2626", label: "Tinggi", icon: "alert-circle" },
};

const confidenceConfig: Record<string, { color: string; label: string }> = {
    low: { color: "#dc2626", label: "Rendah" },
    medium: { color: "#d97706", label: "Sedang" },
    high: { color: "#16a34a", label: "Tinggi" },
};

export default function AIInsightScreen({ navigation, route }: any) {
    const { roomId } = route.params || {};

    const [activeTab, setActiveTab] = useState<"insight" | "prediction">("insight");
    const [insight, setInsight] = useState<any>(null);
    const [prediction, setPrediction] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const load = useCallback(async () => {
        try {
            setError("");
            const [insightData, predData] = await Promise.all([
                getRoomInsightApi(roomId),
                getRoomPredictionApi(roomId),
            ]);
            setInsight(insightData);
            setPrediction(predData);
        } catch (e: any) {
            setError(e?.response?.data?.message ?? e?.message ?? "Gagal memuat data AI");
        }
    }, [roomId]);

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

    const risk = riskConfig[insight?.insight?.risk_level ?? "low"];
    const confidence = confidenceConfig[prediction?.prediction?.confidence ?? "low"];

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerTitle}>AI Coasther</Text>
                    <Text style={styles.headerSub}>Analisis penggunaan kamarmu</Text>
                </View>
                <View style={styles.aiBadge}>
                    <Ionicons name="sparkles" size={14} color={colors.elegantGold} />
                    <Text style={styles.aiBadgeText}>Gemini</Text>
                </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabRow}>
                {(["insight", "prediction"] as const).map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        style={[styles.tab, activeTab === tab && styles.tabActive]}
                        onPress={() => setActiveTab(tab)}
                    >
                        <Ionicons
                            name={tab === "insight" ? "analytics" : "trending-up"}
                            size={16}
                            color={activeTab === tab ? "#fff" : colors.deepMaroon}
                        />
                        <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                            {tab === "insight" ? "Insight" : "Prediksi"}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {loading ? (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color={colors.deepMaroon} />
                    <Text style={styles.loadingText}>AI sedang menganalisis data...</Text>
                </View>
            ) : error ? (
                <View style={styles.center}>
                    <Ionicons name="alert-circle-outline" size={48} color="#dc2626" />
                    <Text style={styles.errorText}>{error}</Text>
                    <TouchableOpacity onPress={load} style={styles.retryBtn}>
                        <Text style={styles.retryText}>Coba Lagi</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                >
                    {activeTab === "insight" ? (
                        <InsightTab insight={insight} risk={risk} />
                    ) : (
                        <PredictionTab prediction={prediction} confidence={confidence} />
                    )}
                </ScrollView>
            )}
        </SafeAreaView>
    );
}

// ─── INSIGHT TAB ─────────────────────────────────────────────────────────────
function InsightTab({ insight, risk }: any) {
    const data = insight?.insight;
    if (!data) return null;

    return (
        <>
            {/* Risk Level Card */}
            <View style={[styles.riskCard, { borderColor: risk.color }]}>
                <View style={styles.riskRow}>
                    <Ionicons name={risk.icon as any} size={24} color={risk.color} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.riskLabel}>Tingkat Risiko</Text>
                        <Text style={[styles.riskValue, { color: risk.color }]}>{risk.label}</Text>
                    </View>
                </View>
                <Text style={styles.summaryText}>{data.summary}</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsRow}>
                <StatCard
                    icon="water"
                    label="Rata-rata Air"
                    value={`${Number(insight?.stats?.water?.avg ?? 0).toFixed(3)} m³/hari`}
                    color="#3b82f6"
                />
                <StatCard
                    icon="flash"
                    label="Rata-rata Listrik"
                    value={`${Number(insight?.stats?.electric?.avg ?? 0).toFixed(3)} kWh/hari`}
                    color="#f59e0b"
                />
            </View>

            {/* Key Findings */}
            {data.key_findings?.length > 0 && (
                <SectionCard title="Temuan Utama" icon="bulb" iconColor="#7c3aed">
                    {data.key_findings.map((f: string, i: number) => (
                        <BulletItem key={i} text={f} color="#7c3aed" />
                    ))}
                </SectionCard>
            )}

            {/* Anomalies */}
            {data.anomalies?.length > 0 && (
                <SectionCard title="Anomali" icon="warning" iconColor="#d97706">
                    {data.anomalies.map((a: string, i: number) => (
                        <BulletItem key={i} text={a} color="#d97706" />
                    ))}
                </SectionCard>
            )}

            {/* Recommendations */}
            {data.recommendations?.length > 0 && (
                <SectionCard title="Rekomendasi" icon="leaf" iconColor="#16a34a">
                    {data.recommendations.map((r: string, i: number) => (
                        <BulletItem key={i} text={r} color="#16a34a" />
                    ))}
                </SectionCard>
            )}
        </>
    );
}

// ─── PREDICTION TAB ───────────────────────────────────────────────────────────
function PredictionTab({ prediction, confidence }: any) {
    const pred = prediction?.prediction;
    const days = prediction?.days_info;
    if (!pred) return null;

    return (
        <>
            {/* Confidence + Summary */}
            <View style={styles.riskCard}>
                <View style={styles.riskRow}>
                    <Ionicons name="stats-chart" size={24} color={colors.deepMaroon} />
                    <View style={{ marginLeft: 10 }}>
                        <Text style={styles.riskLabel}>Akurasi Prediksi</Text>
                        <Text style={[styles.riskValue, { color: confidence.color }]}>
                            {confidence.label}
                        </Text>
                    </View>
                    {days && (
                        <View style={{ marginLeft: "auto" }}>
                            <Text style={styles.riskLabel}>Hari ke-{days.today}/{days.totalDays}</Text>
                            <Text style={[styles.riskValue, { color: colors.deepMaroon }]}>
                                Sisa {days.remaining} hari
                            </Text>
                        </View>
                    )}
                </View>
                <Text style={styles.summaryText}>{pred.summary}</Text>
            </View>

            {/* Usage Predictions */}
            <View style={styles.statsRow}>
                <StatCard
                    icon="water"
                    label="Prediksi Air"
                    value={`${Number(pred.water?.predicted_total_m3 ?? 0).toFixed(3)} m³`}
                    sub={`Sudah: ${Number(pred.water?.used_so_far_m3 ?? 0).toFixed(3)} m³`}
                    color="#3b82f6"
                />
                <StatCard
                    icon="flash"
                    label="Prediksi Listrik"
                    value={`${Number(pred.electricity?.predicted_total_kwh ?? 0).toFixed(3)} kWh`}
                    sub={`Sudah: ${Number(pred.electricity?.used_so_far_kwh ?? 0).toFixed(3)} kWh`}
                    color="#f59e0b"
                />
            </View>

            {/* Billing Estimate */}
            <SectionCard title="Estimasi Tagihan Bulan Ini" icon="receipt" iconColor={colors.deepMaroon}>
                <BillingRow label="Sewa Bulanan" value={pred.billing?.rent ?? 0} />
                <BillingRow label="Biaya Air" value={pred.billing?.water_cost ?? 0} />
                <BillingRow label="Biaya Listrik" value={pred.billing?.electricity_cost ?? 0} />
                <View style={styles.divider} />
                <BillingRow
                    label="Estimasi Total"
                    value={pred.billing?.estimated_total ?? 0}
                    bold
                />
                {pred.billing?.compared_last_month && (
                    <Text style={styles.compareText}>{pred.billing.compared_last_month}</Text>
                )}
            </SectionCard>

            {/* Tips */}
            {pred.tips?.length > 0 && (
                <SectionCard title="Tips Hemat" icon="bulb" iconColor="#16a34a">
                    {pred.tips.map((t: string, i: number) => (
                        <BulletItem key={i} text={t} color="#16a34a" />
                    ))}
                </SectionCard>
            )}
        </>
    );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function StatCard({ icon, label, value, sub, color }: any) {
    return (
        <View style={[styles.statCard, { borderLeftColor: color }]}>
            <Ionicons name={icon} size={20} color={color} />
            <Text style={styles.statLabel}>{label}</Text>
            <Text style={styles.statValue}>{value}</Text>
            {sub && <Text style={styles.statSub}>{sub}</Text>}
        </View>
    );
}

function SectionCard({ title, icon, iconColor, children }: any) {
    return (
        <View style={styles.sectionCard}>
            <View style={styles.sectionHeader}>
                <Ionicons name={icon} size={18} color={iconColor} />
                <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            {children}
        </View>
    );
}

function BulletItem({ text, color }: any) {
    return (
        <View style={styles.bulletRow}>
            <View style={[styles.bullet, { backgroundColor: color }]} />
            <Text style={styles.bulletText}>{text}</Text>
        </View>
    );
}

function BillingRow({ label, value, bold }: any) {
    return (
        <View style={styles.billingRow}>
            <Text style={[styles.billingLabel, bold && { fontFamily: "Poppins-SemiBold" }]}>
                {label}
            </Text>
            <Text style={[styles.billingValue, bold && {
                fontFamily: "Poppins-SemiBold",
                color: colors.deepMaroon,
                fontSize: 15,
            }]}>
                {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(Number(value))}
            </Text>
        </View>
    );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    center: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
    header: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center" },
    headerTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: colors.deepMaroon },
    headerSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    aiBadge: { marginLeft: "auto", flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: colors.deepMaroon, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    aiBadgeText: { fontFamily: "Inter-Medium", fontSize: 11, color: colors.elegantGold },
    tabRow: { flexDirection: "row", gap: 8, padding: 12, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    tab: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12, borderWidth: 1, borderColor: colors.deepMaroon },
    tabActive: { backgroundColor: colors.deepMaroon },
    tabText: { fontFamily: "Inter-Medium", fontSize: 13, color: colors.deepMaroon },
    tabTextActive: { color: "#fff" },
    loadingText: { marginTop: 12, fontFamily: "Inter-Regular", fontSize: 13, color: "#666" },
    errorText: { marginTop: 12, fontFamily: "Inter-Regular", fontSize: 13, color: "#dc2626", textAlign: "center" },
    retryBtn: { marginTop: 16, paddingHorizontal: 24, paddingVertical: 10, backgroundColor: colors.deepMaroon, borderRadius: 12 },
    retryText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#fff" },
    riskCard: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, borderLeftWidth: 4, borderColor: "#E5E7EB", elevation: 1 },
    riskRow: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    riskLabel: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    riskValue: { fontFamily: "Poppins-SemiBold", fontSize: 15 },
    summaryText: { fontFamily: "Inter-Regular", fontSize: 13, color: "#444", lineHeight: 20 },
    statsRow: { flexDirection: "row", gap: 10, marginBottom: 12 },
    statCard: { flex: 1, backgroundColor: "#fff", borderRadius: 14, padding: 14, borderLeftWidth: 3, elevation: 1 },
    statLabel: { fontFamily: "Inter-Regular", fontSize: 11, color: "#666", marginTop: 6 },
    statValue: { fontFamily: "Poppins-SemiBold", fontSize: 13, color: "#2F2F2F", marginTop: 2 },
    statSub: { fontFamily: "Inter-Regular", fontSize: 11, color: "#999", marginTop: 2 },
    sectionCard: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1 },
    sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 12 },
    sectionTitle: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F" },
    bulletRow: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 8 },
    bullet: { width: 6, height: 6, borderRadius: 3, marginTop: 6 },
    bulletText: { flex: 1, fontFamily: "Inter-Regular", fontSize: 13, color: "#444", lineHeight: 20 },
    billingRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    billingLabel: { fontFamily: "Inter-Regular", fontSize: 13, color: "#666" },
    billingValue: { fontFamily: "Inter-Medium", fontSize: 13, color: "#2F2F2F" },
    divider: { height: 1, backgroundColor: "#F0F0F0", marginVertical: 8 },
    compareText: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666", marginTop: 4, fontStyle: "italic" },
});