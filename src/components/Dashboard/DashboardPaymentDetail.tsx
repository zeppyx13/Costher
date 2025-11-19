import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";

const DashboardPaymentDetail = ({ onPayPress }: any) => {
    return (
        <View style={dashboardStyles.paymentBox}>

            <Text style={dashboardStyles.sectionTitle}>Detail Pembayaran</Text>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="water" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Tagihan Air</Text>

                <Text style={dashboardStyles.paymentValue}>Rp 35.000</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="flash" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Tagihan Listrik</Text>

                <Text style={dashboardStyles.paymentValue}>Rp 85.000</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="home" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Kost Bulanan</Text>

                <Text style={dashboardStyles.paymentValue}>Rp 2.200.000</Text>
            </View>

            <View style={dashboardStyles.paymentTotalRow}>
                <Text style={dashboardStyles.totalLabel}>Total Pembayaran</Text>
                <Text style={dashboardStyles.totalValue}>Rp 2.320.000</Text>
            </View>

            <TouchableOpacity
                style={dashboardStyles.payButton}
                onPress={onPayPress}
            >
                <Text style={dashboardStyles.payButtonText}>Bayar Sekarang</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardPaymentDetail;
