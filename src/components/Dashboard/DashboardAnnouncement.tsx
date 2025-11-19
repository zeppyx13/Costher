import React from "react";
import { View, Text } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";

const DashboardAnnouncement = () => {
    return (
        <View style={dashboardStyles.announcementBox}>

            <Text style={dashboardStyles.sectionTitle}>Pengumuman Kost</Text>

            <View style={dashboardStyles.announcementRow}>
                <View style={dashboardStyles.iconNotice}>
                    <Ionicons name="warning" size={20} color={colors.deepMaroon} />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={dashboardStyles.announcementTitle}>
                        Pemadaman Listrik
                    </Text>
                    <Text style={dashboardStyles.announcementDesc}>
                        24 Januari 2025 • 10:00 - 12:00
                    </Text>
                </View>
            </View>

            <View style={dashboardStyles.divider} />

            <View style={dashboardStyles.announcementRow}>
                <View style={dashboardStyles.iconNotice}>
                    <Ionicons name="calendar" size={20} color={colors.deepMaroon} />
                </View>

                <View style={{ flex: 1 }}>
                    <Text style={dashboardStyles.announcementTitle}>
                        Pembayaran Kost
                    </Text>
                    <Text style={dashboardStyles.announcementDesc}>
                        Jatuh tempo setiap tanggal 5
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default DashboardAnnouncement;
