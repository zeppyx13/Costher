import React from "react";
import { View, Text } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";
const DashboardSummary = ({ item }: any) => {
    // formatted price 
    const formattedPrice = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(item.price);
    return (
        <View style={dashboardStyles.summaryWrapper}>
            <View style={dashboardStyles.row}>
                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="water" size={28} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabel}>Penggunaan Air</Text>
                    <Text style={dashboardStyles.cardValue}>{item.waterUsage} m³</Text>
                </View>

                <View style={dashboardStyles.cardSmall}>
                    <Ionicons name="flash" size={28} color={colors.deepMaroon} />
                    <Text style={dashboardStyles.cardLabel}>Listrik</Text>
                    <Text style={dashboardStyles.cardValue}>{item.electricityUsage} kWh</Text>
                </View>
            </View>

            <View style={dashboardStyles.cardLarge}>
                <Ionicons name="wallet" size={32} color={colors.deepMaroon} />
                <Text style={dashboardStyles.cardLabelLarge}>Tagihan Bulanan</Text>
                <Text style={dashboardStyles.cardValueLarge}>{formattedPrice}</Text>
            </View>
        </View>
    );
};

export default DashboardSummary;
