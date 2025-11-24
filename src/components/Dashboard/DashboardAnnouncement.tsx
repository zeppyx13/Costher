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
                    <Ionicons name="receipt" size={20} color={colors.deepMaroon} />
                </View>
                <View style={dashboardStyles.divider} />
                <View style={{ flex: 1 }}>
                    <Text style={dashboardStyles.announcementTitle}>
                        Tarif Listrik dan Air
                    </Text>
                    <Text style={dashboardStyles.announcementDesc}>
                        tarif Listrik akan di hitung mulai lebih dari 50kwh/bulan dan air 20m³/bulan sesuai tarif PLN dan PDAM
                    </Text>
                </View>
            </View>

            <View style={dashboardStyles.divider} />

            <View style={dashboardStyles.announcementRow}>
                <View style={dashboardStyles.iconNotice}>
                    <Ionicons name="warning" size={20} color={colors.deepMaroon} />
                </View>
                <View style={dashboardStyles.divider} />
                <View style={{ flex: 1 }}>
                    <Text style={dashboardStyles.announcementTitle}>
                        kenaikan Tarif Listrik dan Air
                    </Text>
                    <Text style={dashboardStyles.announcementDesc}>
                        Akan ada kenaikan tarif listrik sesuai ketentuan dari PLN dan PDAM mulai bulan depan menjadi Rp 1.699/kwh dan air Rp 5.500/m³
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
