import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Ionicons from '@react-native-vector-icons/ionicons';
import dashboardStyles from "../../styles/dashboard";
import colors from "../../styles/colors";

const actions: { label: any; icon: any }[] = [
    { label: "Hubungi Pengelola", icon: "call-outline" },
    { label: "Lapor Keluhan", icon: "alert-circle-outline" },
    { label: "Aturan Kost", icon: "document-text-outline" },
    { label: "Rating Kost", icon: "star-outline" },
];

const DashboardQuickActions = () => {
    return (
        <View style={dashboardStyles.quickBox}>
            <Text style={dashboardStyles.sectionTitle}>Quick Actions</Text>

            <View style={dashboardStyles.quickGrid}>
                {actions.map((item, i) => (
                    <TouchableOpacity key={i} style={dashboardStyles.quickCard}>
                        <Ionicons
                            name={item.icon}
                            size={26}
                            color={colors.deepMaroon}
                            style={{ marginBottom: 6 }}
                        />
                        <Text style={dashboardStyles.quickText}>{item.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

export default DashboardQuickActions;
