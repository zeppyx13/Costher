import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";

const DashboardPaymentDetail = ({ onPayPress, item }: any) => {
    const waterRate = 5500;
    const electricityRate = 1699;

    const waterFree = 0;
    const elecFree = 0;

    const fine = Number(item?.fine ?? 0);
    const discountPercent = Number(item?.discount ?? 0);

    const monthlyRent = Number(item?.monthlyRent ?? item?.price ?? 0);

    const waterUsedRaw = Number(item?.waterUsage ?? 0);

    const waterUsed = waterUsedRaw / 1000;

    const elecUsed = Number(item?.electricityUsage ?? 0);

    const calc = useMemo(() => {
        const waterUsageBill = waterUsed > waterFree ? waterUsed - waterFree : 0;
        const elecUsageBill = elecUsed > elecFree ? elecUsed - elecFree : 0;

        const waterCost = Math.round(waterUsageBill * waterRate);
        const elecCost = Math.round(elecUsageBill * electricityRate);

        const subtotal = monthlyRent + waterCost + elecCost;
        const discountAmount = Math.round(subtotal * (discountPercent / 100));
        const total = subtotal - discountAmount + fine;

        return {
            waterUsageBill,
            elecUsageBill,
            waterCost,
            elecCost,
            discountAmount,
            total
        };
    }, [waterUsed, elecUsed, monthlyRent, discountPercent, fine]);

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return (
        <View style={dashboardStyles.paymentBox}>
            <Text style={dashboardStyles.sectionTitle}>Detail Pembayaran</Text>

            {/* AIR */}
            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="water" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>
                    Tagihan Air {calc.waterUsageBill.toFixed(3)} m³
                </Text>
                <Text style={dashboardStyles.paymentValue}>
                    {formatter.format(calc.waterCost)}
                </Text>
            </View>

            {/* LISTRIK */}
            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="flash" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>
                    Tagihan Listrik {calc.elecUsageBill} kWh
                </Text>
                <Text style={dashboardStyles.paymentValue}>
                    {formatter.format(calc.elecCost)}
                </Text>
            </View>

            {/* SEWA */}
            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="home" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>Kost Bulanan</Text>
                <Text style={dashboardStyles.paymentValue}>
                    {formatter.format(monthlyRent)}
                </Text>
            </View>

            {/* DISKON */}
            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="pricetag" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>
                    Diskon {discountPercent}%
                </Text>
                <Text style={dashboardStyles.paymentValue}>
                    {formatter.format(calc.discountAmount)}
                </Text>
            </View>

            {/* DENDA */}
            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="alert" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>Denda</Text>
                <Text style={dashboardStyles.paymentValue}>
                    {formatter.format(fine)}
                </Text>
            </View>

            {/* TOTAL */}
            <View style={dashboardStyles.paymentTotalRow}>
                <Text style={dashboardStyles.totalLabel}>Total Pembayaran</Text>
                <Text style={dashboardStyles.totalValue}>
                    {formatter.format(calc.total)}
                </Text>
            </View>

            <TouchableOpacity style={dashboardStyles.payButton} onPress={onPayPress}>
                <Text style={dashboardStyles.payButtonText}>
                    Detail Pembayaran
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardPaymentDetail;