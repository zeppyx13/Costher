import React, { useMemo } from "react";
import { View, Text } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";

import dashboardStyles from "../../styles/dashboard";
import colors from "../../styles/colors";

function formatRupiah(n: number) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(Number(n || 0));
}

function mapStatus(status: string) {
    if (status === "paid") {
        return { label: "Lunas", icon: "checkmark-circle", ok: true };
    }
    if (status === "overdue") {
        return { label: "Jatuh Tempo", icon: "alert-circle", ok: false };
    }
    if (status === "cancelled") {
        return { label: "Dibatalkan", icon: "alert-circle", ok: false };
    }
    return { label: "Belum Lunas", icon: "alert-circle", ok: false };
}

function formatMonth(month: any) {
    if (!month) return "-";

    // kalau format: "2024-08"
    if (typeof month === "string" && month.includes("-")) {
        const d = new Date(`${month}-01`);
        return new Intl.DateTimeFormat("id-ID", {
            month: "long",
            year: "numeric",
        }).format(d);
    }

    // kalau format: 1–12 atau "08"
    const m = Number(month);
    if (m >= 1 && m <= 12) {
        return new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
            new Date(2024, m - 1, 1)
        );
    }

    return String(month);
}

const DashboardPaymentHistory = ({ items = [] }: any) => {
    const data = useMemo(() => {
        const arr = Array.isArray(items) ? items : [];
        return [...arr]
            .sort((a, b) => String(b.month).localeCompare(String(a.month)))
            .slice(0, 5);
    }, [items]);

    return (
        <View style={dashboardStyles.paymentBox}>
            <Text style={dashboardStyles.sectionTitle}>Riwayat Pembayaran</Text>

            {data.length === 0 ? (
                <Text style={{ marginTop: 8, color: "#666" }}>
                    Belum ada riwayat tagihan.
                </Text>
            ) : (
                data.map((inv: any, index: number) => {
                    const meta = mapStatus(inv?.status);
                    const amount = Number(inv?.total_amount ?? 0);
                    const monthText = formatMonth(inv?.month);

                    return (
                        <View key={inv?.id ?? index}>
                            <View style={dashboardStyles.paymentRow}>
                                <View style={dashboardStyles.paymentIcon}>
                                    <Ionicons
                                        name={meta.icon as any}
                                        size={22}
                                        color={meta.ok ? "#2ecc71" : colors.deepMaroon}
                                    />
                                </View>

                                <View style={{ flex: 1 }}>
                                    <Text style={dashboardStyles.paymentMonth}>
                                        {monthText}
                                    </Text>
                                    <Text style={dashboardStyles.paymentAmount}>
                                        {formatRupiah(amount)}
                                    </Text>
                                </View>

                                <View
                                    style={[
                                        dashboardStyles.paymentBadge,
                                        meta.ok
                                            ? { backgroundColor: "#E8F8EF" }
                                            : { backgroundColor: "#FDECEA" },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            dashboardStyles.paymentBadgeText,
                                            meta.ok
                                                ? { color: "#2ecc71" }
                                                : { color: colors.deepMaroon },
                                        ]}
                                    >
                                        {meta.label}
                                    </Text>
                                </View>
                            </View>

                            {index !== data.length - 1 && (
                                <View style={dashboardStyles.divider} />
                            )}
                        </View>
                    );
                })
            )}
        </View>
    );
};

export default DashboardPaymentHistory;
