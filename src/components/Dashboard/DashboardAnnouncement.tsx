import React, { useMemo } from "react";
import { View, Text } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";

function pickIcon(title?: string) {
    const t = String(title || "").toLowerCase();
    if (t.includes("pembersih") || t.includes("bersih")) return "build";
    if (t.includes("bayar") || t.includes("jatuh tempo") || t.includes("tagih")) return "calendar-number";
    if (t.includes("listrik") || t.includes("air") || t.includes("tarif")) return "flash";
    if (t.includes("peringat") || t.includes("warning")) return "warning";
    return "megaphone";
}

const DashboardAnnouncement = ({ items = [] }: any) => {
    const data = useMemo(() => {
        const arr = Array.isArray(items) ? items : [];
        // tampilkan max 3 terbaru (pakai created_at kalau ada)
        return [...arr]
            .sort((a, b) => String(b.created_at || "").localeCompare(String(a.created_at || "")))
            .slice(0, 3);
    }, [items]);

    return (
        <View style={dashboardStyles.announcementBox}>
            <Text style={dashboardStyles.sectionTitle}>Pengumuman Kost</Text>

            {data.length === 0 ? (
                <Text style={{ marginTop: 8, color: "#666" }}>
                    Belum ada pengumuman.
                </Text>
            ) : (
                data.map((a: any, idx: number) => {
                    const icon = pickIcon(a?.title);
                    return (
                        <View key={a?.id ?? idx}>
                            <View style={dashboardStyles.announcementRow}>
                                <View style={dashboardStyles.iconNotice}>
                                    <Ionicons name={icon as any} size={20} color={colors.deepMaroon} />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={dashboardStyles.announcementTitle}>
                                        {a?.title ?? "-"}
                                    </Text>
                                    <Text style={dashboardStyles.announcementDesc}>
                                        {a?.body ?? "-"}
                                    </Text>
                                </View>
                            </View>

                            {idx !== data.length - 1 && <View style={dashboardStyles.divider} />}
                        </View>
                    );
                })
            )}
        </View>
    );
};

export default DashboardAnnouncement;
