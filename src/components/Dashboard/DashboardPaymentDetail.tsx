import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";

const DashboardPaymentDetail = ({ onPayPress, item }: any) => {
    // Hitung tagihan air & listrik: hanya pemakaian lebih dari batas yang dikenakan biaya
    // Air: batas 40 m3
    // Listrik: batas 20 kWh

    // Hitung kelebihan pemakaian
    item.waterUsageBill = item.waterUsage >= 40 ? item.waterUsage - 40 : 0;
    item.electricityUsageBill = item.electricityUsage >= 20 ? item.electricityUsage - 20 : 0;

    // Hitung total tagihan
    const waterbill = item.waterUsageBill * 5500;
    const electricitybill = item.electricityUsageBill * 1699;
    const monthlyrent = parseInt(item.price);

    //Format Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    const formattedWaterbill = formatter.format(waterbill);
    const formattedElectricitybill = formatter.format(electricitybill);
    const formattedMonthlyrent = formatter.format(monthlyrent);

    // Total keseluruhan
    const totalpayment = waterbill + electricitybill + monthlyrent;
    const formattedTotalpayment = formatter.format(totalpayment);

    return (
        <View style={dashboardStyles.paymentBox}>

            <Text style={dashboardStyles.sectionTitle}>Detail Pembayaran</Text>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="water" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Tagihan Air {item.waterUsageBill} m³</Text>

                <Text style={dashboardStyles.paymentValue}>{formattedWaterbill}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="flash" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Tagihan Listrik {item.electricityUsageBill} kWh</Text>

                <Text style={dashboardStyles.paymentValue}>{formattedElectricitybill}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="home" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Kost Bulanan</Text>

                <Text style={dashboardStyles.paymentValue}>{formattedMonthlyrent}</Text>
            </View>

            <View style={dashboardStyles.paymentTotalRow}>
                <Text style={dashboardStyles.totalLabel}>Total Pembayaran</Text>
                <Text style={dashboardStyles.totalValue}>{formattedTotalpayment}</Text>
            </View>

            <TouchableOpacity
                style={dashboardStyles.payButton}
                onPress={onPayPress}
            >
                <Text style={dashboardStyles.payButtonText}>Detail Pembayaran</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardPaymentDetail;
