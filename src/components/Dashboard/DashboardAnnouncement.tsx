import React from "react";
import { View, Text } from "react-native";
import dashboardStyles from "../../styles/dashboard";

const DashboardAnnouncement = () => {
    return (
        <View style={dashboardStyles.sectionBox}>
            <Text style={dashboardStyles.sectionTitle}>Pengumuman Kost</Text>

            <View style={dashboardStyles.announcementItem}>
                <Text style={dashboardStyles.announcementTitle}>Pemadaman Listrik</Text>
                <Text style={dashboardStyles.announcementDesc}>Tanggal 24 Januari 2025, 10:00 - 12:00</Text>
            </View>

            <View style={dashboardStyles.announcementItem}>
                <Text style={dashboardStyles.announcementTitle}>Pembayaran Kost</Text>
                <Text style={dashboardStyles.announcementDesc}>Jatuh tempo setiap tanggal 5</Text>
            </View>
        </View>
    );
};

export default DashboardAnnouncement;
