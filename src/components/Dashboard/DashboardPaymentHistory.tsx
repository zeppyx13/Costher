import React from "react";
import { View, Text } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import dashboardStyles from "../../styles/dashboard";
import colors from "../../styles/colors";

const DashboardPaymentHistory = () => {
    const data = [
        { month: "November 2025", amount: "2.320.000", status: "Belum Lunas" },
        { month: "Oktober 2025", amount: "2.234.000", status: "Lunas" },
        { month: "September 2025", amount: "2.244.000", status: "Lunas" }
    ];

    return (
        <View style={dashboardStyles.paymentBox}>
            <Text style={dashboardStyles.sectionTitle}>Riwayat Pembayaran</Text>

            {data.map((item, index) => (
                <View key={index}>
                    <View style={dashboardStyles.paymentRow}>
                        <View style={dashboardStyles.paymentIcon}>
                            <Ionicons
                                name={item.status === "Lunas" ? "checkmark-circle" : "alert-circle"}
                                size={22}
                                color={item.status === "Lunas"
                                    ? "#2ecc71"
                                    : colors.deepMaroon}
                            />
                        </View>

                        <View style={{ flex: 1 }}>
                            <Text style={dashboardStyles.paymentMonth}>{item.month}</Text>
                            <Text style={dashboardStyles.paymentAmount}>Rp {item.amount}</Text>
                        </View>

                        <View
                            style={[
                                dashboardStyles.paymentBadge,
                                item.status === "Lunas"
                                    ? { backgroundColor: "#E8F8EF" }
                                    : { backgroundColor: "#FDECEA" }
                            ]}
                        >
                            <Text
                                style={[
                                    dashboardStyles.paymentBadgeText,
                                    item.status === "Lunas"
                                        ? { color: "#2ecc71" }
                                        : { color: colors.deepMaroon }
                                ]}
                            >
                                {item.status}
                            </Text>
                        </View>
                    </View>

                    {index !== data.length - 1 && (
                        <View style={dashboardStyles.divider} />
                    )}
                </View>
            ))}
        </View>
    );
};

export default DashboardPaymentHistory;
