import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator, RefreshControl, ScrollView,
    StyleSheet, Text, TouchableOpacity, View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";
import { getAnnouncementsApi } from "../../api/announcement.api";

export default function AnnouncementScreen({ navigation }: any) {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [expanded, setExpanded] = useState<number | null>(null);

    const load = useCallback(async () => {
        try {
            const res = await getAnnouncementsApi({ page: 1, limit: 50, is_active: 1 });
            setItems(res?.data?.announcements ?? []);
        } catch { }
    }, []);

    useEffect(() => {
        (async () => { setLoading(true); await load(); setLoading(false); })();
    }, [load]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true); await load(); setRefreshing(false);
    }, [load]);

    return (
        <SafeAreaView style={s.container}>
            <View style={s.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
                    <Ionicons name="arrow-back" size={22} color={colors.deepMaroon} />
                </TouchableOpacity>
                <View>
                    <Text style={s.headerTitle}>Pengumuman</Text>
                    <Text style={s.headerSub}>Info terbaru dari pengelola</Text>
                </View>
            </View>

            {loading ? (
                <View style={s.center}><ActivityIndicator size="large" color={colors.deepMaroon} /></View>
            ) : (
                <ScrollView
                    contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                    showsVerticalScrollIndicator={false}
                >
                    {items.length === 0 ? (
                        <View style={s.empty}>
                            <Ionicons name="megaphone-outline" size={48} color="#ccc" />
                            <Text style={s.emptyText}>Belum ada pengumuman</Text>
                        </View>
                    ) : (
                        items.map((item) => {
                            const isOpen = expanded === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={s.card}
                                    onPress={() => setExpanded(isOpen ? null : item.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={s.cardHeader}>
                                        <View style={s.iconCircle}>
                                            <Ionicons name="megaphone" size={18} color={colors.deepMaroon} />
                                        </View>
                                        <View style={{ flex: 1 }}>
                                            <Text style={s.cardTitle}>{item.title}</Text>
                                            <Text style={s.cardDate}>
                                                {new Date(item.created_at).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                                            </Text>
                                        </View>
                                        <Ionicons
                                            name={isOpen ? "chevron-up" : "chevron-down"}
                                            size={18} color="#999"
                                        />
                                    </View>
                                    {isOpen && item.content && (
                                        <Text style={s.cardContent}>{item.content}</Text>
                                    )}
                                </TouchableOpacity>
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
    empty: { alignItems: "center", paddingTop: 60, gap: 12 },
    emptyText: { fontFamily: "Inter-Regular", fontSize: 14, color: "#999" },
    card: { backgroundColor: "#fff", borderRadius: 16, padding: 16, marginBottom: 10, elevation: 1 },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
    iconCircle: { width: 38, height: 38, borderRadius: 19, backgroundColor: "#F8F0F0", justifyContent: "center", alignItems: "center" },
    cardTitle: { fontFamily: "Poppins-SemiBold", fontSize: 14, color: "#2F2F2F" },
    cardDate: { fontFamily: "Inter-Regular", fontSize: 12, color: "#999", marginTop: 2 },
    cardContent: { fontFamily: "Inter-Regular", fontSize: 13, color: "#555", lineHeight: 20, marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F0F0F0" },
});