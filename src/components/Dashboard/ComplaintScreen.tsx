import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator, Alert, Modal, RefreshControl,
    ScrollView, StyleSheet, Text, TextInput,
    TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import { getMyComplaintsApi, createComplaintApi, closeComplaintApi } from "../../api/complaint.api";

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
    open: { label: "Terbuka", color: "#dc2626", bg: "#FEF2F2" },
    in_progress: { label: "Diproses", color: "#d97706", bg: "#FFFBEB" },
    closed: { label: "Selesai", color: "#16a34a", bg: "#F0FDF4" },
};

export default function ComplaintScreen({ navigation }: any) {
    const [complaints, setComplaints] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined);

    const load = useCallback(async () => {
        try {
            const res = await getMyComplaintsApi({ status: filterStatus, page: 1, limit: 20 });
            setComplaints(res?.data?.complaints ?? []);
        } catch (e: any) {
            Alert.alert("Error", e?.response?.data?.message ?? "Gagal memuat keluhan");
        }
    }, [filterStatus]);

    useEffect(() => {
        (async () => { setLoading(true); await load(); setLoading(false); })();
    }, [load]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true); await load(); setRefreshing(false);
    }, [load]);

    const handleSubmit = async () => {
        if (!title.trim() || !description.trim()) {
            return Alert.alert("Lengkapi form", "Judul dan deskripsi wajib diisi.");
        }
        try {
            setSubmitting(true);
            await createComplaintApi({ title: title.trim(), description: description.trim() });
            setTitle(""); setDescription(""); setModalVisible(false);
            await load();
            Alert.alert("Berhasil", "Keluhan berhasil dikirim.");
        } catch (e: any) {
            Alert.alert("Gagal", e?.response?.data?.message ?? "Terjadi kesalahan.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleClose = (id: number) => {
        Alert.alert("Tutup Keluhan", "Tandai keluhan ini sebagai selesai?", [
            { text: "Batal", style: "cancel" },
            {
                text: "Ya, Tutup", style: "destructive",
                onPress: async () => {
                    try {
                        await closeComplaintApi(id);
                        await load();
                    } catch (e: any) {
                        Alert.alert("Gagal", e?.response?.data?.message ?? "Terjadi kesalahan.");
                    }
                },
            },
        ]);
    };

    const filters = [
        { label: "Semua", value: undefined },
        { label: "Terbuka", value: "open" },
        { label: "Diproses", value: "in_progress" },
        { label: "Selesai", value: "closed" },
    ];

    return (
        <SafeAreaView style={s.container}>
            {/* Header */}
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={s.headerTitle}>Keluhan Saya</Text>
                    <Text style={s.headerSub}>Laporan & tindak lanjut</Text>
                </View>
                <TouchableOpacity style={s.addBtn} onPress={() => setModalVisible(true)}>
                    <Ionicons name="add" size={22} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Filter */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={s.filterRow} contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}>
                {filters.map((f) => (
                    <TouchableOpacity
                        key={String(f.value)}
                        onPress={() => setFilterStatus(f.value)}
                        style={[s.filterChip, filterStatus === f.value && s.filterChipActive]}
                    >
                        <Text style={[s.filterText, filterStatus === f.value && s.filterTextActive]}>
                            {f.label}
                        </Text>
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
                    {complaints.length === 0 ? (
                        <View style={s.empty}>
                            <Ionicons name="chatbubble-ellipses-outline" size={48} color="#ccc" />
                            <Text style={s.emptyText}>Belum ada keluhan</Text>
                            <TouchableOpacity style={s.emptyBtn} onPress={() => setModalVisible(true)}>
                                <Text style={s.emptyBtnText}>Buat Keluhan</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        complaints.map((item) => {
                            const st = statusConfig[item.status] ?? statusConfig.open;
                            return (
                                <View key={item.id} style={s.card}>
                                    <View style={s.cardTop}>
                                        <View style={[s.badge, { backgroundColor: st.bg }]}>
                                            <Text style={[s.badgeText, { color: st.color }]}>{st.label}</Text>
                                        </View>
                                        <Text style={s.cardDate}>
                                            {new Date(item.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" })}
                                        </Text>
                                    </View>
                                    <Text style={s.cardTitle}>{item.title}</Text>
                                    <Text style={s.cardDesc} numberOfLines={2}>{item.description}</Text>

                                    {item.status === "open" && (
                                        <TouchableOpacity style={s.closeBtn} onPress={() => handleClose(item.id)}>
                                            <Ionicons name="checkmark-circle-outline" size={15} color="#16a34a" />
                                            <Text style={s.closeBtnText}>Tandai Selesai</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        })
                    )}
                </ScrollView>
            )}

            {/* Modal Buat Keluhan */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={s.modalOverlay}>
                    <View style={s.modalBox}>
                        <View style={s.modalHeader}>
                            <Text style={s.modalTitle}>Buat Keluhan</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={22} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <Text style={s.inputLabel}>Judul</Text>
                        <TextInput
                            style={s.input}
                            placeholder="Contoh: Air mati, AC rusak..."
                            value={title}
                            onChangeText={setTitle}
                            placeholderTextColor="#aaa"
                        />

                        <Text style={s.inputLabel}>Deskripsi</Text>
                        <TextInput
                            style={[s.input, s.inputMulti]}
                            placeholder="Jelaskan masalah secara detail..."
                            value={description}
                            onChangeText={setDescription}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                            placeholderTextColor="#aaa"
                        />

                        <TouchableOpacity
                            style={[s.submitBtn, submitting && { opacity: 0.6 }]}
                            onPress={handleSubmit}
                            disabled={submitting}
                        >
                            <Text style={s.submitText}>{submitting ? "Mengirim..." : "Kirim Keluhan"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    addBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: colors.deepMaroon, justifyContent: "center", alignItems: "center" },
    filterRow: { backgroundColor: "#fff", paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#EAEAEA", flexGrow: 0 },
    filterChip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: "#E5E7EB", backgroundColor: "#F9F9F9" },
    filterChipActive: { backgroundColor: colors.deepMaroon, borderColor: colors.deepMaroon },
    filterText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#555" },
    filterTextActive: { color: "#fff" },
    empty: { alignItems: "center", paddingTop: 60, gap: 12 },
    emptyText: { fontFamily: "Inter-Regular", fontSize: 14, color: "#999" },
    emptyBtn: { backgroundColor: colors.deepMaroon, paddingHorizontal: 24, paddingVertical: 10, borderRadius: 12 },
    emptyBtnText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#fff" },
    card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 12, elevation: 1 },
    cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
    badge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    badgeText: { fontFamily: "Inter-Medium", fontSize: 12 },
    cardDate: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999" },
    cardTitle: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F", marginBottom: 4 },
    cardDesc: { fontFamily: "Inter-Regular", fontSize: 13, color: "#666", lineHeight: 19 },
    closeBtn: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 10, alignSelf: "flex-start" },
    closeBtnText: { fontFamily: "Inter-Medium", fontSize: 13, color: "#16a34a" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    modalBox: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
    modalHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
    modalTitle: { fontFamily: "Poppins-SemiBold", fontSize: 17, color: colors.deepMaroon },
    inputLabel: { fontFamily: "Inter-Medium", fontSize: 13, color: "#555", marginBottom: 6 },
    input: { backgroundColor: "#F5F5F5", borderRadius: 12, padding: 14, fontFamily: "Inter-Regular", fontSize: 14, color: "#2F2F2F", marginBottom: 14 },
    inputMulti: { height: 100 },
    submitBtn: { backgroundColor: colors.deepMaroon, paddingVertical: 14, borderRadius: 14, alignItems: "center", marginTop: 4 },
    submitText: { fontFamily: "Poppins-SemiBold", fontSize: 15, color: colors.elegantGold },
});