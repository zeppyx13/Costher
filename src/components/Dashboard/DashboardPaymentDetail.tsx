import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";

const DashboardPaymentDetail = ({ onPayPress, item }: any) => {
    const waterbill = item.waterUsage * 5500;
    const formattedWaterbill = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(waterbill);
    const electricitybill = item.electricityUsage * 1699;
    const formattedElectricitybill = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(electricitybill);
    const monthlyrent = parseInt(item.price);
    const formattedMonthlyrent = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(monthlyrent);
    const totalpayment = waterbill + electricitybill + monthlyrent;
    const formattedTotalpayment = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalpayment);
    return (
        <View style={dashboardStyles.paymentBox}>

            <Text style={dashboardStyles.sectionTitle}>Detail Pembayaran</Text>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="water" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Tagihan Air</Text>

                <Text style={dashboardStyles.paymentValue}>{formattedWaterbill}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="flash" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Tagihan Listrik</Text>

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
