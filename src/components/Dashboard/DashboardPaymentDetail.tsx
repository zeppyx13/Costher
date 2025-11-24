import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from '@react-native-vector-icons/ionicons';
import colors from "../../styles/colors";

const DashboardPaymentDetail = ({ onPayPress, item }: any) => {
    // Hitung tagihan air & listrik: hanya pemakaian lebih dari batas yang dikenakan biaya
    // Air: batas 40 m3
    // Listrik: batas 20 kWh
    const waterRate = 5500;      // per m³
    const electricityRate = 1699; // per kWh
    const Waterfairusage = 40;
    const Electricityfairusage = 20;
    // ambil nilai dasar
    const fine = parseInt(item.fine);
    const discount = parseInt(item.discount);
    const monthlyRent = parseInt(item.price);

    // Hitung kelebihan pemakaian
    item.waterUsageBill = item.waterUsage >= Waterfairusage ? item.waterUsage - Waterfairusage : 0;
    item.electricityUsageBill = item.electricityUsage >= Electricityfairusage ? item.electricityUsage - Electricityfairusage : 0;

    // Hitung total tagihan
    const discountAmount = (monthlyRent + (item.waterUsageBill * waterRate) + (item.electricityUsageBill * electricityRate)) * (discount / 100);
    const waterbill = item.waterUsageBill * waterRate;
    const electricitybill = item.electricityUsageBill * electricityRate;
    //Format Rupiah
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    });

    const formattedWaterbill = formatter.format(waterbill);
    const formattedElectricitybill = formatter.format(electricitybill);
    const formattedMonthlyrent = formatter.format(monthlyRent);
    const formattedDiscountAmount = formatter.format(discountAmount);
    const formattedFine = formatter.format(fine);
    // Total keseluruhan
    const totalpayment = waterbill + electricitybill + monthlyRent - discountAmount + fine;
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

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="pricetag" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Diskon {discount}%</Text>

                <Text style={dashboardStyles.paymentValue}>{formattedDiscountAmount}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="alert" size={22} color={colors.deepMaroon} />
                </View>

                <Text style={dashboardStyles.paymentLabel}>Denda</Text>

                <Text style={dashboardStyles.paymentValue}>{formattedFine}</Text>
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
