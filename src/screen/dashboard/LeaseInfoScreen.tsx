import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";

function InfoRow({ icon, label, value, color }: any) {
    return (
        <View style={s.infoRow}>
            <View style={s.infoIcon}>
                <Ionicons name={icon} size={18} color={color ?? colors.deepMaroon} />
            </View>
            <View style={{ flex: 1 }}>
                <Text style={s.infoLabel}>{label}</Text>
                <Text style={s.infoValue}>{value ?? "-"}</Text>
            </View>
        </View>
    );
}

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    active: { label: "Aktif", color: "#16a34a", bg: "#F0FDF4" },
    ended: { label: "Berakhir", color: "#dc2626", bg: "#FEF2F2" },
    pending: { label: "Pending", color: "#d97706", bg: "#FFFBEB" },
};

export default function LeaseInfoScreen({ navigation, route }: any) {
    const { dashboard } = route.params ?? {};
    const lease = dashboard?.lease;
    const room = dashboard?.room;

    const fmt = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 });
    const fmtDate = (d: string) => d
        ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
        : "-";

    const st = statusConfig[lease?.status] ?? statusConfig.active;

    // Hitung sisa hari kontrak
    const remaining = lease?.end_date
        ? Math.max(0, Math.ceil((new Date(lease.end_date).getTime() - Date.now()) / 86400000))
        : null;

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={s.headerTitle}>Info Kontrak</Text>
                    <Text style={s.headerSub}>Detail sewa kamarmu</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* Status Banner */}
                <View style={[s.statusBanner, { backgroundColor: st.bg }]}>
                    <Ionicons name="document-text" size={22} color={st.color} />
                    <View style={{ marginLeft: 12 }}>
                        <Text style={[s.statusLabel, { color: st.color }]}>Status Kontrak</Text>
                        <Text style={[s.statusValue, { color: st.color }]}>{st.label}</Text>
                    </View>
                    {remaining !== null && (
                        <View style={{ marginLeft: "auto", alignItems: "flex-end" }}>
                            <Text style={[s.statusLabel, { color: st.color }]}>Sisa</Text>
                            <Text style={[s.statusValue, { color: st.color }]}>{remaining} hari</Text>
                        </View>
                    )}
                </View>

                {/* Info Kamar */}
                <View style={s.card}>
                    <Text style={s.cardTitle}>Informasi Kamar</Text>
                    <InfoRow icon="home" label="Nomor Kamar" value={room?.number ? `Kamar ${room.number}` : "-"} />
                    <InfoRow icon="layers" label="Lantai" value={room?.floor ? `Lantai ${room.floor}` : "-"} />
                    <InfoRow icon="cash-outline" label="Harga Sewa" value={fmt.format(Number(room?.price_monthly ?? 0))} />
                </View>

                {/* Info Kontrak */}
                <View style={s.card}>
                    <Text style={s.cardTitle}>Detail Kontrak</Text>
                    <InfoRow icon="calendar" label="Tanggal Mulai" value={fmtDate(lease?.start_date)} />
                    <InfoRow icon="calendar-outline" label="Tanggal Berakhir" value={fmtDate(lease?.end_date)} />
                    <InfoRow icon="calendar" label="Tanggal Mulai" value={fmtDate(lease?.start_date)} />
                    <InfoRow icon="calendar-outline" label="Tanggal Berakhir" value={fmtDate(lease?.end_date)} />
                    <InfoRow icon="document-text-outline" label="Catatan" value={lease?.note ?? "-"} />
                </View>

                {/* Peringatan sisa hari */}
                {remaining !== null && remaining <= 30 && (
                    <View style={s.warnBox}>
                        <Ionicons name="warning" size={18} color="#d97706" />
                        <Text style={s.warnText}>
                            Kontrakmu akan berakhir dalam {remaining} hari. Hubungi pengelola untuk perpanjangan.
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const s = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F8F8F8" },
    header: { flexDirection: "row", alignItems: "center", gap: 10, padding: 16, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#EAEAEA" },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center" },
    headerTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: colors.deepMaroon },
    headerSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "#666" },
    statusBanner: { flexDirection: "row", alignItems: "center", borderRadius: 16, padding: 16, marginBottom: 12 },
    statusLabel: { fontFamily: "Inter-Regular", fontSize: 12 },
    statusValue: { fontFamily: "Poppins-SemiBold", fontSize: 16, marginTop: 2 },
    card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1 },
    cardTitle: { fontFamily: "Poppins-SemiBold", fontSize: 15, color: colors.deepMaroon, marginBottom: 12 },
    infoRow: { flexDirection: "row", alignItems: "center", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F5F5F5" },
    infoIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center", marginRight: 12 },
    infoLabel: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999" },
    infoValue: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F", marginTop: 2 },
    warnBox: { flexDirection: "row", gap: 10, backgroundColor: "#FFFBEB", borderRadius: 14, padding: 14, borderLeftWidth: 3, borderLeftColor: "#d97706" },
    warnText: { flex: 1, fontFamily: "Inter-Regular", fontSize: 13, color: "#92400e", lineHeight: 19 },
});