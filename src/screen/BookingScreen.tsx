import React, { useState } from "react";
import {
    Alert, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../styles/colors";
import { api } from "../lib/api";

const fmt = new Intl.NumberFormat("id-ID", {
    style: "currency", currency: "IDR", minimumFractionDigits: 0,
});

export default function BookingScreen({ navigation, route }: any) {
    const { room } = route.params;

    const today = new Date().toISOString().split("T")[0];
    const [startDate, setStartDate] = useState(today);
    const [durationMonth, setDuration] = useState("1");
    const [note, setNote] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const calcEndDate = () => {
        if (!startDate) return "-";
        const d = new Date(startDate);
        d.setMonth(d.getMonth() + Number(durationMonth || 1));
        return d.toISOString().split("T")[0];
    };

    const handleSubmit = async () => {
        if (!startDate) return Alert.alert("Error", "Tanggal mulai wajib diisi.");
        if (!durationMonth || Number(durationMonth) < 1)
            return Alert.alert("Error", "Durasi minimal 1 bulan.");

        Alert.alert(
            "Konfirmasi Booking",
            `Kamar ${room.number}\nMulai: ${startDate}\nBerakhir: ${calcEndDate()}\nHarga: ${fmt.format(room.price_monthly)}/bulan`,
            [
                { text: "Batal", style: "cancel" },
                {
                    text: "Ya, Booking",
                    onPress: async () => {
                        try {
                            setSubmitting(true);
                            await api.post("/api/tenants/booking", {
                                room_id: Number(room.id),
                                start_date: startDate,
                                end_date: calcEndDate(),
                                note: note.trim() || null,
                            });
                            Alert.alert(
                                "Booking Berhasil! 🎉",
                                "Kamar berhasil dipesan. Silakan cek dashboard kamu.",
                                [{ text: "OK", onPress: () => navigation.navigate("Dashboard") }]
                            );
                        } catch (e: any) {
                            Alert.alert("Gagal", e?.response?.data?.message ?? "Terjadi kesalahan.");
                        } finally {
                            setSubmitting(false);
                        }
                    },
                },
            ]
        );
    };

    return (
        <SafeAreaView style={s.container}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={s.headerTitle}>Form Booking</Text>
                    <Text style={s.headerSub}>Kamar {room.number}</Text>
                </View>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
                {/* Info Kamar */}
                <View style={s.roomCard}>
                    <View style={s.roomCardRow}>
                        <Ionicons name="home" size={20} color="#fff" />
                        <Text style={s.roomCardTitle}>Kamar {room.number}</Text>
                    </View>
                    <Text style={s.roomCardPrice}>
                        {fmt.format(room.price_monthly)} / bulan
                    </Text>
                    {room.floor && (
                        <Text style={s.roomCardSub}>Lantai {room.floor}</Text>
                    )}
                </View>

                {/* Form */}
                <View style={s.card}>
                    <Text style={s.label}>Tanggal Mulai Sewa</Text>
                    <TextInput
                        style={s.input}
                        value={startDate}
                        onChangeText={setStartDate}
                        placeholder="YYYY-MM-DD"
                        placeholderTextColor="#aaa"
                    />

                    <Text style={s.label}>Durasi Sewa (bulan)</Text>
                    <TextInput
                        style={s.input}
                        value={durationMonth}
                        onChangeText={setDuration}
                        keyboardType="numeric"
                        placeholder="Contoh: 6"
                        placeholderTextColor="#aaa"
                    />

                    <Text style={s.label}>Tanggal Berakhir (otomatis)</Text>
                    <View style={[s.input, s.inputDisabled]}>
                        <Text style={{ fontFamily: "Inter-Regular", fontSize: 14, color: "#666" }}>
                            {calcEndDate()}
                        </Text>
                    </View>

                    <Text style={s.label}>Catatan (opsional)</Text>
                    <TextInput
                        style={[s.input, s.inputMulti]}
                        value={note}
                        onChangeText={setNote}
                        placeholder="Contoh: Butuh parkir motor..."
                        placeholderTextColor="#aaa"
                        multiline
                        numberOfLines={3}
                        textAlignVertical="top"
                    />
                </View>

                {/* Summary */}
                <View style={s.summaryCard}>
                    <Text style={s.summaryTitle}>Ringkasan</Text>
                    <View style={s.summaryRow}>
                        <Text style={s.summaryLabel}>Harga/bulan</Text>
                        <Text style={s.summaryValue}>{fmt.format(room.price_monthly)}</Text>
                    </View>
                    <View style={s.summaryRow}>
                        <Text style={s.summaryLabel}>Durasi</Text>
                        <Text style={s.summaryValue}>{durationMonth} bulan</Text>
                    </View>
                    <View style={[s.summaryRow, {
                        borderTopWidth: 1, borderTopColor: "#F0F0F0",
                        paddingTop: 10, marginTop: 4,
                    }]}>
                        <Text style={[s.summaryLabel, { fontFamily: "Poppins-SemiBold" }]}>
                            Estimasi Total
                        </Text>
                        <Text style={[s.summaryValue, { color: colors.deepMaroon, fontSize: 15 }]}>
                            {fmt.format(room.price_monthly * Number(durationMonth || 1))}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity
                    style={[s.submitBtn, submitting && { opacity: 0.6 }]}
                    onPress={handleSubmit}
                    disabled={submitting}
                >
                    <Ionicons name="checkmark-circle" size={18} color={colors.elegantGold} />
                    <Text style={s.submitText}>
                        {submitting ? "Memproses..." : "Konfirmasi Booking"}
                    </Text>
                </TouchableOpacity>
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
    roomCard: { backgroundColor: colors.deepMaroon, borderRadius: 16, padding: 16, marginBottom: 14 },
    roomCardRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
    roomCardTitle: { fontFamily: "Poppins-SemiBold", fontSize: 16, color: "#fff" },
    roomCardPrice: { fontFamily: "Poppins-Bold", fontSize: 18, color: colors.elegantGold },
    roomCardSub: { fontFamily: "Inter-Regular", fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 4 },
    card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 14, elevation: 1 },
    label: { fontFamily: "Inter-Medium", fontSize: 13, color: "#555", marginBottom: 6 },
    input: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 14, fontFamily: "Inter-Regular", fontSize: 14, color: "#2F2F2F", marginBottom: 14 },
    inputDisabled: { justifyContent: "center" },
    inputMulti: { height: 80 },
    summaryCard: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 20, elevation: 1 },
    summaryTitle: { fontFamily: "Poppins-SemiBold", fontSize: 15, color: "#2F2F2F", marginBottom: 12 },
    summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 8 },
    summaryLabel: { fontFamily: "Inter-Regular", fontSize: 13, color: "#666" },
    summaryValue: { fontFamily: "Inter-Medium", fontSize: 13, color: "#2F2F2F" },
    submitBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.deepMaroon, paddingVertical: 16, borderRadius: 14 },
    submitText: { fontFamily: "Poppins-SemiBold", fontSize: 15, color: colors.elegantGold },
});