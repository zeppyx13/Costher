import React from "react";
import { View, Text } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';

const DashboardSummary = () => {
    return (
        <View style={dashboardStyles.summaryWrapper}>
            <View style={dashboardStyles.row}>
                {/* Air */}
                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="water" size={28} color="#7B1113" />
                    <Text style={dashboardStyles.cardLabel}>Penggunaan Air</Text>
                    <Text style={dashboardStyles.cardValue}>55 m³</Text>
                </View>

                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="flash" size={28} color="#7B1113" />
                    <Text style={dashboardStyles.cardLabel}>Listrik</Text>
                    <Text style={dashboardStyles.cardValue}>120 kWh</Text>
                </View>
            </View>

            <View style={dashboardStyles.cardLarge}>
                <Ionicons name="wallet" size={32} color="#7B1113" />
                <Text style={dashboardStyles.cardLabelLarge}>Total Tagihan Bulan Ini</Text>
                <Text style={dashboardStyles.cardValueLarge}>Rp 2.320.000</Text>
            </View>
        </View>
    );
};

export default DashboardSummary;
