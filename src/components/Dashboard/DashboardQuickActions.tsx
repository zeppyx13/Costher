import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";

const DashboardQuickActions = () => {
    return (
        <View style={dashboardStyles.sectionBox}>
            <Text style={dashboardStyles.sectionTitle}>Akses Cepat</Text>

            <TouchableOpacity style={dashboardStyles.quickItem}>
                <Text style={dashboardStyles.quickText}>Hubungi Pengelola</Text>
            </TouchableOpacity>

            <TouchableOpacity style={dashboardStyles.quickItem}>
                <Text style={dashboardStyles.quickText}>Lapor Keluhan</Text>
            </TouchableOpacity>

            <TouchableOpacity style={dashboardStyles.quickItem}>
                <Text style={dashboardStyles.quickText}>Aturan Kost</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardQuickActions;
