import React from "react";
import { View, Text, TouchableOpacity, Linking, Alert } from "react-native";
import Ionicons from "@react-native-vector-icons/ionicons";
import dashboardStyles from "../../styles/dashboard";
import colors from "../../styles/colors";

type Action = {
    label: string;
    icon: string;
    color?: string;
    onPress: () => void;
    badge?: string;
};

type Props = {
    navigation: any;
    roomId?: number;
    dashboard?: any;
};

const DashboardQuickActions = ({ navigation, roomId, dashboard }: Props) => {
    const actions: Action[] = [
        {
            label: "AI Insight",
            icon: "sparkles",
            color: "#7c3aed",
            onPress: () => {
                if (!roomId) return Alert.alert("Info", "Data kamar belum tersedia.");
                navigation.navigate("AIInsight", { roomId });
            },
        },
        {
            label: "Meter IoT",
            icon: "hardware-chip-outline",
            color: "#0891b2",
            onPress: () => navigation.navigate("MeterReadings"),
        },
        {
            label: "Lapor Keluhan",
            icon: "alert-circle-outline",
            color: "#dc2626",
            onPress: () => navigation.navigate("Complaint"),
        },
        {
            label: "Pengumuman",
            icon: "megaphone-outline",
            color: "#0369a1",
            onPress: () => navigation.navigate("Announcement"),
        },
        {
            label: "Riwayat Tagihan",
            icon: "receipt-outline",
            color: colors.deepMaroon,
            onPress: () => navigation.navigate("InvoiceHistory"),
        },
        {
            label: "Info Kontrak",
            icon: "document-text-outline",
            color: "#7c3aed",
            onPress: () => navigation.navigate("LeaseInfo", { dashboard }),
        },
        {
            label: "Hubungi Pengelola",
            icon: "call-outline",
            color: "#16a34a",
            onPress: () => Linking.openURL("tel:+628123456789"),
        },
        {
            label: "Rating Kost",
            icon: "star-outline",
            color: "#d97706",
            onPress: () => navigation.navigate("Review"),
        },
    ];

    return (
        <View style={dashboardStyles.quickBox}>
            <Text style={dashboardStyles.sectionTitle}>Quick Actions</Text>

            <View style={dashboardStyles.quickGrid}>
                {actions.map((item, i) => (
                    <TouchableOpacity
                        key={i}
                        style={dashboardStyles.quickCard}
                        onPress={item.onPress}
                        activeOpacity={0.7}
                    >
                        {/* Icon circle */}
                        <View style={{
                            width: 46,
                            height: 46,
                            borderRadius: 23,
                            backgroundColor: `${item.color}15`,
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 8,
                        }}>
                            <Ionicons
                                name={item.icon as any}
                                size={22}
                                color={item.color ?? colors.deepMaroon}
                            />
                        </View>
                        <Text style={dashboardStyles.quickText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default DashboardQuickActions;