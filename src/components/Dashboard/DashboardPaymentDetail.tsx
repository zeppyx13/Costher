import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dashboardStyles from "../../styles/dashboard";
import Ionicons from "@react-native-vector-icons/ionicons";
import colors from "../../styles/colors";

const DashboardPaymentDetail = ({ onPayPress, item, invoice, tariff }: any) => {
    const waterRate = tariff?.water_rate;
    const electricityRate = tariff?.electricity_rate;
    const waterFree = tariff?.water_free_quota;
    const elecFree = tariff?.electricity_free_quota;

    const fine = Number(invoice?.fine_amount ?? item?.fine ?? 0);
    const discountPercent = Number(invoice?.discount_percent ?? item?.discount ?? 0);
    const monthlyRent = Number(invoice?.rent_amount ?? item?.monthlyRent ?? item?.price ?? 0);
    const waterUsedraw = Number(invoice?.water_used ?? item?.waterUsage ?? 0);
    const waterUsed = waterUsedraw / 1000;
    const elecUsed = Number(invoice?.elec_used ?? item?.electricityUsage ?? 0);

    const calc = useMemo(() => {
        const waterCost = invoice?.water_cost != null
            ? Number(invoice.water_cost)
            : Math.round(Math.max(0, waterUsed - waterFree) * waterRate);

        const elecCost = invoice?.elec_cost != null
            ? Number(invoice.elec_cost)
            : Math.round(Math.max(0, elecUsed - elecFree) * electricityRate);

        const waterUsageBill = invoice?.water_used != null
            ? Number(invoice.water_used)
            : waterUsed;

        const elecUsageBill = invoice?.elec_used != null
            ? Number(invoice.elec_used)
            : elecUsed;

        const subtotal = monthlyRent + waterCost + elecCost;
        const discountAmount = invoice?.discount_amount != null
            ? Number(invoice.discount_amount)
            : Math.round(subtotal * (discountPercent / 100));

        const total = invoice?.total_amount != null
            ? Number(invoice.total_amount)
            : subtotal - discountAmount + fine;

        return { waterUsageBill, elecUsageBill, waterCost, elecCost, discountAmount, total };
    }, [invoice, waterUsed, elecUsed, monthlyRent, discountPercent, fine]);

    const formatter = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    });

    return (
        <View style={dashboardStyles.paymentBox}>
            <Text style={dashboardStyles.sectionTitle}>Detail Pembayaran</Text>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="water" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>
                    Tagihan Air {Number(calc.waterUsageBill).toFixed(3)} m³
                </Text>
                <Text style={dashboardStyles.paymentValue}>{formatter.format(calc.waterCost)}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="flash" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>
                    Tagihan Listrik {Number(calc.elecUsageBill).toFixed(3)} kWh
                </Text>
                <Text style={dashboardStyles.paymentValue}>{formatter.format(calc.elecCost)}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="home" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>Kost Bulanan</Text>
                <Text style={dashboardStyles.paymentValue}>{formatter.format(monthlyRent)}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="pricetag" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>Diskon {discountPercent}%</Text>
                <Text style={dashboardStyles.paymentValue}>{formatter.format(calc.discountAmount)}</Text>
            </View>

            <View style={dashboardStyles.paymentRow}>
                <View style={dashboardStyles.iconCircle}>
                    <Ionicons name="alert" size={22} color={colors.deepMaroon} />
                </View>
                <Text style={dashboardStyles.paymentLabel}>Denda</Text>
                <Text style={dashboardStyles.paymentValue}>{formatter.format(fine)}</Text>
            </View>

            <View style={dashboardStyles.paymentTotalRow}>
                <Text style={dashboardStyles.totalLabel}>Total Pembayaran</Text>
                <Text style={dashboardStyles.totalValue}>{formatter.format(calc.total)}</Text>
            </View>

            <TouchableOpacity style={dashboardStyles.payButton} onPress={onPayPress}>
                <Text style={dashboardStyles.payButtonText}>Detail Pembayaran</Text>
            </TouchableOpacity>
        </View>
    );
};

export default DashboardPaymentDetail;